import React, { Component } from 'react';
import './Menu.css';


class Menu extends Component {

    constructor(props) {
        super(props);

        const content = this.getContent(this.props.gameStatus, this.props.players);

        this.state = {
            header: content.header,
            body: content.body,
            footer: content.footer,
            menuWidth: content.width,
            canClose: content.canClose,
            playerNames: { p1: this.props.players.p1, p2: this.props.players.p2 }
        }
    }


    getContent(gameStatus, players) {

        let content = null;

        //Functions return an object;
        switch (gameStatus) {
            case 11:
                content = this.getNewGame(gameStatus, players);
                break;
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

    getMenu = (gameStatus, players) => {

        const content = {};

        content.header = <p>Menu</p>;

        content.body = <div>Something here</div>

        content.footer = this.getRegularFooter();

        content.width = 'menu-small';
        content.canClose = gameStatus !== 80 ? true : false;

        return content;
    }

    getWinner(gameStatus, players) {
        const content = {};

        content.header = <p><br /></p>;

        content.body = <React.Fragment>
            <img src="./assets/congratulation.png" alt="congratulation" />
            <p className="modal-body-centralized">{gameStatus === 60 ? players.p1 : players.p2} wins!</p><br />
        </React.Fragment>

        content.footer = this.getRegularFooter();

        content.width = 'menu-small';
        content.canClose = gameStatus !== 80 ? true : false;

        return content;
    }

    getRegularFooter = () => {

        const alertNewGame = this.props.gameStatus < 60 ? 12 : 11; //12 shows alert

        return <div>
            <button id="modal-about" className="btn btn-info"
                onClick={this.toggleAboutHandler.bind(this, true)}>
                About
        </button>

            <button
                className="btn btn-success"
                onClick={this.newGameHandler.bind(this, alertNewGame)}>New Game
        </button>
        </div>;
    }

    getNewGame = (gameStatus, players) => {
        const content = {};

        content.header = <p>New Game</p>;

        content.body = <React.Fragment>
            <label className="modal-body-t2">Player One: </label>
            <input type="text"
                className="modal-body-t2"
                value={players.p1}
                onChange={this.changePlayerName.bind(this, 1)}
            />
            <br />
            <label className="modal-body-t2" >Player Two: </label>
            <input type="text"
                className="modal-body-t2"
                value={players.p2}
                onChange={this.changePlayerName.bind(this, 2)}
            />
        </React.Fragment>

        content.footer = <div>
            <button id="modal-about" className="btn btn-info"
                onClick={this.toggleAboutHandler.bind(this, true)}>
                About
            </button>

            <button
                className="btn btn-success"
                onClick={this.props.newGameHandler.bind(this, players, 1)}>New Game
            </button>
        </div>;

        content.width = 'menu-medium';
        content.canClose = gameStatus !== 80 ? true : false;

        return content;
    }

    changePlayerName = (player, event) => {

        const playerNames = { ...this.state.playerNames };

        if (player === 1) {
            playerNames.p1 = event.target.value;
        } else {
            playerNames.p2 = event.target.value;
        }

        const content = this.getContent(11, playerNames);

        this.setState({
            body: content.body,
            playerNames: playerNames,
        });
    }

    newGameHandler = (newGameStatus) => {

        const content = this.getContent(11, this.state.playerNames);
        console.log('Starting a new game');

        if (newGameStatus === 12) {

            content.body =
                <React.Fragment>
                    <p>Are you sure you want to end the current game?</p>
                </React.Fragment>

            content.footer = <div>
                <button id="modal-about" className="btn btn-info"
                    onClick={this.toggleAboutHandler.bind(this, true)}>
                    About
                    </button>

                <button
                    className="btn btn-danger"
                    onClick={this.newGameHandler.bind(this,11)}>New Game
                    </button>
            </div>;


        }

        this.setState({
            header: content.header,
            body: content.body,
            footer: content.footer,
            menuWidth: content.width,
            canClose: content.canClose,
        });

    }

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
    graduate of <a href="https://bcit.ca">BCIT</a>'s Applied Web Development
    and Applied Software Development programs.<br /><br />
            You can learn more about the author at <a href="https://brunonunes.ca">brunonunes.ca</a>.<br />
            You can also access this project at <a href="https://github.com/bnunesc/react-backgammon">GitHub</a>.
    </p>
    </div>
    //End About Body
}

export default Menu;