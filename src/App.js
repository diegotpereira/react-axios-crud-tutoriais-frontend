import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { Component } from "react";

import AddTutorial from "./components/add-tutorial.component";
import Tutorial from "./components/tutorial.component";
import TutoriaisLista from "./components/tutoriais-lista.component"

class App extends Component {

  render() {
    return (

      <Router>
          <div>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <a href="/tutoriais" className="navbar-brand">
                DTP SOFTWARE
              </a>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={"/tutoriais"} className="nav-link">
                    Tutoriais
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"{/add"} className="nav-link">
                    Novo
                  </Link>
                </li>
              </div>
            </nav>
  
            <div className="container mt-3">
              <Switch>
                <Route exact path={["/", "/tutoriais"]} component={TutoriaisLista} />
                <Route exact path="/add" component={AddTutorial  } />
                <Route path="/tutoriais/:id" component={Tutorial}/>
              </Switch>
            </div>
        </div>
      </Router>
      
    );
  }
}

export default App;
