import React from 'react';

import "./Topic.scss";

class Topic extends React.Component {
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
      title: 'Twitter Topic Stream',
    });

    console.log(this.props.match.params.name) // topic :name prop

    this.websocket.onopen = () => {
      console.log('WebSocket Client Connected');
    }
    this.websocket.onmessage = (data) => {
      const tweet = JSON.parse(data.data)
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
      <div className="Topic">
        <section>
          <div className="topic-head-section">
            <h1>{ title }</h1>
          </div>
        </section>
        <section>
          <div className="topic-column-section">
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

export default Topic;
