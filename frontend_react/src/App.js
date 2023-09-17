import axios from 'axios';
import React, { Component } from 'react';
import AddDataForm from './AddDataForm';
import './App.css'; // Импорт стилей

class App extends Component {
  // Изначальное состояние компонента
  state = {
    details: [], // Данные из API
    filterColumn: 'name', // Столбец для фильтрации по умолчанию
    filterCondition: 'contains', // Условие фильтрации по умолчанию
    filterValue: '', // Значение фильтра по умолчанию
  };

  // Метод жизненного цикла, вызывается после монтирования компонента
  componentDidMount() {
    axios
      .get('http://localhost:8000/api/table/')
      .then((res) => {
        this.setState({
          details: res.data,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Обработчик добавления новых данных
  handleAddData = (newData) => {
    axios
      .post('http://localhost:8000/api/table/', newData)
      .then((res) => {
        this.setState((prevState) => ({
          details: [...prevState.details, res.data],
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Обработчики изменения значений фильтрации
  handleFilterColumnChange = (e) => {
    this.setState({ filterColumn: e.target.value });
  };

  handleFilterConditionChange = (e) => {
    this.setState({ filterCondition: e.target.value });
  };

  handleFilterValueChange = (e) => {
    this.setState({ filterValue: e.target.value });
  };

  // Функция фильтрации данных
  filterData = () => {
    const { filterColumn, filterCondition, filterValue, details } = this.state;
    return details.filter(row => {
      switch (filterCondition) {
        case 'equals':
          return String(row[filterColumn]) === filterValue;
        case 'contains':
          return String(row[filterColumn]).toLowerCase().includes(filterValue.toLowerCase());
        case 'greater':
          return Number(row[filterColumn]) > Number(filterValue);
        case 'less':
          return Number(row[filterColumn]) < Number(filterValue);
        default:
          return true;
      }
    });
  };

  // Отрисовка компонента
  render() {
    const filteredData = this.filterData();

    return (
      <div className="app-container">
        <header className="app-header">Таблица</header>
        <div className="filter-container">
          <label className="filter-label">
            Фильтровать по столбцу:
            <select
              className="filter-select"
              value={this.state.filterColumn}
              onChange={this.handleFilterColumnChange}
            >
              <option value="name">Название</option>
              <option value="quantity">Количество</option>
              <option value="distance">Расстояние</option>
            </select>
          </label>
          <label className="filter-label">
            Условие фильтрации:
            <select
              className="filter-select"
              value={this.state.filterCondition}
              onChange={this.handleFilterConditionChange}
            >
              <option value="contains">Содержит</option>
              <option value="greater">Больше</option>
              <option value="less">Меньше</option>
            </select>
          </label>
          <label>
            <input
              type="text"
              placeholder="Значение"
              value={this.state.filterValue}
              onChange={this.handleFilterValueChange}
            />
          </label>
        </div>
        <hr />
        <table>
          <thead>
            <tr>
              <th>Дата</th>
              <th>Название</th>
              <th>Количество</th>
              <th>Расстояние</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((output, id) => (
              <tr key={id}>
                <td>{output.date}</td>
                <td>{output.name}</td>
                <td>{output.quantity}</td>
                <td>{output.distance}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <AddDataForm onAdd={this.handleAddData} />
      </div>
    );
  }
}

export default App;
