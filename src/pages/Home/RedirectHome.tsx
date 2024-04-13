import { selectIsUserAuthenticated } from '@/lib/auth/reducer';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RedirectHome = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsUserAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [navigate, isAuthenticated]);

  return null;
};

export default RedirectHome;
