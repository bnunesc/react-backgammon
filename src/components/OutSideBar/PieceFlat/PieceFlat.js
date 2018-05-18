import React from 'react';
import './PieceFlat.css';

const pieceFlat = (props) => {

    let classes = 'pieceFlat';
    if (props.player === "1"){
        classes += ' pieceFlatP1'
    }
    else {
        classes += ' pieceFlatP2'
    }

    return (
        <div className={classes} />
    )

}

export default pieceFlat;