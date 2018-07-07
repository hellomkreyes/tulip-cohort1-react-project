import React, { Component } from 'react';
import { fetchLcboEndpoint } from './api/lcbo.js';

/* COMPONENTS */
import Header from './components/Header';
import Search from './components/Search';
import DrinkCard from './components/DrinkCard';
import Empty from './components/Empty';


class App extends Component {
  constructor () {
    super();
    this.state = {
      query: 'soju',
      numResults: 5,
      drink: {},
      error: '',
      empty: false,
      prod: ''
    };
    this.fetchData = this.fetchData.bind(this);
    this.fetchStores = this.fetchStores.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.isEmpty = this.isEmpty.bind(this);
    this.getRandomNum = this.getRandomNum.bind(this);
  }
  fetchData (query, results, number) {
    fetchLcboEndpoint('products', {
      q: query,
      per_page: results
    }).then(data => {
      this.setState({
        drink: data.result[number],
        prod: data.result[number].id
      });

      this.isEmpty(this.state.drinks);
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
    this.fetchData(this.state.query);
  }
  handleClick (e) {
    e.preventDefault();
    this.setState({ product: e });
  }
  isEmpty (drinks) {
    drinks == false ? this.setState({ empty: true }) : this.setState({ empty: false });
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
    let emptyMsg;
    if (this.state.empty) {
      emptyMsg = <Empty />
    }

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
            <DrinkCard key={`${this.state.prod}`} drink={this.state.drink} />
          </div>

          <div className='mapContainer'>
            <div className='map'></div>
          </div>

          <div className='errorContainer'>
            {emptyMsg}
          </div>

        </section>
      </div>
    );
  }
}

export default App;
