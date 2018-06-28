import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './services/apollo';
import TodoList from './components/TodoList';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <ApolloProvider client={apolloClient}>
          <TodoList />
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
