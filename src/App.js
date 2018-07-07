import React, { Component } from 'react';
import { fetchLcboEndpoint } from './api/lcbo.js';

/* COMPONENTS */
import Header from './components/Header';
import Search from './components/Search';
import DrinkCard from './components/DrinkCard';
import Empty from './components/Empty';
import MapContainer from './components/MapContainer';

class App extends Component {
  constructor () {
    super();
    this.state = {
      query: 'soju',
      numResults: 5,
      drink: {},
      error: '',
      show: true,
      empty: false,
      prod: '',
      location: {
        lat: 43.641446,
        lng: -79.3826417
      }
    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchStores = this.fetchStores.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.getRandomNum = this.getRandomNum.bind(this);
  }
  fetchData (query, results, number) {
    fetchLcboEndpoint('products', {
      q: query,
      per_page: results
    }).then(data => {
      const drink = data.result[number];
      this.isEmpty(drink);

      if (!this.state.empty) {
        this.setState({
          drink: drink,
          prod: data.result[number].id
        });
      }

    }).catch(err => {
      this.setState({ error: err });
    });
  }
  fetchStores (product) {
    fetchLcboEndpoint('stores', {
      product_id: product,
      per_page: 10
    }).then(data => {
      console.log(data);
    });
  }
  handleInputChange (e) {
    const target = e.target;
    this.setState({
      [target.name]: target.value
    });
  }
  handleSubmit (e) {
    e.preventDefault();
    const random = this.getRandomNum(this.state.numResults);
    this.fetchData(this.state.query, this.state.numResults, random);
    this.fetchStores(this.state.prod);
  }
  isEmpty (drink) {
    drink == null 
      ? this.setState({ drink: {}, empty: true, show: false })
      : this.setState({ empty: false, show: true });
  }
  getRandomNum (number) {
    // gets a random number from 0 to passed number
    const result = Math.floor(Math.random() * number);
    return result;
  }
  componentDidMount () {
    const random = this.getRandomNum(this.state.numResults);
    this.fetchData(this.state.query, this.state.numResults, random);
    this.fetchStores(this.state.prod);
  }
  render () {
    return (
      <div className='container'>
        <Header />

        <section className='main'
          role='main'>

          <Search
            submit={this.handleSubmit}
            change={this.handleInputChange}
            value={this.state.query} />

          <div className='drinksContainer'>
            {this.state.show && <DrinkCard key={`${this.state.prod}`} drink={this.state.drink} />}
          </div>

          <MapContainer lat={this.state.location.lat} lng={this.state.location.lng}/>

          <div className='errorContainer'>
            {/* Error Msg will go here */}
            {this.state.empty && <Empty />}
          </div>

        </section>
      </div>
    );
  }
}

export default App;
