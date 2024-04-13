import Button from '@/components/ui/Button/Button';
import { selectIsUserAuthenticated } from '@/lib/auth/reducer';
import { authenticate } from '@/lib/auth/usecases/authenticate.usecase';
import { AppDispatch } from '@/lib/create-store';
import logo from '@assets/white_frame.png';
import style from '@pages/Login/Login.module.css';
import { FormEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const [authenticating, setAuthenticating] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthenticating(true);
    dispatch(authenticate())
      .unwrap()
      .finally(() => setAuthenticating(false));
  };

  useEffect(() => {
    if (isUserAuthenticated) {
      navigate('/');
    }
  }, [isUserAuthenticated, navigate]);

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
            />

            <label className={style.label} htmlFor="password">
              Password
            </label>
            <input
              className={style.input}
              type="password"
              id="password"
              name="password"
            />

            <Button
              color="primary"
              title={authenticating ? 'Loading...' : 'Sign in'}
            />
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
