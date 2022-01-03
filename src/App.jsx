import './App.css';
import Home from "./components/Pages/Home/Home"
import Navbar from './components/Navbar/Navbar'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
    <Navbar/>
      <Switch>
      <Route exact path='/' component={Home}></Route>
      </Switch>
    </Router>
    

    </div>
  );
}

export default App;