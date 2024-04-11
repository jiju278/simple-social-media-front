import Badge from '@/components/ui/Badge/Badge';
import style from '@components/ui/Timeline/TimelineMessage.module.css';
import { AiOutlineLike } from 'react-icons/ai';
import { AiOutlineDislike } from 'react-icons/ai';

const TimelineMessage = () => {
  return (
    <div className={style.container}>
      <Badge />
      <p>
        Je ne combats pas les personnes, je m'attaque aux idées. Tenir ce genre
        de position, c'est appartenir au camp des personnes raisonnables, voire
        à celui du bien. L'idée est de s'auto-positionner au-dessus des
      </p>
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
