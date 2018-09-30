import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

const vegetarian = "Vegetarian Pizza";
const hawaiian = "Hawaiian Pizza";
const pepperoni = "Pepperoni Pizza";

const pizzaPrice = 80;

class App extends Component {
  state = {
    pizzaQuantity: 1,
    pizzaType: '',
    showPizzaTypeError: false,
    pizzaFormStep: 1
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to Pizzabot!</h1>
        </header>
        <div className="container">
          <p>Hey! Happy to serve your pizza. On our menu we have {vegetarian}, {hawaiian}
            and {pepperoni}</p>
          {
            this.state.pizzaFormStep === 1 && <form onSubmit={this.onPizzaTypeSelected}>
                <p>Enter the name of the pizza you want to order today</p>
                <input name="pizzaType" value={this.state.pizzaType} onChange={this.onPizzaTypeChanged}/>
                <p hidden={!this.state.showPizzaTypeError}>Invalid pizza, you can only enter vegetarian, hawaiian and pepperoni</p>
                <button type="submit" disabled={this.state.showPizzaTypeError}>Next</button>
              </form>
          }
          {
            this.state.pizzaFormStep === 2 && <form onSubmit={this.onPizzaQuantitySelected}>
                <p>How many of {this.getPizzaName()}
                  do you want?</p>
                <input name="pizzaQuantity" type="number" value={this.state.pizzaQuantity} onChange={this.onPizzaQuantityChanged}></input>
                <button>Next</button>
              </form>
          }
          {
            this.state.pizzaFormStep === 3 && <div>
              <p>Great, I'll get started on your {this.getPizzaName()}
                right away, it will cost {this.getPrice()}
                kr. The pizzas will take {this.getCookingTime()}
                minutes</p>
            </div>
          }
        </div>
      </div>);
  }

  getPrice = () => {
    return this.state.pizzaQuantity * 80;
  }

  getPizzaName = () => {
    switch (this.state.pizzaType) {
      case 'vegeterian':
        {
          return vegetarian;
        }
      case 'hawaiian':
        {
          return hawaiian;
        }
      case 'pepperoni':
        {
          return pepperoni;
        }
    }

  }

  onPizzaQuantityChanged = (event) => {
    const value = event.target.value;
    this.setState({pizzaQuantity: value});

  }

  onPizzaTypeChanged = (event) => {
    const value = event.target.value;
    this.setState({pizzaType: value});
    if (value !== 'vegetarian' && value !== 'hawaiian' && value !== 'pepperoni') {
      this.setState({showPizzaTypeError: true});
    } else {
      this.setState({showPizzaTypeError: false});
    }
  }

  onPizzaTypeSelected = (event) => {
    // stops the browser from reloading on submit
    event.preventDefault();
    this.setState({pizzaFormStep: 2});
  }

  onPizzaQuantitySelected = (event) => {
    // stops the browser from reloading on submit
    event.preventDefault();
    this.setState({pizzaFormStep: 3});
  }

  getCookingTime = () => {
    const quantity = this.state.pizzaQuantity;
    if (quantity <= 2) {
      return 10;
    } else if (quantity <= 5) {
      return 15;
    } else {
      return 20;
    }
  }
}

export default App;
