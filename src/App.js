import React, { Component } from 'react';
import { fetchLcboEndpoint } from './api/lcbo.js';

/* COMPONENTS */
import Header from './components/Header';
import Search from './components/Search';
import DrinkCard from './components/DrinkCard';
import Empty from './components/Empty';
import ErrorMsg from './components/ErrorMsg';
import MapContainer from './components/MapContainer';

class App extends Component {
  constructor () {
    super();
    this.state = {
      query: 'dessert wine',
      show: true,
      error: '',
      empty: false,
      drink: {},
      prod: '',
      location: {
        lat: 43.641446,
        lng: -79.3826417
      },
      stores: []
    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchStores = this.fetchStores.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.getRandomNum = this.getRandomNum.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.setQuery = this.setQuery.bind(this);
  }
  fetchData (query, random) {
    fetchLcboEndpoint('products', {
      q: query,
      per_page: 5
    }).then(data => {
      const drink = data.result[random];
      this.isEmpty(drink);

      if (!this.state.empty) {

        this.setState({
          drink: drink,
          prod: drink.id
        });
        this.fetchStores(drink.id);
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
      this.getLocations(data.result);
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
    this.setState({ stores: [], drink: {} });
    this.setQuery();
  }
  isEmpty (drink) {
    drink == null
      ? this.setState({ drink: {}, empty: true, show: false })
      : this.setState({ drink: drink, empty: false, show: true });
  }
  getRandomNum (number) {
    // gets a random number from 0 to passed number
    const randomNum = Math.floor(Math.random() * number);
    return randomNum;
  }
  getLocations (stores) {
    const coordinates = stores.map(store => {
      return {
        lat: store.latitude,
        lng: store.longitude
      };
    });
    
    this.setState({ stores: coordinates });
  }
  setQuery () {
    const random = this.getRandomNum(4);
    this.fetchData(this.state.query, random);
  }
  componentDidMount () {
    this.setQuery();
  }
  render () {
    return (
      <div className='container'>
        <Header />

        <section className='main'
          role='main'>

          <aside>
            <Search
              submit={this.handleSubmit}
              change={this.handleInputChange}
              value={this.state.query}
            />

            <div className='drinksContainer'>
              {this.state.show && <DrinkCard key={`${this.state.prod}`} drink={this.state.drink} />}
            </div>

            <div className='errorContainer'>
              {this.state.error && <ErrorMsg details={this.state.error} />}
              {this.state.empty && <Empty />}
            </div>
          </aside>

          <div>
            <MapContainer
              stores={this.state.stores}
              lat={this.state.location.lat}
              lng={this.state.location.lng}
            />
          </div>

        </section>
      </div>
    );
  }
}

export default App;
