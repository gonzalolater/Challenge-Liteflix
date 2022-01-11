import './App.css';
import Home from "./components/Pages/Home/Home"
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CasillaDeMensajes from './components/Pages/CasillaMensajes/CasillaDeMensajes';
import Admin from './components/Pages/Login/Admin'
import Login from './components/Pages/Login/Login';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/casillademensajes" component={CasillaDeMensajes}/>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/login" component={Login}></Route>
          </Switch>
      </Router>
    </div>
  );
}

export default App;
