import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ReactConsumer } from '../../context'
import './css/Product.scss'

class Product extends Component {
    render() {
        const { id, name, image, inCart, price } = this.props.product
        return (
            <div className="col-lg-4 col-sm-6 mb-4">
                <div className="card h-100 product-info">
                    <Link to={`/product/${id}`} className="product-link"><img className="card-img-top" src={image} alt={name} /></Link>
                    <div className="card-body product-details">
                        <h5 className="card-title">
                            <Link to={`/product/${id}`} className="product-name">{name}</Link>
                            <span className="product-price">{price}$</span>
                        </h5>
                        <div className="add-to-card-box">     
                            <ReactConsumer>
                            {
                                (c) => {
                                    return(
                                        <button type="button" className="add-to-card-btn" onClick={() => c.addToCart(id)} disabled={inCart ? true : false}>
                                        {
                                            inCart
                                            ?
                                                <span><i className="fas fa-check"></i> In Cart</span>
                                            :
                                                <span><i className="fas fa-shopping-cart"></i> Add to cart</span>
                                        }
                                        </button>
                                    )
                                }
                            }
                            </ReactConsumer>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;