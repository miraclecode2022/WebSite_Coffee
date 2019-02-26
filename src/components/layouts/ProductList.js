import React, { Component } from 'react';
import Title from './options/Title'
import Product from './Product'
import { ReactConsumer } from '../../context'

class ProductList extends Component {
    render() {
        return(
            <div className="container">
                <Title name="Menu" />
                <div className="row">
                    <ReactConsumer>
                    {
                        (value) => {
                            return value.product.map((product, ind) => {
                                return <Product key={ind} product={product} />
                            })
                        }
                    }
                    </ReactConsumer>
                </div>
            </div>
        )
    }
}

export default ProductList;