import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
      input: ''
    };

    this.postMessage = this.postMessage.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  websocket = new WebSocket('ws://localhost:3333');

  postMessage (event) {
    event.preventDefault();
    console.log(this.state.input)
    this.websocket.send(JSON.stringify({
      content: this.state.input
    }));
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    console.log('mounting component');
    this.websocket.onopen = () => {
      console.log('WebSocket Client Connected');
    }
    this.websocket.onmessage = (data) => {
      const message = JSON.parse(data.data);
      console.log('Getting message from server');
      console.log(message);
      this.setState({
        message: message.content
      });
    }
  }

  render() {
    const { message, input } = this.state;
    return (
      <div className="App">
        <p>Message:</p>
        <form onSubmit={this.postMessage}>
          <input name="input" type="text" value={input} onChange={this.handleFormChange}/>
          <button>Send</button>
        </form>
        <p>{ message }</p>
      </div>
    );
  }
}

export default App;
