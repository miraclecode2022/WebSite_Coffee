import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { ReactConsumer } from '../../context'
import './css/Product.scss'

class Product extends Component {
    
    change_alias = (alias) => {
        let str = alias;
        str = str.toLowerCase();
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
        str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
        str = str.replace(/đ/g,"d");
        str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\\=|\\<|\\>|\?|\/|,|\.|\\:|\\;|\\'|\\"|\\&|\\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,"-");
        str = str.replace(/ + /g,"-");
        str = str.replace(/ /g,"-");
        str = str.trim(); 
        return str;
    }

    render() {
        const { _id, name, image, inCart, price } = this.props.product
        return (
            <div className="col-lg-4 col-sm-6 mb-4">
                <div className="card h-100 product-info">
                    <Link to={`/product/${this.change_alias(name)+"."+_id}.html`} className="product-link"><img className="card-img-top" src={image} alt={name} /></Link>
                    <div className="card-body product-details">
                        <h5 className="card-title">
                            <Link to={`/product/${this.change_alias(name)+"."+_id}.html`} className="product-name">{name}</Link>
                            <span className="product-price">{price}$</span>
                        </h5>
                        <div className="add-to-card-box">     
                            <ReactConsumer>
                            {
                                (c) => {
                                    return(
                                        <button type="button" className="add-to-card-btn" onClick={() => c.addToCart(_id)} disabled={inCart ? true : false}>
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