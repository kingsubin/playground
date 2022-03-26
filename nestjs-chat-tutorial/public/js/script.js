const socket = io('/chatting');
const $chattingBox = document.querySelector('#chatting_box');
const $form = document.querySelector('#chat_form');

// broadcast
socket.on('user_connected', (socketDto) => {
  drawNewChat({
    ...socketDto,
    chat: `<span class="bg-blue-100 text-blue-800 mr-2 px-2.5 py-0.5 rounded">Connected</span>`,
  });
});
socket.on('disconnect_user', (socketDto) => {
  drawNewChat({
    ...socketDto,
    chat: `<span class="bg-red-100 text-red-800 mr-2 px-2.5 py-0.5 rounded">Disconnected</span>`,
  });
});
socket.on('new_chat', (chatDto) => {
  drawNewChat(chatDto);
});

// handle
const handleSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue, (chatDto) => drawNewChat(chatDto));
    event.target.elements[0].value = '';
  }
};

// draw
function drawPreviousChat() {
  socket.emit('previous_chat', (chats) => {
    chats.forEach((chat) => drawNewChat(chat));
  });
}
const drawNewChat = ({ createdAt, username, chat }) => {
  const wrapperChatBox = document.createElement('div');
  wrapperChatBox.innerHTML = `
    <div class="flex flex-row bg-slate-100 text-xl">
      <div class="basis-2/12">
        <span class="bg-gray-300 text-gray-800 text-base font-medium mr-2 px-2.5 py-0.5 rounded">
         ${createdAt}
        </span>
      </div>
      <div class="basis-2/12 font-light border-r-2 border-green-500 mr-2">
        ${username}
      </div>
      <div class="basis-8/12">
        ${chat}    
      </div>
    </div>
  `;
  $chattingBox.append(wrapperChatBox);
};

function createUser() {
  let username = prompt('what is your name?');
  if (username === '') {
    username = Math.floor(Math.random() * 1000000);
  }

  socket.emit('new_user', username, (socketDto) => {
    drawNewChat({
      ...socketDto,
      chat: `<span class="bg-yellow-100 text-yellow-800 mr-2 px-2.5 py-0.5 rounded">Create User</span>`,
    });
  });
}

// init
function init() {
  $form.addEventListener('submit', handleSubmit);
  drawPreviousChat();
  createUser();
}

init();
