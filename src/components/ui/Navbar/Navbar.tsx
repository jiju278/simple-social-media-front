import { Link } from 'react-router-dom';
import Navbutton from '@/components/ui/Navbutton/Navbutton';
import style from '@components/ui/Navbar/Navbar.module.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link className={style.link} to="/">
        <Navbutton />
      </Link>
    </nav>
  );
};

export default Navbar;
