import React from 'react';

import "./Stream.scss";

class Stream extends React.Component {
  constructor() {
    super();
    this.state = {
      tweets: [],
      title: '',
      error: {
        message: ''
      }
    };
  }

  websocket = new WebSocket('ws://localhost:3333/api/topic');

  componentDidMount() {
    this.setState({
      title: 'Twitter Stream',
    });

    this.websocket.onopen = () => {
      console.log('WebSocket Client Connected');
    }
    this.websocket.onmessage = (data) => {
      console.log('Getting message from server');
      const tweet = data.data
      console.log(tweet);
      this.setState({
        tweets: [ tweet, ...this.state.tweets]
      });
    }    
  }

  componentWillUnmount() {
  }

  render() {
    const { title, tweets } = this.state;
    return (
      <div className="Stream">
        <section>
          <div className="stream-head-section">
            <h1>{ title }</h1>
          </div>
        </section>
        <section>
          <div className="stream-column-section">
            { 
              tweets.map(tweet =>
                <p>{ tweet.text }</p>
              )
            }
          </div>
        </section>
      </div>
    );
  }
}

export default Stream;
