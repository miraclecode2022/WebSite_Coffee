import React, { Component } from 'react';
import { ReactConsumer } from '../../../context'
import Title from '../options/Title'


class ProductDetails extends Component {

    render() {
        return (
            <ReactConsumer>
            {
                (c) => {
                    let detailPro = c.product && c.product.length ? c.product.filter(item => {
                        return item._id === this.props.match.params.id
                    }).map(item => {
                        return item
                    }) : <div className="lds-dual-ring"></div>
                    return(
                        detailPro && detailPro.length ? detailPro.map(d => {
                            return(
                                <React.Fragment key={d._id}>
                                    <div className="bg-light">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-xs-12 col-md-12">
                                                    <div className="product-detail">
                                                        <div className="image-product">
                                                            <img src={d.image} alt={d.name} />
                                                        </div>
                                                        <div className="info-product">
                                                            <h1 className="name">{d.name}</h1>
                                                            <p className="price">${d.price}</p>
                                                            <button type="button" className="add-to-card-btn" onClick={() => c.addToCart(d._id)} disabled={d.inCart ? true : false}>
                                                                {
                                                                d.inCart
                                                                ?
                                                                    <span><i className="fas fa-check"></i> In Cart</span>
                                                                :
                                                                    <span><i className="fas fa-shopping-cart"></i> Add to cart</span>
                                                            }
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-dark">
                                        <div className="container">
                                            <div className="row">
                                                <div className="col-md-12">
                                                    <Title name="Description" />
                                                    <p className="product-description">{d.desc}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        }) : <div className="lds-dual-ring"></div>
                    )
                }
            }
            </ReactConsumer>
        );
    }
}

export default ProductDetails;