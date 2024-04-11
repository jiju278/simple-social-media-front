import { Outlet } from 'react-router-dom';
import logo from '@assets/Frame.png';
import style from './Layout.module.css';
import Badge from '@/components/ui/Badge/Badge';

import Button from '@/components/ui/Button/Button';
import Navbar from '@/components/ui/Navbar/Navbar';

function Layout() {
  return (
    <>
      <header className={style.container}>
        <img src={logo} className={style.logo} alt="Logo" />
        <h1 className={style.pageTitle}>Home</h1>
      </header>

      <Badge />
      <Navbar />
      <Button color="primary" title="Create new post" />
      <Button color="dark" title="Sign out" />

      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
