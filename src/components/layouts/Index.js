import React, { Component } from 'react'
import ProductList from './ProductList';
import './css/Index.scss'

class Index extends Component {
    render() {
        return (
            <React.Fragment>
                <header>
                    <div className="overlay" />
                    <video autoPlay="autoplay" muted="muted" loop={true}>
                        <source src="./videos/intro.mp4" type="video/mp4" />
                    </video>
                    <div className="container h-100">
                        <div className="d-flex h-100 text-center align-items-center">
                        <div className="w-100 text-white align-item">
                            <h1 className="display-3 animation-title">Coffee Code</h1>
                            <p className="lead mb-0 animation-slogan">I Turn Coffee Into Codes</p>
                        </div>
                        </div>
                    </div>
                    <div className="mouse"></div>
                </header>
                <ProductList />
            </React.Fragment>
        )
    }
}

export default Index;