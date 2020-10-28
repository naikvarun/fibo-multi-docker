import React from 'react';
import './App.css';
import Header from "./Header";
import {
  BrowserRouter,
  Route,
  Switch
} from "react-router-dom";
import OtherPage from "./OtherPage";
import Fib from "./Fib";


function App() {
  return (
    <>
      <BrowserRouter>
      <header>
        <Header/>
      </header>
      <div className="container-fluid">
        <Switch>
          <Route path="/" exact>
            <Fib />
          </Route>
          <Route path="/other">
            <OtherPage />
          </Route>
        </Switch>
      </div>
      </BrowserRouter>
    </>
  );
}

export default App;
