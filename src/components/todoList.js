import React, { createRef } from 'react';
import 'semantic-ui-css/semantic.min.css';
import { Button } from "semantic-ui-react";
import './todoList.css';

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { todos: [], edit: false };
    this.inputRef = createRef();
    this.editRef = createRef();
    window.display = this;
  }

  addRecords = () => {
    const { value } = this.inputRef.current;
    if (value) {
      const todoObj = {
        id: this.state.todos.length,
        description: value,
        completed: false,
        removed: false,
        edit: false
      }
      this.setState({ todos: [...this.state.todos, todoObj] });
      this.inputRef.current.value = '';
    }
  }

  checkBoxChange(evt, id) {
    const bool = evt.currentTarget.checked;
    this.setState(state => {
      const todos = state.todos.map((list, index) => {
        if (index === id) {
          list.completed = bool;
        }
        return list;
      });
      return {
        todos,
      }
    });
  }

  saveTodo(id) {
    this.setState(state => {
      const todos = state.todos.map((list, index) => {
        if (id === index) {
          list.description = this.editRef.current.value;
          list.edit = false;
        }
        return list;
      });
      state.edit = false;
      return {
        todos
      };
    });
  }

  editTodoData(desc, id) {
    return <div className='modal'>
      <section className='modal-main'>
        <input type="text" defaultValue={desc} ref={this.editRef} />
        <button className='circular ui icon button' onClick={() => this.saveTodo(id)}>
          <i className='save icon'></i>
        </button>
      </section>
    </div>
  }

  editTodos(evt, id) {
    evt.preventDefault();
    this.setState(state => {
      const todos = state.todos.map((list, index) => {
        if (index === id) {
          list.edit = true;
        }
        return list;
      });
      state.edit = true;
      return {
        todos,
      }
    });
  }

  removeTodos(e, id) {
    this.setState(state => {
      const todos = state.todos.filter((list, index) => id !== index);
      return {
        todos,
      }
    });
  }

  render() {
    return (
      <div>
        <div>
          <input className='description' type='text' ref={this.inputRef}></input>
        </div>
        <div id='buttonList'>
          <button className='circular ui icon button' onClick={this.addRecords}><i className='add icon'></i></button>
        </div>
        <div>
          {
            this.state.todos.map((todo, id) => {
              return (<div className='listData' key={id}>
                <label className='listItem'>
                  <input
                    className='checkMark'
                    type='checkbox'
                    onChange={(e) => this.checkBoxChange(e, id)}
                    disabled={todo.completed || this.state.edit}
                  />
                  {todo.description}
                </label>
                {todo.edit && this.editTodoData(todo.description, id)}
                <Button
                  className='circular ui icon button'
                  onClick={(e) => this.removeTodos(e, id)}
                  disabled={todo.completed || this.state.edit}
                ><i className='trash icon'></i></Button>
                <Button className='circular ui icon button' onClick={(e) => this.editTodos(e, id)} disabled={todo.completed || this.state.edit}><i className='edit icon'></i></Button>
              </div>);
            })
          }
        </div>
      </div>
    );
  }
}

export default TodoList;
