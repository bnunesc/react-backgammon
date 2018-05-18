import React, { PureComponent } from 'react';
import './OutSideBar.css';

import PieceFlat from './PieceFlat/PieceFlat';

class OutSideBar extends PureComponent {

    getFlatPieces = (player, numberOfPieces) => {

        const pieces = [];

        for (let i = 0; i < numberOfPieces; i++) {
            pieces.push(<PieceFlat player={player} key={'OSBP' + player + 'P' + i} />);
        }

        return pieces
    }

    componentDidUpdate() {
        console.log("[OUTSIDEBAR UPDATE] - Inside Did Update");
    }

    render() {
        const piecesP1 = this.getFlatPieces("1", this.props.pieces.piecesP1);
        const piecesP2 = this.getFlatPieces("2", this.props.pieces.piecesP2);

        let undoButtonclass = 'disabled';
        let undoButtonFunction;
        if (this.props.currentPosition) {
            console.log("hascurrent Position");
            undoButtonclass = '';
            undoButtonFunction = this.props.undoHandler;
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
                    <div className="pieceContainer">
                        {piecesP1}
                    </div>
                </div>

                <div className="blocksDown">
                    <div className="shadowBox"></div>
                    <div className="pieceContainer pieceContainerDown">
                        {piecesP2}
                    </div>
                </div>
            </div>
        )
    }
}


export default OutSideBar;