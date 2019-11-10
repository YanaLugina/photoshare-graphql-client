import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AuthorizedUser extends Component {
    state = { singingIn: false };

    componentDidMount() {
        if (window.location.search.match(/code=/)) {
            this.setState({ singingIn: true });
            const code = window.location.search.replace("?code=", "");
            alert(code);
            this.props.history.replace('/');
        }
    }

    requestCode() {
        let clientID = 'YanaLugina';
        window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
    }

    render() {
        return (
            <button onClick={ this.requestCode }
                    disabled={this.state.singingIn}>
                Sing In with GitHub
            </button>
        );
    }
}

export default withRouter(AuthorizedUser);