import React from 'react';
import './Piece.css';

const piece = (props) => {

    let classes = 'piece';
    if (props.player === 1){
        classes += ' pieceP1'
    }
    else {
        classes += ' pieceP2'
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

export default piece;
