import React from 'react';
import Checker from '../Checker/Checker';

import './Status.css';

const Status = (props) => {

    //Calculate score
    const calculateScore = () => {

        let scoreP1 = 0;
        let scoreP2 = 0;

        props.points.map((point, index) => {

            if (point.player) { //Check if the point belongs to a player

                if (point.player === 1) { //if player 1
                    scoreP1 += (24 - index) * point.checkers
                } else { //If player 2
                    scoreP2 += (index + 1) * point.checkers
                }
            }
            return false;
        });

        //Score from grayBar
        if (props.grayBar.checkersP1) {
            scoreP1 += 25 * props.grayBar.checkersP1;
        }
        if (props.grayBar.checkersP2) {
            scoreP2 += 25 * props.grayBar.checkersP2;
        }

        return { 'P1': scoreP1, 'P2': scoreP2 };
    }

    const score = calculateScore();

    return (
        <div id="status">
            <div id="gameLogo">
                <p className="status-title" >Backgammon</p>
            </div>
            <div id="game-score">
                <div className="player-score-container">
                    <div className="player-score-name">
                        <p>{props.players.p1}</p>
                    </div>
                    <div className="player-score-checker">
                        <Checker player={1} count={1} />
                    </div>
                    <div className="player-score">
                        <p>{score.P1}</p>
                    </div>
                </div>
                <div className="player-score-container">
                    <div className="player-score-name">
                        <p>{props.players.p2}</p>
                    </div>
                    <div className="player-score-checker">
                        <Checker player={2} count={1} />
                    </div>
                    <div className="player-score">
                        <p>{score.P2}</p>
                    </div>
                </div>
            </div>
            <div id="game-menu">
                <button
                    className="btn btn-success"
                    onClick={props.toggleMenuHandler}>Menu</button>
            </div>

        </div>
    );

}

export default Status;
