import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Main from './components/main';
import Login from './components/login';
import SignUp from './components/signUp';
import Home from './components/home';
import MakeRoom from './components/makeRoom';
import Room from './components/room';

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact render={() => <Main />} />
      <Route path="/login" exact component={Login} />
      <Route path="/signUp" exact component={SignUp} />
      <Route path="/home" exact component={Home} />
      <Route path="/makeRoom" exact component={MakeRoom} />
      <Route path="/room" exact component={Room} />
    </Switch>
  </Router>
);

// eslint-disable-next-line no-lone-blocks
{
  /* <Link to={{ pathname: '/talk', state: { hi: name, number: roomID } }}> // 링크 투 예제 -> chat_app main.tsx 참고해주셈.
            <button
              type="button"
              onClick={() => {
                setRoomID('');
              }}
            >
              send
            </button>
          </Link> */
}

export default App;
