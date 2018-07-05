import React, { Component } from "react";
import { fetchLcboEndpoint } from "./api/lcbo.js";
/*insert components here*/

class App extends Component {
  constructor() {
    super();
    this.state = {
      query: 'soju',
      drink: {},
    };
    this.fetchData = this.fetchData.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  fetchData(query) {
    fetchLcboEndpoint("products", {
      q: query
    }).then(data => {
      console.log(data.result);
      this.setState({
        drink: data.result[0]
      });
    });
  }
  handleInputChange(e) {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.fetchData(this.state.query);
    console.log(this.state.drink);
  }
  componentDidMount() {
    this.fetchData(this.state.query);
  }
  render() {
    return (
      <div className="container">
        <header>
          <h1>Where, Wine, and How</h1>
          <p>Discover new drinks, find where to buy them, and get lit! <span role="img" aria-labelledby="flame-emoji">🔥</span></p>
        </header>
        <section className="main" role="main">
          <div className="mapContainer">
            <div className="map"></div>
          </div>
          <form className="inputContainer" onSubmit={this.handleSubmit}>
            <input type="text" 
              className="textInput" 
              onChange={this.handleInputChange} 
              name="query" 
              value={this.state.query}/>
            <input type="submit" className="submitInput" value="Find"/>
          </form>
        </section>
      </div>
    );
  }
}

export default App;
