import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chatting } from './models/chattings.model';
import { Socket as SocketModel } from './models/sockets.model';
import { v4 as uuid } from 'uuid';
import { formattedDate } from './date';

@WebSocketGateway({ namespace: 'chatting' })
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  private logger = new Logger('chat');

  constructor(
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(SocketModel.name)
    private readonly socketModel: Model<SocketModel>,
  ) {}

  handleConnection(@ConnectedSocket() socket) {
    this.logger.log(`connected: ${socket.id}`);
  }

  async handleDisconnect(@ConnectedSocket() socket) {
    this.logger.log(`disconnected: ${socket.id}`);

    const findSocket = await this.socketModel.findOne({ id: socket.id });
    if (findSocket) {
      const socketDto = {
        username: findSocket.username,
        // createdAt: dayjs(findSocket.createdAt).format('YY-MM-DD HH:mm:ss'),
        createdAt: formattedDate(findSocket.createdAt),
      };

      socket.broadcast.emit('disconnect_user', socketDto);
      await findSocket.delete();
    }
  }

  // sub
  @SubscribeMessage('previous_chat')
  async handlePreviousChat() {
    const previousChat = await this.chattingModel
      .find({}, 'user.username chat createdAt')
      .limit(50);

    return previousChat.map((chat) => ({
      chat: chat.chat,
      username: chat.user?.username ?? 'anonymous',
      // createdAt: dayjs(chat.createdAt).format('YY-MM-DD HH:mm:ss'),
      createdAt: formattedDate(chat.createdAt),
    }));
  }
  @SubscribeMessage('new_user')
  async handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket,
  ) {
    const exist = await this.socketModel.exists({ username: username });
    if (exist) {
      username = `${username}_${uuid().slice(0, 5)}`;
    }

    const newSocket = await this.socketModel.create({
      id: socket.id,
      username,
    });

    const socketDto = {
      username: newSocket.username,
      // createdAt: dayjs(newSocket.createdAt).format('YY-MM-DD HH:mm:ss'),
      createdAt: formattedDate(newSocket.createdAt),
    };
    socket.broadcast.emit('user_connected', socketDto);
    return socketDto;
  }

  @SubscribeMessage('submit_chat')
  async handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket,
  ) {
    const findSocket = await this.socketModel.findOne({ id: socket.id });
    const newChat = await this.chattingModel.create({
      user: findSocket,
      chat,
    });

    const chatDto = {
      username: findSocket.username,
      // createdAt: dayjs(newChat.createdAt).format('YY-MM-DD HH:mm:ss'),
      createdAt: formattedDate(newChat.createdAt),
      chat: newChat.chat,
    };

    socket.broadcast.emit('new_chat', chatDto);
    return chatDto;
  }
}
