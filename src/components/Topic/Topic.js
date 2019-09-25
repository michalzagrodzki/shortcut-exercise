import React from 'react';
import Tweet from './../Tweet/Tweet';
import Header from './../Header/Header';

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
      title: 'Twitter Topic Stream'
    });

    this.websocket.onopen = () => {
      console.log('WebSocket Client Connected');
      this.websocket.send(this.props.match.params.name);
    };
    this.websocket.onmessage = (data) => {
      const tweet = JSON.parse(data.data)
      // console.log(tweet);
      this.setState({
        tweets: [ tweet, ...this.state.tweets]
      });
    };
  }

  componentWillUnmount() {
    this.websocket.close(1000, 'Closing topic connection');
    this.websocket.onclose = () => {
      console.log('closing stream track in Topic');
    };
  }

  render() {

    const { title, tweets } = this.state;
    
    return (
      <div className="Topic">
        <Header />
        <section>
          <div className="topic-head-section">
            <h1>{ title }</h1>
          </div>
        </section>
        <section>
          <div className="topic-column-section">
            { 
              tweets.map(tweet =>
                <Tweet key={tweet.id_str} tweet={ tweet }/>
              )
            }
          </div>
        </section>
      </div>
    );
  }
}

export default Topic;
