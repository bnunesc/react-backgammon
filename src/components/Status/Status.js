import React from 'react';
import Checker from '../Checker/Checker';

import './Status.css';

const Status = (props) => {

    return (
        <div id="status" className="container-flow">
            <div id="gameStatus" className="col-xs-4 bg-primary ">
                <p>status</p>
                <button onClick={props.newGameHandler.bind(this, 1)}>New Game</button>
            </div>
            <div id="gameCount" className="col-xs-8  bg-warning">
                <div className="col-xs-6 bg-danger">

                    <div className="col-xs-4">
                        <p>Player 1</p>
                    </div>
                    <div className="col-xs-5 bg-primary">
                        <Checker player={1} count={1} />
                    </div>
                    <div className="col-xs-2">
                        <p>141</p>
                    </div>

                </div>
                <div className="col-xs-6 bg-danger">

                    <div className="col-xs-4">
                        <p>Player 1</p>
                    </div>
                    <div className="col-xs-5 bg-primary">
                        <Checker player={2} count={1} />
                    </div>
                    <div className="col-xs-2">
                        <p>141</p>
                    </div>

                </div>
            </div>

        </div>
    );

}

export default Status;
