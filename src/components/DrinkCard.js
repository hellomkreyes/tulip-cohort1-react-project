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
  }
  divideByHundred (number, key) {
    let result;

    key === 'price' ? result = (number / 100).toFixed(2) : result = (number / 100);
    this.setState({ [key]: result });
  }
  componentDidMount () {
    this.divideByHundred(this.state.alcohol, 'alcohol');
    this.divideByHundred(this.state.price, 'price');
  }
  render () {
    return (
      <div className='drink' onClick={this.searchProd}>
        <img src={this.state.thumb} className='drink-image' alt='' />
        <p className='drink-name'>{this.state.name}</p>
        <div className='drink-details'>
          <p><span>Price:</span> {`$${this.state.price}`}</p>
          <p><span>Alc:</span> {`${this.state.alcohol}%`}</p>
          <p><span>Vol:</span> {`${this.state.vol}mL`}</p>
        </div>
      </div>
    )
  }
}

export default DrinkCard;
