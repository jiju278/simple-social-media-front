import style from '@components/ui/Badge/Badge.module.css';

const Badge = ({ userId, username }: { userId: string; username: string }) => {
  return (
    <div className={style.badgeContainer}>
      <p className={style.badgePrefix}>MB</p>
      <div className={style.badgeUserContainer}>
        <p className={style.badgeFullname}>{username}</p>
        <p className={style.badgeUsername}>@{userId}</p>
      </div>
    </div>
  );
};

export default Badge;
