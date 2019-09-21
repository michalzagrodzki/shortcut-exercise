import React from 'react';

import "./Tweet.scss";

class Tweet extends React.Component {

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {
    return (
      <div className="Tweet">
        <section>
          <div className="tweet-body-section">
            <p>{ this.props.tweet.text }</p>
          </div>
        </section>
      </div>
    );
  }
}

export default Tweet;
