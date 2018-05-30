import React, { Component } from 'react';
import './Graybar.css';

import getCheckers from '../getCheckers/getCheckers';

class GrayBar extends Component {

    shouldComponentUpdate(nextProps, nextState) {

        let propsChanged = false;

        if (nextProps.checkers.checkersP1 !== this.props.checkers.checkersP1
            || nextProps.checkers.checkersP2 !== this.props.checkers.checkersP2) {
            propsChanged = true;
        }

        return propsChanged;
    }

    render() {

        const checkersP1 = getCheckers(1, this.props.checkers.checkersP1, "Graybar", false);
        const checkersP2 = getCheckers(2, this.props.checkers.checkersP2, "Graybar", false);

        return (
            <div id="grayBar" className="row">
                <div className="blocksUp">
                    <div className="pointContainer pointContainerDown">
                        {checkersP1}
                    </div>

                </div>
                <div className="blocksDown">
                    <div className="pointContainer">
                        {checkersP2}
                    </div>

                </div>
            </div>
        )
    }
}

export default GrayBar;