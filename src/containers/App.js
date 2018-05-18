import React, { Component } from 'react';
import './App.css';

import Graybar from '../components/GrayBar/Graybar';
import OutSideBar from '../components/OutSideBar/OutSideBar';
import Board from '../components/Board/Board';

//temporary

import Piece from '../components/Piece/Piece';


//end temporary

class App extends Component {

    //Game status
    /*
    10 = not started
    20 = Roll dice
    30 = playing
    40 = no die to play
    50 = no moves available
    60 = player 1 won
    70 = player 2 won
    80 = ended
    */

    //Initial state
    state = {
        gameStatus: 10,
        history: [],
        currentPosition: 0,
        p1IsNext: true,
        dice: [0],
        points: Array(24).fill({ player: false, pieces: 0 }),
        grayBar: { piecesP1: 0, piecesP2: 0 },
        outSideBar: { piecesP1: 15, piecesP2: 15 },
        movingPiece: false,
    }


    //Receive the status and update the state
    // updateGame = (game) => {
    //     const gameStatus        = game.gameStatus !== undefined         ? game.gameStatus       : this.state.gameStatus;
    //     const history           = game.history !== undefined            ? game.history          : this.state.history;
    //     const currentPosition   = game.currentPosition !== undefined    ? game.currentPosition  : this.state.currentPosition;
    //     const p1IsNext          = game.p1IsNext !== undefined           ? game.p1IsNext         : this.state.p1IsNext;
    //     const dice              = game.dice !== undefined               ? game.dice             : this.state.dice;
    //     const points            = game.points !== undefined             ? game.points           : this.state.points;
    //     const grayBar           = game.grayBar !== undefined            ? game.grayBar          : this.state.grayBar;
    //     const outSideBar        = game.outSideBar !== undefined         ? game.outSideBar       : this.state.outSideBar;
    //     const movingPiece       = game.movingPiece !== undefined        ? game.movingPiece      : this.state.movingPiece;
    // };

    //set up new game
    setupNewGameHandler = (player) => {
        const gameStatus = 30;
        const history = [];
        const currentPosition = 0
        const p1IsNext = player === 1 ? true : false;
        const dice = [0];
        const points = Array(24).fill({ player: false, pieces: 0 });
        const grayBar = { piecesP1: 0, piecesP2: 0 };
        const outSideBar = { piecesP1: 0, piecesP2: 0 };
        const movingPiece = false;

        history.push(this.setHistory(p1IsNext, dice, points, grayBar, outSideBar));

        //set points
        points[0] = { player: 1, pieces: 2 };
        points[11] = { player: 1, pieces: 5 };
        points[16] = { player: 1, pieces: 3 };
        points[18] = { player: 1, pieces: 5 };

        points[23] = { player: 2, pieces: 2 };
        points[12] = { player: 2, pieces: 5 };
        points[7] = { player: 2, pieces: 3 };
        points[5] = { player: 2, pieces: 5 };

        this.setState({
            gameStatus: gameStatus,
            history: history,
            currentPosition: currentPosition,
            p1IsNext: p1IsNext,
            dice: dice,
            points: points,
            grayBar: grayBar,
            outSideBar: outSideBar,
            movingPiece: movingPiece,
        });

    }

    //Set new history
    setHistory = (p1IsNext, dice, points, grayBar, outSideBar, gameStatus) => {

        const history = {
            p1IsNext: p1IsNext,
            dice: [...dice],
            points: [...points],
            grayBar: { ...grayBar },
            outSideBar: { ...outSideBar },
            gameStatus: gameStatus,
        }

        return history;
    }

    //No moves available handler
    noMoveHandler = () => {

        //Dice with 0
        const dice = [0];
        const p1IsNext = !this.state.p1IsNext;
        const points = this.getPointsWithoutActions(this.state.points);
        const gameStatus = 40;

        const currentPosition = this.state.currentPosition + 1;
        const history = [...this.state.history];
        history.push(
            this.setHistory(
                p1IsNext,
                dice,
                points,
                this.state.grayBar,
                this.state.outSideBar,
            )
        );

        this.setState({
            gameStatus: gameStatus,
            history: history,
            currentPosition: currentPosition,
            p1IsNext: p1IsNext,
            dice: dice,
            points: points,
        })
    }

    //Roll dices
    rollDiceHandler = () => {

        //new dice
        const dice = [];
        //Get two random numbers
        dice.push(Math.floor(Math.random() * 6) + 1);
        dice.push(Math.floor(Math.random() * 6) + 1);
        //duplicate numbers if the same
        if (dice[0] === dice[1]) {
            dice[2] = dice[3] = dice[0];
        }

        //Get moves and status
        const moves = this.calculateCanMove(
            this.getPointsWithoutActions(this.state.points),
            dice,
            this.state.p1IsNext,
            this.state.grayBar
        );

        //get points and status
        const points = moves.points;
        const gameStatus = moves.gameStatus;

        //reset history
        const currentPosition = 0;
        const history = [];
        //Save current state into history
        history.push(this.setHistory(
            this.state.p1IsNext,
            dice,
            points,
            this.state.grayBar,
            this.state.outSideBar,
            gameStatus
        ));

        //Set new state
        this.setState({
            gameStatus: gameStatus,
            history: history,
            currentPosition: currentPosition,
            points: points,
            dice: dice,
        });
    }


    //Calculate possible moves return an object with points and game status
    calculateCanMove = (points, dice, p1IsNext, grayBar) => {

        console.log("[calculateCanMove] calculating possible moves");

        let newPoints = points;
        let gameStatus = 50;


        if (!dice[0]) {
            // No dice to play
            gameStatus = 40;
        }
        else {
            //check if there is piece on gray Bar
            if ((p1IsNext && grayBar.piecesP1) || (!p1IsNext && grayBar.piecesP2)) {

                //No pmoves available
                gameStatus = 50;

                dice.map((die) => {
                    const destination = p1IsNext ? die - 1 : 24 - die;
                    if (points[destination].player === this.getPlayer(p1IsNext) ||
                        points[destination].pieces < 2) {
                        newPoints[destination] = { ...points[destination], canReceive: this.receivePieceHandler.bind(this, die) }
                        gameStatus = 31; //Play from graybar
                    }
                    return null;
                });
            }
            else {

                //Pieces in homeboard. If true it's good to go outside
                let homeBoard = true;

                //status is no Moves available
                gameStatus = 50;
                //get points with actions
                newPoints = points.map((point, index) => {

                    //Check homeboard
                    //Player 1
                    if (index <= 17 
                        && point.player === 1
                        && this.getPlayer(p1IsNext) === point.player
                    ){
                        homeBoard = false;
                    }
                    //Player 2
                    if (index >= 6
                        && point.player === 2
                        && this.getPlayer(p1IsNext) === point.player
                    ){
                        homeBoard = false;
                    }

                    let canMove = false;

                    if (point.player === this.getPlayer(p1IsNext)) {
                        dice.map((die) => {
                            const destination = p1IsNext ? index + die : index - die;
                            if (destination < 24 && destination >= 0) {
                                if (points[destination].player === this.getPlayer(p1IsNext) ||
                                    points[destination].pieces < 2) {
                                    canMove = true;
                                    gameStatus = 30; //Playing
                                }
                            }
                            return null;
                        });
                    }

                    if (canMove) {
                        return { player: point.player, pieces: point.pieces, canMove: this.movePieceHandler.bind(this, index) };
                    }
                    else {
                        return { player: point.player, pieces: point.pieces };
                    }

                });

                if (homeBoard) { //Calculate moves to outside

                }

            }

        }

        return { points: newPoints, gameStatus: gameStatus };

    }

    movePieceHandler = (piece) => {

        let gameStatus = 30; //playing
        const p1IsNext = this.state.p1IsNext;

        //get points without actions
        let points = this.getPointsWithoutActions(this.state.points);


        //set or unset the moving piece
        const movingPiece = piece !== this.state.movingPiece ? piece : false;

        if (movingPiece !== false) {
            //add action to the moving piece. This uncheck the moving piece
            points[piece] = { ...points[piece], canMove: this.movePieceHandler.bind(this, piece) };


            this.state.dice.map((die) => {

                const destination = this.getPlayer(p1IsNext) === 1 ? piece + die : piece - die;
                if (destination < 24 && destination >= 0) {

                    if (points[destination].player === this.getPlayer(p1IsNext) ||
                        points[destination].pieces < 2) {
                        points[destination] = { ...points[destination], canReceive: this.receivePieceHandler.bind(this, die) }
                    }
                }

                return null;
            });

            console.log("moving piece: " + movingPiece);
        }
        else {
            const grayBar = this.state.grayBar;
            const moves = this.calculateCanMove(points, this.state.dice, this.state.p1IsNext, grayBar);
            points = moves.points;
            gameStatus = moves.gameStatus;
        }

        this.setState({
            gameStatus: gameStatus,
            points: points,
            movingPiece: movingPiece,
        })

    }

    receivePieceHandler = (die) => {
        const grayBar = { ...this.state.grayBar };
        const outSideBar = { ...this.state.outSideBar};
        const dice = [...this.state.dice];
        let p1IsNext = this.state.p1IsNext;
        let gameStatus = 30; //playing

        //get points without actions
        let points = this.getPointsWithoutActions(this.state.points);

        //get the moving piece or graybar
        let movingPiece = this.getMovingPiece(p1IsNext);

        //get destination
        const destination = this.getPlayer(p1IsNext) === 1 ? movingPiece + die : movingPiece - die;
        console.log("Moving piece to " + destination);

        //Remove the piece from orign
        if (movingPiece >= 0 && movingPiece <= 23) { //remove from board
            points[movingPiece].pieces--;
        }
        else { //remove from graybar
            if (movingPiece === -1) {//remove p1 from gray bar
                grayBar.piecesP1--;
            }
            else if (movingPiece === 24) { //remove p2 from gray bar
                grayBar.piecesP2--;
            }
        }

        //Clean orign point if it has no pieces
        if ((movingPiece >= 0 && movingPiece <= 23) && points[movingPiece].pieces === 0) {
            points[movingPiece].player = false;
        }

        if (points[destination].player === this.getPlayer(p1IsNext)
            || points[destination].player === false) {

            //Add piece to destination
            points[destination].pieces++;

        }
        else { //Destination has different player.
            
            //Send to gray bar
            if (this.getPlayer(p1IsNext) === 1) {
                grayBar.piecesP2++
            } else {
                grayBar.piecesP1++
            }
        }

        //Assign point to player
        points[destination].player = this.getPlayer(p1IsNext);

        //Moving piece now is false
        movingPiece = false;

        //remove die from dice
        const diceIndex = dice.findIndex((dieNumber) => dieNumber === die);
        dice.splice(diceIndex, 1);
        console.log("Played die" + die);
        
        //Change player if no die
        if (dice.length === 0) {
            dice[0] = 0;
            p1IsNext = !p1IsNext;
        }

        //Get new moves
        const moves = this.calculateCanMove(points, dice, p1IsNext, grayBar);
        points = moves.points;
        gameStatus = moves.gameStatus;

        const currentPosition = this.state.currentPosition + 1;
        const history = [...this.state.history];
        history.push(this.setHistory(p1IsNext, dice, points, grayBar, outSideBar));

        this.setState({
            gameStatus: gameStatus,
            history: history,
            currentPosition: currentPosition,
            p1IsNext: p1IsNext,
            dice: dice,
            points: points,
            grayBar: grayBar,
            outSideBar: outSideBar,
            movingPiece: movingPiece,
        })

    }

    //Return the player number 1 or 2.
    getPlayer = (p1IsNext) => p1IsNext ? 1 : 2;

    //Get pointes without actions. It creates a new object
    getPointsWithoutActions = (points) => points.map((point) => {
        return { player: point.player, pieces: point.pieces };
    });


    getMovingPiece = (p1IsNext) => {
        let movingPiece;
        if (this.state.movingPiece !== false) { //Moving piece is setup
            movingPiece = this.state.movingPiece;
        } else { //Moving piece coming from grayBar
            if (this.getPlayer(p1IsNext) === 1) {
                movingPiece = -1;
            }
            else {
                movingPiece = 24;
            }
        }
        return movingPiece;
    }

    undoHandler = () => {

        const history = [...this.state.history];
        const newPosition = this.state.currentPosition - 1;
        const p1IsNext = history[newPosition].p1IsNext;
        const dice = [...history[newPosition].dice];
        const grayBar = { ...history[newPosition].grayBar };
        const outSideBar = { ...history[newPosition].outSideBar };
        const movingPiece = false;

        console.log(p1IsNext);

        const moves = this.calculateCanMove(this.state.history[newPosition].points, dice, p1IsNext, grayBar);
        const points = moves.points;
        const gameStatus = moves.gameStatus;
        //remove last element from history
        history.pop();

        this.setState({
            gameStatus: gameStatus,
            history: history,
            currentPosition: newPosition,
            p1IsNext: p1IsNext,
            dice: dice,
            points: points,
            grayBar: grayBar,
            outSideBar: outSideBar,
            movingPiece: movingPiece
        });

    }

    getGameStatus = () => {
        switch (this.state.gameStatus) {
            case 10: return "Not started";
            case 20: return "Roll dice";
            case 30: return "Playing";
            case 31: return "Playing from graybar";
            case 40: return "No die to play";
            case 50: return "No moves available";
            case 60: return "Player 1 wins";
            case 70: return "Player 2 wins";
            case 80: return "Ended";
            default: return this.state.gameStatus;
        }
    }

    render() {

        console.log("Game status is " + this.getGameStatus());

        return (
            <div className="App">
                <div>
                    <div id="status" className="row">
                        <div id="gameStatus" className="col-xs-4 bg-primary">
                            <p>status</p>
                            <button onClick={this.setupNewGameHandler.bind(this, 1)}>New Game</button>
                        </div>
                        <div id="gameCount" className="col-xs-8 bg-warning">
                            <div className="col-xs-6 bg-danger">

                                <div className="col-xs-4">
                                    <p>Player 1</p>
                                </div>
                                <div className="col-xs-5 bg-primary">
                                    <Piece player="1" count="1" />
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
                                    <Piece player="2" count="1" />
                                </div>
                                <div className="col-xs-2">
                                    <p>141</p>
                                </div>

                            </div>
                        </div>

                    </div>
                    <div id="wrapper">
                        <div id="game">

                            <Board
                                rollDice={this.rollDiceHandler}
                                dice={this.state.dice}
                                noMove={this.noMoveHandler}
                                points={this.state.points}
                                p1IsNext={this.state.p1IsNext}
                                gameStatus={this.state.gameStatus}

                            >

                                <Graybar
                                    pieces={this.state.grayBar}
                                />
                                <OutSideBar
                                    pieces={this.state.outSideBar}
                                    currentPosition={this.state.currentPosition}
                                    undoHandler={this.undoHandler}
                                />
                            </Board>

                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default App;
