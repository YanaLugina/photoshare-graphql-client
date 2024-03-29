import React from 'react';
import {render} from 'react-dom';
import App from './App';
import {ApolloProvider} from 'react-apollo';
import ApolloClient, {InMemoryCache} from 'apollo-boost';
import {persistCache} from "apollo-cache-persist";

const cache = new InMemoryCache();
persistCache({
    cache,
    storage: localStorage
});

if(localStorage['apollo-cache-persist']) {
    let cacheData = JSON.parse(localStorage['apollo-cache-persist']);
        cache.restore(cacheData)
}

const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache,
    request: operation => {
        operation.setContext(context => ({
            headers: {
                ...context.headers,
                authorization: localStorage.getItem('token')
            }
        }))
    }
});

//console.log(localStorage['apollo-cache-persist']);
render (
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
);
