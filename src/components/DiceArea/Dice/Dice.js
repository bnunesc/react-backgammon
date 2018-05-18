import React from 'react';
import './Dice.css';

const dice = (props) => {

    const numbers = Array(9).fill(null);
    switch (props.number) {
        case 1:
            console.log("Dice: 1");
            numbers[4] = true;
            break;
        case 2:
            console.log("Dice: 2");
            numbers[0] = true;
            numbers[8] = true;
            break;
        case 3:
            console.log("Dice: 3");
            numbers[0] = true;
            numbers[4] = true;
            numbers[8] = true;
            break;
        case 4:
            console.log("Dice: 4");
            numbers[0] = true;
            numbers[2] = true;
            numbers[6] = true;
            numbers[8] = true;
            break;
        case 5:
            console.log("Dice: 5");
            numbers[0] = true;
            numbers[2] = true;
            numbers[4] = true;
            numbers[6] = true;
            numbers[8] = true;
            break;
        case 6:
            console.log("Dice: 6");
            numbers[0] = true;
            numbers[2] = true;
            numbers[3] = true;
            numbers[5] = true;
            numbers[6] = true;
            numbers[8] = true;
            break;
        default:
            break;
    }

    let output = Array(3);
    let dots;

    for (let i = 0; i < 3; i++) {

        dots = Array(3);

        for (let j = 0; j < 3; j++) {
            dots.push(<div className="diceColum" key={'dc' + (i * 3) + j}>
                {numbers[(i * 3) + j] ? <div className="diceFilled"></div> : ""}
            </div>)
        }
        output.push(<div className="diceRow" key={'dr' + i}>{dots}</div>);
    }

    return (
        <div className="dice">
            <div className="diceContent">
                {output}
            </div>
        </div>
    );
}

export default dice;