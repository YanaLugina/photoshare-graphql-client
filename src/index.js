import React from 'react';
import { render } from 'react-dom';
import App from './App';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { gql } from 'apollo-boost';


const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql'
});

const query = gql`
    {
        totalUsers
        totalPhotos
    }
`;

client.query({ query })
    .then(({ data }) => console.log('data', data))
    .catch(console.error);

render (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
