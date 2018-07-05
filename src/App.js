import React, { Component } from "react";
import { fetchLcboEndpoint } from "./api/lcbo.js";

/* COMPONENTS */
import Header from "./components/Header";

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
        <Header />
        
        <section className="main" 
          role="main">
          
          <div className="mapContainer">
            <div className="map"></div>
          </div>
          {/* <Map /> */}
          
          <form className="inputContainer" 
            onSubmit={this.handleSubmit}>
            <input type="text" 
              className="textInput" 
              onChange={this.handleInputChange} 
              name="query" 
              value={this.state.query}/>

            <input type="submit" 
              className="submitInput" 
              value="Find"/>
          </form>
          {/* <Form /> */}

        </section>
      </div>
    );
  }
}

export default App;
