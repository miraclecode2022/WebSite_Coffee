import React from 'react'

const CartTotal = ({value}) => {
    const { cartSubtotal, cartTax, cartTotal } = value
    return(
        <React.Fragment>
            <div className="total-cart">
                <button type="button" onClick={() => value.clearCart()} className="btn btn-danger mb-3"><i className="fas fa-trash-alt"></i> Clear all cart</button>
                <h6 className="text-right text-uppercase">Sub Total : ${cartSubtotal}</h6>
                <h6 className="text-right text-uppercase">Tax : ${cartTax}</h6>
                <h5 className="text-right text-uppercase mt-10 font-weight-bold">Cart Total : ${cartTotal}</h5>
            </div>
        </React.Fragment>
    )
}

export default CartTotal