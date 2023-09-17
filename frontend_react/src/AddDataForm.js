import React, { Component } from 'react';

// Компонент формы для добавления данных
class AddDataForm extends Component {
  // Изначальное состояние формы
  state = {
    date: '',
    name: '',
    quantity: '',
    distance: '',
  };

  // Обработчик изменения значений в инпутах
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  // Обработчик отправки формы
  handleSubmit = (e) => {
    e.preventDefault();

    // Создание нового объекта данных на основе введенных значений
    const newData = {
      date: this.state.date,
      name: this.state.name,
      quantity: this.state.quantity,
      distance: this.state.distance,
    };

    // Передача новых данных в родительский компонент через props.onAdd
    this.props.onAdd(newData);

    // Сброс состояния формы
    this.setState({
      date: '',
      name: '',
      quantity: '',
      distance: '',
    });
  };

  // Отрисовка формы
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
