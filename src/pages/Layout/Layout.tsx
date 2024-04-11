import { Link, Outlet } from 'react-router-dom';
import logo from '@assets/Frame.png';
import style from './Layout.module.css';
import Badge from '@/components/ui/Badge/Badge';
import Navbutton from '@/components/ui/Navbutton/Navbutton';

function Layout() {
  return (
    <>
      <header className={style.container}>
        <img src={logo} className={style.logo} alt="Logo" />
        <h1 className={style.pageTitle}>Home</h1>
      </header>

      <Badge />
      <Navbutton />

      <div className="navbar-section">
        <nav className="navbar">
          <div>
            <Link to="/">Home</Link>
          </div>
        </nav>
      </div>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
