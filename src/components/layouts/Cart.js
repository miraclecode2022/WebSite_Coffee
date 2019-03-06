import React, { Component } from 'react';
import Title from './options/Title'
import CartTotal from './CartTotal'
import { ReactConsumer } from '../../context'
import './css/Cart.scss'

class Cart extends Component {

    render() {
        return (
            <div className="container">
                <Title name="Cart" />
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 cart-component">
                        <ReactConsumer>
                        {
                            (value) => {
                                return (
                                    value.cart && value.cart.length
                                    ?
                                        <form onSubmit={value.handleOrder}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="firstname">Họ</label>
                                                            <input type="text" className="form-control" id="firstname" name="firstname" placeholder="Họ" onChange={value.handleChange} required={true} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                        <label htmlFor="lastname">Tên</label>
                                                        <input type="text" className="form-control" id="lastname" name="lastname" placeholder="Tên" onChange={value.handleChange} required={true} />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="address">Địa chỉ</label>
                                                        <input type="text" className="form-control" id="address" name="address" placeholder="123 duong Le Loi." onChange={value.handleChange} required={true} />
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="city">City</label>
                                                            <input type="text" className="form-control" id="city" name="city" placeholder="Ho Chi Minh City" onChange={value.handleChange} required={true} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                        <label htmlFor="district">District</label>
                                                        <select id="district" className="form-control" name="district" onChange={value.handleChange} >
                                                            <option value="1">Cam</option>
                                                            <option value="2">Quýt</option>
                                                        </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-row">
                                                        <div className="form-group col-md-6">
                                                            <label htmlFor="phone">Phone</label>
                                                            <input type="text" className="form-control" id="phone" name="phone" placeholder="Ho Chi Minh City" onChange={value.handleChange} required={true} />
                                                        </div>
                                                        <div className="form-group col-md-6">
                                                        <label htmlFor="email">Email</label>
                                                        <input className="form-control" id="email" name="email" onChange={value.handleChange} required={true} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="clearfix"></p>
                                                <div className="table-responsive">
                                                    <table className="table shopping-cart-wrap">
                                                        <thead className="text-muted">
                                                            <tr>
                                                                <th scope="col">Product</th>
                                                                <th scope="col" width="300">Quantity</th>
                                                                <th scope="col" width="120">Price</th>
                                                                <th scope="col" width="200" className="text-right">Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                value.cart.map((d, ind) => {
                                                                    return(
                                                                        <tr key={ind}>
                                                                            <td>
                                                                                <figure className="media">
                                                                                    <div className="img-wrap"><img src={d.image} alt={d.name} className="img-thumbnail img-sm"/></div>
                                                                                    <figcaption className="media-body">
                                                                                        <h6 className="title text-truncate">{d.name}</h6>
                                                                                        <dl className="param param-inline small">
                                                                                            <dt>Price: </dt>
                                                                                            <dd>${d.price}</dd>
                                                                                        </dl>
                                                                                    </figcaption>
                                                                                </figure> 
                                                                            </td>
                                                                            <td> 
                                                                                <span className="box-add">
                                                                                    <span type="button" className="btn btn-quality" onClick={() => value.deCrement(d._id)}>-</span>
                                                                                    <span type="button" className="btn btn-quality box-quality">{d.count}</span>
                                                                                    <span type="button" className="btn btn-quality" onClick={() => value.inCrement(d._id)}>+</span>
                                                                                </span>
                                                                            </td>
                                                                            <td> 
                                                                                <div className="price-wrap"> 
                                                                                    <var className="price">${d.total}</var> 
                                                                                </div>
                                                                            </td>
                                                                            <td className="text-right"> 
                                                                                <button type="button" onClick={() => value.removeItem(d._id)} className="btn btn-outline-danger"><i className="fas fa-trash-alt"></i></button>
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                                <CartTotal value={value} />
                                            </div>
                                            <button type="submit" className="checkout-btn">Checkout</button>
                                        </form>
                                    :
                                        <h2 className="text-center"><i className="fas fa-shopping-cart"></i> Cart is empty</h2>
                                )
                            }
                        }
                        </ReactConsumer>
                    </div>
                </div>
            </div>
        );
    }
}

export default Cart;