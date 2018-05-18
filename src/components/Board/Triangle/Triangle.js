import React from 'react';
import './Triangle.css';

const Triangle = (props) => {

    let classOrientation = '';
    let classColor = '';
    let classReceivable = '';
    let pieceContainerClasses = '';


    if (props.position === "top") {
        classOrientation = "Up";
    }
    else {
        classOrientation = "Down";
        pieceContainerClasses = " pieceContainerDown";
    }

    if (props.color !== "1") {
        classColor += "C2";
    }

    let action = null;
    if (props.canReceive) {
        action = props.canReceive;
        pieceContainerClasses += ' containerClickable';
        classReceivable = 'Receivable';
        classColor = '';
    }
    if (props.canMove) {
        action = props.canMove;
        pieceContainerClasses += ' containerClickable';
    }



    return (
        <div className="triangle col-xs-2 " >
            <div className={"trianglePart triangleLeft" + classOrientation + classColor + classReceivable}></div>
            <div className={"trianglePart triangleRight" + classOrientation + classColor + classReceivable}></div>
            <div className={"pieceContainer " + pieceContainerClasses} onClick={action}>
                {props.children}
            </div>
        </div>

    );

}

export default Triangle;