import React from 'react';
import './Modal.css';


const Modal = (props) => {

    let disabled = 'modal-disabled';
    let message = null;

    if (props.gameStatus === 60) {
        message = props.players.p1 + " wins!";
    }
    if (props.gameStatus === 70) {
        message = props.players.p2 + " wins!";
    }

    if (message) {
        disabled = '';
    }

    return (
        <div id="modal" className={disabled}>
            <div id="modal-Box">

                <div id="modal-content">
                    <div id="modal-header">
                        
                    </div>
                    <div id="modal-body">
                        <img src="./assets/congratulation.png" alt="congratulation" />
                        <p>{message}</p>
                    </div>
                    <div id="modal-footer">
                        <button
                            className="btn btn-success"
                            onClick={props.newGameHandler.bind(this, 1)}>New Game
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default Modal;