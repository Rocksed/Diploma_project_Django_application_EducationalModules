import React, { Component } from 'react';

class AddDataForm extends Component {
  state = {
    date: '',
    name: '',
    quantity: '',
    distance: '',
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newData = {
      date: this.state.date,
      name: this.state.name,
      quantity: this.state.quantity,
      distance: this.state.distance,
    };

    this.props.onAdd(newData);

    this.setState({
      date: '',
      name: '',
      quantity: '',
      distance: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="date"
          placeholder="Дата ГГГГ-ММ-ДД"
          value={this.state.date}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Имя"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="quantity"
          placeholder="Количество"
          value={this.state.quantity}
          onChange={this.handleChange}
        />
        <input
          type="text"
          name="distance"
          placeholder="Расстояние"
          value={this.state.distance}
          onChange={this.handleChange}
        />
        <button type="submit">Add</button>
      </form>
    );
  }
}

export default AddDataForm;