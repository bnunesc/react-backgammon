import React from 'react';
import './Checker.css';

const checker = (props) => {

    let classes = 'checker';
    if (props.player === 1){
        classes += ' checkerP1'
    }
    else {
        classes += ' checkerP2'
    }

    if (props.canMove === 1) {
        classes += ' canMove'
    }

    return (
        <div className={classes}>
            <p>{props.count > 1? props.count: ''}</p>
        </div>
    );
}

export default checker;
