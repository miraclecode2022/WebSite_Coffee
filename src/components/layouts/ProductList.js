import React, { Component } from 'react';
import Title from './options/Title'
import Product from './Product'
import { ReactConsumer } from '../../context'

class ProductList extends Component {
    render() {
        return(
            <div className="bg-light">
                <div className="container">
                    <Title name="Menu" />
                    <div className="row">
                        <ReactConsumer>
                        {
                            (value) => {
                                return (
                                    value.isLoading 
                                    ? 
                                        value.product.map((product, ind) => {
                                            return <Product key={ind} product={product} />
                                        })
                                    :
                                        <div className="lds-dual-ring"></div>
                                )
                            }
                        }
                        </ReactConsumer>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductList;