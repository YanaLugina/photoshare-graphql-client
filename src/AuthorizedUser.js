import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { ROOT_QUERY } from './App';
import { Mutation } from 'react-apollo';


const GITHUB_AUTH_MUTATION = gql`    
    mutation githubAuth($code: String!) {
        githubAuth(code:$code) { token }
    }
`;



class AuthorizedUser extends Component {
    state = { singingIn: false };

    authorizationComplete = (cache, { data }) => {
        localStorage.setItem('token', data.githubAuth.token);
        this.props.history.replace('/');
        this.setState({ sighingIn: false });
    };

    componentDidMount() {
        if (window.location.search.match(/code=/)) {
            this.setState({ singingIn: true });
            const code = window.location.search.replace("?code=", "");
            console.log(code);
            this.props.history.replace('/');
        }
    }

    requestCode() {
        const clientID = '4675be515137bf0e30c7';
        window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
    }

    render() {
        return (
            <Mutation
                mutation={GITHUB_AUTH_MUTATION}
                update={this.authorizationComplete}
                refetchQueries={[{ query: ROOT_QUERY }]}>
                {
                    mutation => {
                        this.githubAuthMutation = mutation;
                        return (
                            <button onClick={ this.requestCode }
                                    disabled={ this.state.singingIn }>
                                Sing In with GitHub
                            </button>
                        );
                    }
                }

            </Mutation>

        );
    }
}

export default withRouter(AuthorizedUser);