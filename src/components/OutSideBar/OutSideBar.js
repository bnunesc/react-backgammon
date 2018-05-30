import React from 'react';
import './OutSideBar.css';

import CheckerFlat from './CheckerFlat/CheckerFlat';

const OutSideBar = (props) => {


    const getFlatCheckers = (player, numberOfCheckers) => {

        const checkers = [];

        for (let i = 0; i < numberOfCheckers; i++) {
            checkers.push(<CheckerFlat player={player} key={'OSBP' + player + 'C' + i} />);
        }

        return checkers
    }

    let classReceivableP1 = '';
    let classReceivableP2 = '';
    if (props.checkers.p1CanReceive) {
        classReceivableP1 = ' receivable';
    }
    if (props.checkers.p2CanReceive) {
        classReceivableP2 = ' receivable';
    }

    const checkersP1 = getFlatCheckers("1", props.checkers.checkersP1);
    const checkersP2 = getFlatCheckers("2", props.checkers.checkersP2);

    let undoButtonclass = 'disabled';
    let undoButtonFunction;
    if (props.currentPosition) {
        undoButtonclass = '';
        undoButtonFunction = props.undoHandler;
    }

    return (
        <div id="outSide" className="row">

            <div className="undoButton">
                <button
                    className={"btn btn-warning " + undoButtonclass}
                    onClick={undoButtonFunction}>Undo
                    </button>
            </div>

            <div className="blocksUp">
                <div className="shadowBox"></div>
                <div className={"pointContainer" + classReceivableP1}
                    onClick={props.checkers.p1CanReceive}
                >
                    {checkersP1}
                </div>
            </div>

            <div className="blocksDown">
                <div className="shadowBox"></div>
                <div className={"pointContainer pointContainerDown" + classReceivableP2}
                    onClick={props.checkers.p2CanReceive}
                >
                    {checkersP2}
                </div>
            </div>
        </div>
    )
}

export default OutSideBar;