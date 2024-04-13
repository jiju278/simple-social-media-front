import { AuthGateway } from '@/lib/auth/model/auth.gateway';
import { userAuthenticated } from '@/lib/auth/reducer';
import { AppStore } from '@/lib/create-store';

export const onAuthStateChangedListener = ({
  store,
  authGateway,
}: {
  store: AppStore;
  authGateway: AuthGateway;
}) => {
  authGateway.onAuthStateChanged((user) => {
    store.dispatch(userAuthenticated({ authUser: user }));
  });
};
