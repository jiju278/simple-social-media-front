import Badge from '@/components/ui/Badge/Badge';
import style from '@components/ui/Timeline/TimelineMessage.module.css';
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';

const TimelineMessage = ({
  message,
}: {
  message: {
    id: string;
    userId: string;
    username: string;
    profilePictureUrl: string;
    publishedAt: string;
    text: string;
  };
}) => {
  return (
    <div className={style.container}>
      <Badge userId={message.userId} username={message.username} />
      <p>{message.text}</p>
      <div className={style.footer}>
        <AiOutlineLike className={style.thumb} />
        <AiOutlineDislike className={style.thumb} />
        <p className={style.counter}>
          Likes: <span className={style.counterValue}>18</span>
        </p>
        <p className={style.counter}>
          Dislikes: <span className={style.counterValue}>10</span>
        </p>
      </div>
    </div>
  );
};

export default TimelineMessage;
