import React from 'react';

import "./Main.scss";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      error: {
        message: ''
      }
    };
    
    this.postMessage = this.postMessage.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

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
    this.setState({
      title: 'Welcome to Twitter stream',
    });
  }

  componentWillUnmount() {
  }

  render() {
    const { title } = this.state;
    return (
      <div className="Main">
        <section>
          <div className="main-head-section">
            <h1>{ title }</h1>
          </div>
        </section>
        <section>
          
        </section>
      </div>
    );
  }
}

export default Main;
