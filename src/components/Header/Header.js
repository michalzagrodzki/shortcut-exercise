import React from 'react';
import { Link } from 'react-router-dom'

import "./Header.scss";

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      main: {
        name: '',
        value: ''
      },
      stream: {
        name: '',
        value: ''
      },
      error: {
        message: ''
      }
    }
  }

  componentDidMount() {
    this.setState({
      main: {
        name: 'Main',
        value: 'main'
      },
      stream: {
        name: 'Stream',
        value: 'stream'
      },
    });
  }

  componentWillUnmount() {
  }

  render() {
    const { main, stream } = this.state;
    return (
      <div className="header-section">
        <Link to={'/'}>
          <p>{ main.name }</p>
        </Link>
        <Link to={'/stream'}>
          <p>{ stream.name }</p>
        </Link>
      </div>
    );
  }
}

export default Header;
