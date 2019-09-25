import React from 'react';

import "./Tweet.scss";

class Tweet extends React.Component {

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  render() {

    let userImage;
    let userName;

    if (this.props.tweet.user.profile_image_url_https !== undefined) { userImage = <img src={ this.props.tweet.user.profile_image_url_https } alt="" />; };
    if (this.props.tweet.user.name !== undefined) { userName = <h4>{ this.props.tweet.user.name }</h4>; };


    return (
      <div className="Tweet">
        <section>
          <div className="tweet-body-section">
            <div className="tweet-header-section">
              { userImage }
              { userName }
            </div>
            <p>{ this.props.tweet.text }</p>
          </div>
        </section>
      </div>
    );
  }
}

export default Tweet;
