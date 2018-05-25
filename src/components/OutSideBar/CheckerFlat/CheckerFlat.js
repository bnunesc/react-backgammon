import React from 'react';
import './CheckerFlat.css';

const checkerFlat = (props) => {

    let classes = 'checkerFlat';
    if (props.player === "1"){
        classes += ' checkerFlatP1'
    }
    else {
        classes += ' checkerFlatP2'
    }

    return (
        <div className={classes} />
    )

}

export default checkerFlat;