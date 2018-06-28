import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';

class TodoList extends Component {
  state = {
    newTodoText: '',
  }

  addTodo = () => {
    const { newTodoText } = this.state;

    this.props.addTodo({
      variables: { text: newTodoText },
      update: (proxy, { data: { createTodo } }) => {
        this.props.todos.refetch();
      },
    })
  };

  renderTodoList = () => (
    <ul>
      { this.props.todos.allTodoes.map(todo =>
        <li key={todo.id}>{todo.text}</li>
      )}
    </ul>
  )

  render() {
    const { todos } = this.props;
    return (
      <div className="todo">
        <h1>TO DO LIST</h1>
        { todos.loading
            ? '' 
            : this.renderTodoList() 
        }
        <input
          type="text"
          value={this.state.newTodoText}
          onChange={e => this.setState({ newTodoText: e.target.value })}
        />
        <input className="submit" type="submit" value="New" onClick={this.addTodo} />
      </div>
    );
  }
}

const TodosQuery = gql`
  query {
    allTodoes {
      id
      text
    }
  }
`;

const TodoMutation = gql`
  mutation ($text: String!) {
    createTodo ( text: $text ) {
      id
      text
    }
  }
`;

export default compose(
  graphql(TodosQuery, { name: 'todos' }),
  graphql(TodoMutation, { name: 'addTodo' }),
)(TodoList);