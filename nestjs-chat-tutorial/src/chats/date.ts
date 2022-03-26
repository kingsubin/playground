import * as dayjs from 'dayjs';
import ko from 'dayjs/locale/ko';
dayjs.locale(ko);

export const formattedDate = (createdAt) => {
  return dayjs(createdAt).format('YY-MM-DD HH:mm:ss');
};
