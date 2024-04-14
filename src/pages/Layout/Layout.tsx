import { Outlet } from 'react-router-dom';
import logo from '@assets/Frame.png';
import style from '@pages/Layout/Layout.module.css';
import Badge from '@/components/ui/Badge/Badge';
import Button from '@/components/ui/Button/Button';
import Navbar from '@/components/ui/Navbar/Navbar';
import Modal from '@/components/ui/Modal/Modal';
import { useState } from 'react';

function Layout() {
  const [displayModal, setDisplayModal] = useState(false);

  return (
    <>
      <header className={style.container}>
        <img src={logo} className={style.logo} alt="Logo" />
        <h1 className={style.pageTitle}>Home</h1>
      </header>

      <div className={style.pageContent}>
        <div className={style.sideNav}>
          <Badge userId="" username="" />
          <Navbar />
          <Button
            color="primary"
            title="Create new post"
            onClick={() => setDisplayModal(true)}
          />
          {displayModal && (
            <Modal onClose={() => setDisplayModal(!displayModal)} />
          )}
          <Button color="dark" title="Sign out" onClick={() => {}} />
        </div>

        <main className={style.mainContent}>
          <Outlet />
        </main>
      </div>
    </>
  );
}

export default Layout;
