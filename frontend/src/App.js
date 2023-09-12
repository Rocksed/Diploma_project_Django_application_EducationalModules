import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
import AddDataForm from './AddDataForm';

class App extends Component {
  state = {
    details: [],
    filterColumn: 'name', // По умолчанию фильтруем по названию
    filterCondition: 'contains', // По умолчанию условие - содержит
    filterValue: '', // По умолчанию пустое значение
  };

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

  handleFilterColumnChange = (e) => {
    this.setState({ filterColumn: e.target.value });
  };

  handleFilterConditionChange = (e) => {
    this.setState({ filterCondition: e.target.value });
  };

  handleFilterValueChange = (e) => {
    this.setState({ filterValue: e.target.value });
  };

    filterData = () => {
      const { filterColumn, filterCondition, filterValue, details } = this.state;
      return details.filter(row => {
        switch (filterCondition) {
          case 'equals':
            return row[filterColumn] == filterValue;
          case 'contains':
            // Добавляем проверку на тип данных
            const columnValue = row[filterColumn];
            if (typeof columnValue === 'string') {
              return columnValue.toLowerCase().includes(filterValue.toLowerCase());
            }
            return false;
          case 'greater':
            return Number(row[filterColumn]) > Number(filterValue);
          case 'less':
            return Number(row[filterColumn]) < Number(filterValue);
          default:
            return true;
        }
      });
    };



  render() {
    const filteredData = this.filterData();

    return (
        <div className="app-container">
        <header className="app-header">Таблица результатов</header>
        <div className="filter-container">
          <label className="filter-label">
          Фильтровать по столбцу:
          <select
            className="filter-select"
            value={this.state.filterColumn}
            onChange={this.handleFilterColumnChange}
          >
            <option value="date">Дата</option>
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
            <option value="equals">Равно</option>
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
        {filteredData.map((output, id) => (
          <div key={id}>
            <div style={{ display: 'inline-block', marginRight: '10px' }}>
              <p><strong>Дата:</strong> {output.date}</p>
              <p><strong>Название:</strong> {output.name}</p>
              <p><strong>Количество:</strong> {output.quantity}</p>
              <p><strong>Расстояние:</strong> {output.distance}</p>
            </div>
          </div>
        ))}
        <AddDataForm onAdd={this.handleAddData} />
      </div>
    );
  }
}

export default App;

