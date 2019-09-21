import React from 'react';

import "./Main.scss";

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
      searchInput: '',
      search: {
        button: 'Search'
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
    this.setState({
      searchInput: '',
    });
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
    const { title, search, searchInput } = this.state;
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
      </div>
    );
  }
}

export default Main;
