import React from 'react';
import './RollButton.css';


const rollButton = (props) => {

//    console.log("Roll Button");
    let clickable = '';
    if (props.clicked){
        clickable = ' clickable';
    }

    return (
        <div className="rollButton" onClick={props.clicked}>
            <div className={"rollButtonContent" + clickable}>
                <p>{props.label}</p>
            </div>
        </div>
    )
}

export default rollButton;