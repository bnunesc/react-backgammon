import React from 'react';
import './Dice.css';

const dice = (props) => {

    const dots = Array(9).fill(null);
    switch (props.number) {
        case 1:
            dots[4] = true;
            break;
        case 2:
            dots[0] = true;
            dots[8] = true;
            break;
        case 3:
            dots[0] = true;
            dots[4] = true;
            dots[8] = true;
            break;
        case 4:
            dots[0] = true;
            dots[2] = true;
            dots[6] = true;
            dots[8] = true;
            break;
        case 5:
            dots[0] = true;
            dots[2] = true;
            dots[4] = true;
            dots[6] = true;
            dots[8] = true;
            break;
        case 6:
            dots[0] = true;
            dots[2] = true;
            dots[3] = true;
            dots[5] = true;
            dots[6] = true;
            dots[8] = true;
            break;
        default:
            break;
    }

    const die = [...Array(3)].map((_, indexRow) => {

        return (
            <div className="diceRow" key={'dr' + indexRow}>{
                [...Array(3)].map((_, indexCol) => {
                    return (
                        <div className="diceColum" key={'dc' + (indexRow * 3) + indexCol}>
                            {dots[(indexRow * 3) + indexCol] ? <div className="diceFilled"></div> : ""}
                        </div>
                    )
                })
            }</div>
        )

    });

    return (
        <div className="dice">
            <div className="diceContent">
                {die}
            </div>
        </div>
    );
}

export default dice;