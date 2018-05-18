import React from 'react';
import './RollButton.css';


const rollButton = (props) => {

//    console.log("Roll Button");

    return (
        <div className="rollButton" onClick={props.clicked}>
            <div className="rollButtonContent">
                <p>{props.label}</p>
            </div>
        </div>
    )
}

export default rollButton;