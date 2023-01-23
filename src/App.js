import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
    totalAmount: 0,
  }

  addCartItem = product => {
    const {price, quantity} = product
    console.log(product.price)
    this.setState(prevState => ({
      cartList: [...prevState.cartList, product],
      totalAmount: prevState.totalAmount + price * quantity,
    }))
  }

  deleteCartItem = id => {
    const {cartList} = this.state
    const filteredList = cartList.filter(each1 => each1.id !== id)
    const filteredList2 = cartList.filter(each2 => each2.id === id)
    this.setState(prev => ({
      cartList: filteredList,
      totalAmount:
        prev.totalAmount - filteredList2[0].price * filteredList2[0].quantity,
    }))
  }

  render() {
    const {cartList, totalAmount} = this.state

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            totalAmount,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
