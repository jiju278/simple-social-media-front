import { Outlet } from 'react-router-dom';
import logo from '@assets/Frame.png';
import style from './Layout.module.css';

function Layout() {
  return (
    <>
      <header className={style.container}>
        <img src={logo} className={style.logo} alt="Logo" />
        <h1 className={style.pageTitle}>Home</h1>
      </header>

      <Outlet />
    </>
  );
}

export default Layout;
