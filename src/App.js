import React from 'react';
import Users from './Users';
import { gql } from 'apollo-boost';
import './App.css';

export const ROOT_QUERY = gql `
    query allUsers {
      totalUsers
      allUsers {
        githubLogin
        name
        avatar
      }
    }
`;

const App = () => {
  return (<Users />);
};

export default App;
