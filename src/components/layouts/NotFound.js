import React from 'react'
import './css/NotFound.scss'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return(
        <div className="page-not-found">
            <h1 className="text-center">
                <i className="fas fa-coffee">
                    <span className="smokes"></span>
                    <span className="smokes"></span>
                    <span className="smokes"></span>
                    </i> Page Not Found
            </h1>
            <Link to='/' className="go-home"><i className="fas fa-chevron-left"></i></Link>
        </div>
    )
}

export default NotFound