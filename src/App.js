
import './App.css';
import Overview from './components/Overview'
import React from 'react'

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      input: '',
      editText: '',
      tasks: [
        {
          id: 1,
          description: 'clean room',
          completed: false,
          editMode: false
        },
        {
          id: 2,
          description: 'cook dinner',
          completed: false,
          editMode: false
        }
      ]
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.saveInput = this.saveInput.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleRemove = this.handleRemove.bind(this)
    this.handleEditClick = this.handleEditClick.bind(this)
  }

  saveInput(e, testId) {

    if (e.target.className === 'editTextField') {
      this.setState({ editText: e.target.value })

    }
    else {
      this.setState(() => {
        if (e.target)
          return { input: e.target.value }
      })
    }
  }



  handleChange(testId) {
    const updatedArr = this.state.tasks.map(task => {
      if (task.id === testId) {
        task.completed = !task.completed
      }
      return task
    })
    this.setState({ tasks: updatedArr })

  }

  handleRemove(testId) {
    this.setState(prevState => {
      const updatedTodos = prevState.tasks.filter(task => task.id !== testId)
      return { tasks: updatedTodos }
    })
  }


  handleSubmit(e) {
    e.preventDefault()
    const { input } = this.state
    this.setState(prevState => {
      const newTask = {
        id: prevState.tasks.length + 1,
        description: input,
        completed: false,
        editMode: false
      }
      return {
        tasks: [...prevState.tasks, newTask],
        input: ''
      }
    })
  }

  handleEditClick(e, testID) {
    let updatedArray = this.state.tasks.map(task => {
      if (task.id === testID) {
        if (task.editMode) {
          task.description = this.state.editText
        }
        task.editMode = !task.editMode
      }
      return task
    })
    this.setState({ tasks: updatedArray })
  }

  //if editMode is true and the Ids match => set state of task to editText state

  render() {

    return (
      <div className="App">
        <h1>Tasks</h1>
        <form onSubmit={this.handleSubmit}>
          <input type="text" placeholder="enter new task..." name="taskItem" value={this.state.input} onChange={this.saveInput}></input>
          <button>Add Task</button>
        </form>
        <Overview tasks={this.state.tasks} onChange={this.saveInput} handleChange={this.handleChange} handleRemove={this.handleRemove} handleEditClick={this.handleEditClick} />

      </div>
    );
  }
}

export default App;
