import { Fragment } from 'react';
import Counter from './components/Counter';
import Auth from './components/Auth';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import { useSelector } from 'react-redux';

function App() {

  const isLoggedIn = useSelector(state => state.auth.isAuthentication)


  return (
    <Fragment>
      <Header />
      {!isLoggedIn && <Auth />}
      {isLoggedIn && <UserProfile />}

      <Counter />
    </Fragment>

  );
}

export default App;
