import React from 'react';
import { Link } from 'react-router-dom'

import "./Main.scss";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      stream: {
        title: '',
        button: ''
      },
      searchInput: '',
      search: {
        button: ''
      },
      error: {
        message: ''
      },

    };

    this.postSearch = this.postSearch.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
  }

  postSearch (event) {
    event.preventDefault();
    console.log(this.state.searchInput);
    if (this.state.searchInput.length > 0) {
      this.props.history.push('/topic/' + this.state.searchInput);
      this.setState({
        searchInput: '',
      });  
    }
  }

  handleFormChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  componentDidMount() {
    this.setState({
      title: 'Twitter stream',
      search: {
        button: 'Search'
      },
      stream: {
        title: 'See what the world is talking about',
        button: 'Check now'
      }
    });
  }

  componentWillUnmount() {
  }

  render() {
    const { title, search, searchInput, stream } = this.state;
    return (
      <div className="Main">
        <section>
          <div className="main-head-section">
            <h1>{ title }</h1>
          </div>
        </section>
        <section className="main-search-section">
           <form onSubmit={ this.postSearch }>
            <input name="searchInput" type="text" value={searchInput} onChange={this.handleFormChange} placeholder="Please type your search word here" />
            <button type="submit" value="Submit">{ search.button }</button>
          </form>
        </section>
        <section className="main-stream-section">
          <h2>{ stream.title }</h2>
          <Link to="/stream">
            <button>{ stream.button }</button>
          </Link>
        </section>
      </div>
    );
  }
}

export default Main;
