import React from 'react';
import './Modal.css';


const Modal = (props) => {

    let disabled = 'modal-disabled';
    let message = null;

    if (props.gameStatus === 60) {
        message = "Player 1 wins";
    }
    if (props.gameStatus === 70) {
        message = "Player 2 wins";
    }

    if (message) {
        disabled = '';
    }

    return (
        <div id="modal" class={disabled}>
            <div id="modal-Box">

                <div id="modal-content">
                    <div id="modal-header">
                        <p>Game Over</p>
                    </div>
                    <div id="modal-body">
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