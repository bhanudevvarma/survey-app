import React from "react";
import { useNavigate } from "react-router-dom";
import  './SuccessPage.css';





const SuccessPage = ()  => {
    const navigate = useNavigate();


    const handleClick = () => {
        navigate('/surveys/survey-result')
    }


    return (

    <div className="center" >
        <h1 className="header">Thank You! <br></br> For Successfully Submitting Survey</h1>

            <button className="bubble-btn button" onClick={handleClick}>
                Load Answers
            </button>
    </div>

    )
}

export default SuccessPage;