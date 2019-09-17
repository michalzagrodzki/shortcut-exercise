import React from 'react';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
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
      console.log('Getting message from server');
      const tweet = data.data
      console.log(tweet);
      this.setState({
        messages: [ tweet, ...this.state.messages]
      });
    }
  }

  render() {
    const { messages, input } = this.state;
    return (
      <div className="App">
        <p>Message:</p>
        <form onSubmit={this.postMessage}>
          <input name="input" type="text" value={input} onChange={this.handleFormChange}/>
          <button>Send</button>
        </form>
        <ul>
        { 
          messages.map(message => 
            <li>{ message }</li>
          )
        }
        </ul>
      </div>
    );
  }
}

export default App;
