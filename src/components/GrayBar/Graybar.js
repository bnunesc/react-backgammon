import React, { PureComponent } from 'react';
import './Graybar.css';

import getPieces from '../getPieces/getPieces';

class GrayBar extends PureComponent {

    componentDidUpdate () {
        console.log("[GRAYBAR UPDATE] - Inside Did Update");
    }

    render() {

       const piecesP1 = getPieces(1, this.props.checkers.checkersP1,"Graybar", false);
       const piecesP2 = getPieces(2, this.props.checkers.checkersP2, "Graybar", false);
       

        return (
            <div id="grayBar" className="row">
                <div className="blocksUp">
                    <div className="pieceContainer pieceContainerDown">
                        {piecesP2}
                    </div>

                </div>
                <div className="blocksDown">
                    <div className="pieceContainer">
                        {piecesP1}
                    </div>

                </div>
            </div>
        )
    }
}

export default GrayBar;