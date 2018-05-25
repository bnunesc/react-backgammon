import React, { Component } from 'react';
import './Graybar.css';

import getPieces from '../getPieces/getPieces';

class GrayBar extends Component {

    componentDidUpdate() {
        console.log("Garybar updated");
    }

    shouldComponentUpdate(nextProps, nextState) {

        let propsChanged = false;

        if (nextProps.checkers.checkersP1 !== this.props.checkers.checkersP1
            || nextProps.checkers.checkersP2 !== this.props.checkers.checkersP2) {
            propsChanged = true;
        }

        return propsChanged;
    }

    render() {

        const checkersP1 = getPieces(1, this.props.checkers.checkersP1, "Graybar", false);
        const checkersP2 = getPieces(2, this.props.checkers.checkersP2, "Graybar", false);

        return (
            <div id="grayBar" className="row">
                <div className="blocksUp">
                    <div className="pieceContainer pieceContainerDown">
                        {checkersP1}
                    </div>

                </div>
                <div className="blocksDown">
                    <div className="pieceContainer">
                        {checkersP2}
                    </div>

                </div>
            </div>
        )
    }
}

export default GrayBar;