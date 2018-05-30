import React, { Component } from 'react';
import './Menu.css';


class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            header: this.getMenuHeader(),
            body: this.getMenuBody(),
            footer: this.getMenuFooter(),
            menuWidth: { width: '50%' },
            canClose: this.props.gameStatus === 80 ? false : true,
            showAbout: false,
        }
    }


    getMenuHeader = () => {
        let header = 'Menu';
        if (this.props.gameStatus === 60 || this.props.gameStatus === 70) {
            header = <br />;
        }

        return <p>{header}</p>;
    }

    getMenuBody = () => {

        let body = '';
        if (this.props.gameStatus === 60) {
            body = <React.Fragment>
                <img src="./assets/congratulation.png" alt="congratulation" />
                <p className="modal-body-centralized">{this.props.players.p1} wins!</p>
            </React.Fragment>
        }
        if (this.props.gameStatus === 70) {
            body = <React.Fragment>
                <img src="./assets/congratulation.png" alt="congratulation" />
                <p className="modal-body-centralized">{this.props.players.p2} wins!</p>
            </React.Fragment>
        }
        return body;
    }

    getMenuFooter = () => {

        let footer = <div>
            <button id="modal-about" className="btn btn-info"
                onClick={this.toggleAboutHandler}>
                About
            </button>

            <button
                className="btn btn-success"
                onClick={this.props.newGameHandler.bind(this, 1)}>New Game
            </button>
        </div>;

        return footer;

    }

    toggleAboutHandler = () => {
        const showAbout = !this.state.showAbout;
        const header = showAbout ? 'About' : this.getMenuHeader();
        const body = showAbout ?
            <div>
                <p className="modal-body-t1">Backgammon by Bruno Nunes</p>
                <p className="modal-body-t2">This game has been developed by Bruno Nunes,
                    a Web Developer and System Administrator in Vancouver, BC. He is a
                    graduate of <a href="https://bcit.ca">BCIT</a>'s Applied Web Development
                    and Applied Software Development programs.<br /><br />
                    You can learn more about the author at <a href="https://brunonunes.ca">brunonunes.ca</a>.<br />
                    You can also access this project at <a href="https://github.com/bnunesc/react-backgammon">GitHub</a>.
                </p>


            </div>
            : this.getMenuBody();
        const footer = showAbout ?
            <button className="btn btn-danger" onClick={this.toggleAboutHandler}>Close</button>
            : this.getMenuFooter();

        const width = showAbout ? '85%' : '50%';

        this.setState({
            header: header,
            body: body,
            footer: footer,
            menuWidth: { width: width },
            showAbout: showAbout,
        })

    }


    render() {

        return (
            <div id="modal" >

                <div id="modal-content" style={this.state.menuWidth}>
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
}

export default Menu;