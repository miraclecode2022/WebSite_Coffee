import React, { Component } from 'react';

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
            isLoading: true,
            orders: [],
            firstname: "",
            lastname: "",
            address: "",
            city: "",
            district: "",
            phone: "",
            email: ""
        }
    }

    componentDidMount = () => {
        this.SetProduct()
    }

    getItem = (id) => {
        const product = this.state.product.find(item => item._id === id)
        return product
    }

    SetProduct = () => {
        this.setState({ isLoading : false})
        fetch(`https://coffee-code-6868.herokuapp.com/products`, {
            method: 'GET'
        })
        .then(result => result.json())
        .then(result => {
            let tempProducts = []
            result.products.forEach(item => {
                const singleItem = { ...item }
                tempProducts = [...tempProducts, singleItem]
            })
            this.setState(() => {
                return { product: tempProducts, isLoading: true }
            })
        })
        .catch(err => console.log(err))  
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
        tempCart = tempCart.filter(item => item._id !== id)
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
        const selectedProduct = tempCart.find(item => item._id === id)
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
        const selectedProduct = tempCart.find(item => item._id === id)
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

    handleOrder = (e) => {
        e.preventDefault()
        let tempOrder = []
        this.state.cart.forEach(item => {
            let singleOrder = { ...item }
            delete singleOrder.desc
            delete singleOrder.image
            delete singleOrder.inCart
            delete singleOrder.name
            delete singleOrder.type
            tempOrder = [...tempOrder, singleOrder]
        })
        this.setState(() => {
            return { orders: tempOrder }
        }, () => {
            fetch(`http://localhost:8080/order/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    customer: {
                        firstname: this.state.firstname,
                        lastname: this.state.lastname,
                        address: this.state.address,
                        city: this.state.city,
                        district: this.state.district,
                        phone: this.state.phone,
                        email: this.state.email
                    },
                    orders: this.state.orders
                })
            })
            .then(result => result.json())
            .then(result => {
                if(result.status){
                    window.location = '/'
                }
            })
            .catch(err => console.log(err))
        })
    }

    handleChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
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
                    inCrement: this.inCrement,
                    handleOrder: this.handleOrder,
                    handleChange: this.handleChange
                }
            }>
                { this.props.children }
            </ReactContext.Provider>
        );
    }
}

const ReactConsumer = ReactContext.Consumer

export { ReactProvider, ReactConsumer };