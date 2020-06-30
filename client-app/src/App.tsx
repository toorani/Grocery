import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import { Navbar, Nav } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Link,
  Switch,
  Route
} from 'react-router-dom';
import { ShopstoreList } from './components/Shopping/ShopstoreList';
import { NewBuy } from './components/Buying/NewBuy';


function App() {
  return (
    <Router>
      
        <Navbar variant="dark" bg="dark" >
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/shopping">Shopping</Nav.Link>
          </Nav>
          
        </Navbar>
        <Switch>
          <Route exact={true} path="/">
            <NewBuy/>  
          </Route>
          <Route path="/shopping">
            <ShopstoreList />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
