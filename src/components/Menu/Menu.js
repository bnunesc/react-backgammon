import React, { Component } from 'react';
import './Menu.css';


class Menu extends Component {

    constructor(props) {
        super(props);

        const content = this.getContent(this.props.gameStatus, this.props.players);

        //Set initial state
        this.state = {
            header: content.header,
            body: content.body,
            footer: content.footer,
            menuWidth: content.width,
            canClose: content.canClose,
            playerNames: { p1: this.props.players.p1, p2: this.props.players.p2 },
            playerStarts: 1,
        }
    }


    //Get the content for the initial state
    getContent(gameStatus, players) {

        let content = null;

        //Functions return an object;
        switch (gameStatus) {
            //60 or 70 player won
            case 60:
                content = this.getWinner(gameStatus, players);
                break;
            case 70:
                content = this.getWinner(gameStatus, players);
                break;
            default:
                content = this.getMenu(gameStatus, players);
                break;
        }
        return content;
    }

    //Get regular menu
    getMenu = (gameStatus, players) => {

        const content = {};

        content.header = <p>Menu</p>;

        content.body = <div className="modal-body-centralized">Backgammon by Bruno Nunes</div>

        content.footer = this.getRegularFooter();

        content.width = 'menu-small';
        content.canClose = gameStatus !== 80 ? true : false;

        return content;
    }

    //Get winning message
    getWinner(gameStatus, players) {
        const content = {};

        content.header = <p><br /></p>;

        content.body = <React.Fragment>
            <img src="./assets/congratulation.png" alt="congratulation" />
            <p className="modal-body-centralized">{gameStatus === 60 ? players.p1 : players.p2} wins!</p>
        </React.Fragment>

        content.footer = this.getRegularFooter();

        content.width = 'menu-small';
        content.canClose = true;

        return content;
    }

    //Get regular footer
    getRegularFooter = () => {

        const alertNewGame = this.props.gameStatus < 60 ? 12 : 11; //12 shows alert

        return <React.Fragment>
            {this.aboutButton}

            <button
                className="btn btn-success"
                onClick={this.newGameHandler.bind(this, alertNewGame)}>New Game
        </button>
        </React.Fragment>;
    }

    //Get a new game
    getNewGame = (gameStatus, players, playerStarts) => {
        const content = {};

        const p1Starts = playerStarts === 1 ? 'btn-info' : 'btn-default';
        const p2Starts = playerStarts === 2 ? 'btn-info' : 'btn-default';


        content.header = <p>New Game</p>;

        content.body = <React.Fragment>

            <label className="modal-body-t2">Player One: </label>

            <div className="input-group">
                <input type="text"
                    className="form-control modal-body-t2"
                    value={players.p1}
                    onChange={this.changePlayerName.bind(this, 1)}
                />
                <div className="input-group-btn">
                    <button className={'btn ' + p1Starts}
                        onClick={this.changePlayerStart.bind(this, 1)}
                    >starts</button>
                </div>
            </div>
            <label className="modal-body-t2">Player Two: </label>

            <div className="input-group">
                <input type="text"
                    className="form-control modal-body-t2"
                    value={players.p2}
                    onChange={this.changePlayerName.bind(this, 2)}
                />
                <div className="input-group-btn">
                    <button className={'btn ' + p2Starts}
                        onClick={this.changePlayerStart.bind(this, 2)}
                    >starts</button>
                </div>
            </div>
        </React.Fragment>

        content.footer = <React.Fragment>
            {this.aboutButton}

            <button
                className="btn btn-success"
                onClick={this.props.newGameHandler.bind(this, players, playerStarts)}>New Game
            </button>
        </React.Fragment>;

        content.width = 'menu-small';
        content.canClose = gameStatus !== 80 ? true : false;

        return content;
    }

    //Change the player who starts the game
    changePlayerStart = (playerStarts) => {

        const content = this.getNewGame(11, this.state.playerNames, playerStarts);

        this.setState({
            body: content.body,
            footer: content.footer,
            playerStarts: playerStarts,
        });

    }

    //Change the player name
    changePlayerName = (player, event) => {

        const playerNames = { ...this.state.playerNames };

        if (event.target.value.length <= 12) {
            if (player === 1) {
                playerNames.p1 = event.target.value;
            } else {
                playerNames.p2 = event.target.value;
            }
        }

        const content = this.getNewGame(11, playerNames, this.state.playerStarts);

        this.setState({
            body: content.body,
            footer: content.footer,
            playerNames: playerNames,
        });
    }

    //Start a new game
    newGameHandler = (newGameStatus) => {

        const content = this.getNewGame(11, this.state.playerNames, this.state.playerStarts);
        console.log('Starting a new game');

        if (newGameStatus === 12) {

            content.body =
                <React.Fragment>
                    <p className="modal-body-t1 modal-body-centralized">Are you sure you want to end the current game?</p>
                </React.Fragment>

            content.footer = <React.Fragment>
                {this.aboutButton}
                <button
                    className="btn btn-danger"
                    onClick={this.newGameHandler.bind(this, 11)}>New Game
                    </button>
            </React.Fragment>;
        }

        this.setState({
            header: content.header,
            body: content.body,
            footer: content.footer,
            menuWidth: content.width,
            canClose: content.canClose,
        });

    }

    //Show/Hide the about menu
    toggleAboutHandler = (show) => {

        let content = {};

        if (show) { //show About
            content.header = <p>About</p>;
            content.body = <React.Fragment>
                {this.aboutBody}
            </React.Fragment>

            content.footer = <button className="btn btn-danger" onClick={this.toggleAboutHandler.bind(this, false)}>Close</button>

            content.width = 'menu-big';
            content.canClose = false;
        }
        else { //Close About
            content = this.getContent(this.props.gameStatus, this.props.players);
        }

        this.setState({
            header: content.header,
            body: content.body,
            footer: content.footer,
            menuWidth: content.width,
            canClose: content.canClose,
        });
    }

    render() {

        return (
            <div id="modal" >

                <div id="modal-content" className={this.state.menuWidth}>
                    <div id="modal-header">
                        {this.state.canClose ? <div id="modal-close" onClick={this.props.toggleMenuHandler}>X</div> : null}
                        {this.state.header}
                    </div>
                    <div id="modal-body">
                        {this.state.body}
                    </div>
                    <div id="modal-footer">
                        {this.state.footer}
                    </div>
                </div>

            </div>
        );
    }

    //Contents
    //About Body
    aboutBody = <div>
        <p className="modal-body-t1">Backgammon by Bruno Nunes</p>
        <p className="modal-body-t2">This game has been developed by Bruno Nunes,
            a Web Developer and System Administrator in Vancouver, BC. He is a
            graduate of the Applied Web Development and Applied Software Development programs at <a href="https://bcit.ca">BCIT</a>.<br /><br />
            You can learn more about the author at <a href="https://brunonunes.ca">brunonunes.ca</a>.<br />
            You can also access this project at <a href="https://github.com/bnunesc/react-backgammon">GitHub</a>.
    </p>
    </div>
    //End About Body

    //About button
    aboutButton = <button id="modal-about" className="btn btn-info"
        onClick={this.toggleAboutHandler.bind(this, true)}>
        About
    </button>
    //End about button

}

export default Menu;