import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import {gql} from 'apollo-boost';
import {ROOT_QUERY} from './App';
import {Mutation, Query, withApollo} from 'react-apollo';
import compose from './compose';

const GITHUB_AUTH_MUTATION = gql`    
    mutation githubAuth($code: String!) {
        githubAuth(code:$code) { token }
    }
`;




const Me = ({ logout, requestCode, singingIn }) => {
    return (
        <Query query={ROOT_QUERY} >
            {
                ({ data, loading }) =>
                {
                    if(data) {
                        return (<CurrentUser avatar={data.me.avatar} name={data.me.name} logout={logout}/>);
                    }
                    return ( loading ? <p>loading...</p> :
                        <button onClick={requestCode} disabled={singingIn}>
                                Singing In with gitHub {JSON.stringify(data.me)}
                        </button>);

                 }
            }
        </Query>
    );
};

const CurrentUser = ({ avatar, name, logout }) => {
    return (
        <div>
            <img src={avatar} width={48} height={48} alt=""/>
            <h1>{ name }</h1>
            <button onClick={logout}>logout</button>
        </div>
    );
};

class AuthorizedUser extends Component {
    state = { singingIn: false };

    authorizationComplete = (cache, { data }) => {
        localStorage.setItem('token', data.githubAuth.token);
        this.props.history.replace('/');
        //this.setState({ singingIn: false });
    };

    componentDidMount() {
        if (window.location.search.match(/code=/)) {
            this.setState({ singingIn: true });
            const code = window.location.search.replace("?code=", "");
            this.props.history.replace('/');
            this.githubAuthMutation({ variables: {code} });
        }
    }

    requestCode() {
        const clientID = '4675be515137bf0e30c7';
        window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scope=user`;
    }

    logout = () => {
        localStorage.removeItem('token');
        let data = this.props.client.readQuery({ query: ROOT_QUERY });
        data.me = null;
        this.props.client.writeQuery({ query: ROOT_QUERY, data })
    };

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
                            <Me singingIn={this.state.singingIn}
                                requestCode={this.requestCode}
                                logout={this.logout} />
                        );
                    }
                }
            </Mutation>
        );
    }
}

export default compose(withApollo,withRouter)(AuthorizedUser);