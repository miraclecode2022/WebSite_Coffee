import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Navbar from './components/layouts/Navbar'
import Index from './components/layouts/Index'
import Cart from './components/layouts/Cart'
import ProductList from './components/layouts/ProductList'
import NotFound from './components/layouts/NotFound'
import Footer from './components/layouts/Footer'
import ProductDetails from './components/layouts/products/ProductDetails'
import './App.css'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar/>
        <Switch>
          <Route path="/" exact component={Index}/>
          <Route path="/cart" component={Cart}/>
          <Route path="/products" component={ProductList}/>
          <Route path="/product/:name.:id.html" render={(props) => <ProductDetails {...props} />}/>
          <Route component={NotFound}/>
        </Switch>
        <Footer/>
      </React.Fragment>
    );
  }
}

export default App;
