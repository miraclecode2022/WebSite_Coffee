import React, { Component } from 'react';
import { storeProducts } from './components/data/data'

const ReactContext = React.createContext()

class ReactProvider extends Component {
    constructor(props){
        super(props);
        this.state = {
            product: [],
            cart: [],
            detailProduct: [],
            cartTotal: 0,
            cartSubtotal: 0,
            cartTax: 0,
        }
    }

    componentDidMount = () => {
        this.SetProduct()
    }

    getItem = (id) => {
        const product = this.state.product.find(item => item.id === id)
        return product
    }

    SetProduct = () => {
        let tempProducts = []
        storeProducts.forEach(item => {
            const singleItem = { ...item }
            tempProducts = [...tempProducts, singleItem]
        })
        this.setState(() => {
            return { product: tempProducts }
        })
    }

    handleDetails = (id) => {
        const product = this.getItem(id)
        this.setState(() => {
            return { detailProduct: product }
        })
    }

    removeItem = (id) => {
        let tempProducts = [...this.state.product]
        let tempCart = [...this.state.cart]
        tempCart = tempCart.filter(item => item.id !== id)
        const index = tempProducts.indexOf(this.getItem(id))
        let removeProduct = tempProducts[index]
        removeProduct.inCart = false
        removeProduct.count = 0
        this.setState({
            cart : [...tempCart],
            product : [...tempProducts]
        }, () => {
            this.addTotals()
        })
    }

    addToCart = (id) => {
        let tempProducts = [...this.state.product]
        const index = tempProducts.indexOf(this.getItem(id))
        const product = tempProducts[index]
        product.inCart = true
        product.count += 1
        const price = product.price
        product.total = price
        this.setState(() => {
            return {product : tempProducts, cart: [...this.state.cart, product]}
        }, () => { this.addTotals()})
        
    }

    clearCart = () => {
        this.setState({
            cart: []
        }, 
            () => {
                this.SetProduct()
                this.addTotals()
            }
        )
    }

    addTotals = () => {
        let subTotal = 0
        this.state.cart.map(item => (subTotal += item.total))
        const tempTax = subTotal * 0.1
        const tax = parseFloat(tempTax.toFixed(2))
        const total = subTotal + tax
        this.setState(() => {
            return {
                cartSubtotal: subTotal, 
                cartTax: tax,
                cartTotal: total
            }
        })
    }

    inCrement = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        product.count += 1
        product.total = product.count * product.price
        this.setState(() => {
            return { cart: [...tempCart] }
        }, () => { this.addTotals() })
    }

    deCrement = (id) => {
        let tempCart = [...this.state.cart]
        const selectedProduct = tempCart.find(item => item.id === id)
        const index = tempCart.indexOf(selectedProduct)
        const product = tempCart[index]
        product.count -= 1
        if (product.count === 0) {
            this.removeItem(id)
        } else {
            product.total = product.count * product.price
            this.setState(() => {
                return { cart: [...tempCart] }
            }, () => { this.addTotals() })
        }
    }

    render() {
        return (
            <ReactContext.Provider value={
                { 
                    ...this.state,
                    removeItem: this.removeItem,
                    addToCart: this.addToCart,
                    clearCart: this.clearCart,
                    deCrement: this.deCrement,
                    inCrement: this.inCrement
                }
            }>
                { this.props.children }
            </ReactContext.Provider>
        );
    }
}

const ReactConsumer = ReactContext.Consumer

export { ReactProvider, ReactConsumer };