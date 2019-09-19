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
