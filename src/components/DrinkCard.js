import React, { Component } from 'react';

class DrinkCard extends Component {
  constructor ({drink}) {
    super();
    this.state = {
      id: drink.id,
      name: drink.name,
      alcohol: drink.alcohol_content,
      thumb: drink.image_thumb_url,
      price: drink.price_in_cents,
      vol: drink.volume_in_milliliters
    }
    this.divideByHundred = this.divideByHundred.bind(this);
    this.setPicture = this.setPicture.bind(this);
  }
  divideByHundred (number, key) {
    let result;

    key === 'price' ? result = (number / 100).toFixed(2) : result = (number / 100);
    this.setState({ [key]: result });
  }
  setPicture (url) {
    url ? this.setState({ thumb: url }) : this.setState({ thumb: '/default_thumb.png' });
  }
  componentDidMount () {
    this.divideByHundred(this.state.alcohol, 'alcohol');
    this.divideByHundred(this.state.price, 'price');
    this.setPicture(this.state.thumb);
  }
  render () {
    return (
      <div className='drink' onClick={this.searchProd}>
        <img src={this.state.thumb} className='drink-image' alt='' />
        <div className='drink-details'>
          <h3 className='drink-name'>{this.state.name}</h3>
          <p><span>Price:</span> {`$${this.state.price}`}</p>
          <p><span>Alc:</span> {`${this.state.alcohol}%`}</p>
          <p><span>Vol:</span> {`${this.state.vol}mL`}</p>
        </div>
      </div>
    )
  }
}

export default DrinkCard;
