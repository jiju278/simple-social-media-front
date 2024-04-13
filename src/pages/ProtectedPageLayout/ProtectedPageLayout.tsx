import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsUserAuthenticated } from '@/lib/auth/reducer';
import { useEffect } from 'react';
import Layout from '@/pages/Layout/Layout';

function ProtectedPageLayout() {
  const isUserAuthenticated = useSelector(selectIsUserAuthenticated);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isUserAuthenticated) {
      navigate('/login');
    }
  }, [isUserAuthenticated, navigate]);

  if (!isUserAuthenticated) {
    return null;
  }
  return <Layout />;
}

export default ProtectedPageLayout;
