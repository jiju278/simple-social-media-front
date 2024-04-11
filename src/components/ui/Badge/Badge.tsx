import style from '@components/ui/Badge/Badge.module.css';

const Badge = () => {
  return (
    <div className={style.badgeContainer}>
      <p className={style.badgePrefix}>MB</p>
      <div className={style.badgeUserContainer}>
        <p className={style.badgeFullname}>Matesuz Sinito</p>
        <p className={style.badgeUsername}>@m_sinito</p>
      </div>
    </div>
  );
};

export default Badge;
