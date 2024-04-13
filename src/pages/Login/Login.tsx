import Button from '@/components/ui/Button/Button';
import logo from '@assets/white_frame.png';
import style from '@pages/Login/Login.module.css';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className={style.container}>
      <div className={style['logo-section']}>
        <img className={style.logo} src={logo} alt="logo" />
      </div>
      <div className={style['signin-section']}>
        <div className={style['signin-form']}>
          <h2 className={style['form-title']}>Sign in</h2>
          <form className={style.form} onSubmit={handleSubmit}>
            <label className={style.label} htmlFor="email">
              Email
            </label>
            <input
              className={style.input}
              type="email"
              id="email"
              name="email"
              required
            />

            <label className={style.label} htmlFor="password">
              Password
            </label>
            <input
              className={style.input}
              type="password"
              id="password"
              name="password"
              required
            />

            <Button color="primary" title="Sign in" />
          </form>
          <p>
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
