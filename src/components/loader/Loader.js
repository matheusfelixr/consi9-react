import React from 'react';

import './Loader.css';

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner'


const LoaderBasic = () => {
    return(               
            <div className="Loader">
                <Loader type="Oval" color="black" height={130} width={130}/>
            </div>
    );
 }


export default LoaderBasic ;