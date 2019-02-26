import React from 'react';
import '../css/Title.scss'

const Title = ({name}) => {
    return(
        <h1 className="my-4 text-center title-component">{name}</h1>
    )
}

export default Title