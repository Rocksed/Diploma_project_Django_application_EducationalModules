import axios from 'axios';
import React, { Component } from 'react';
import AddDataForm from './AddDataForm';
import './App.css';

class App extends Component {
  state = {
    details: [],
    filterColumn: 'name',
    filterCondition: 'contains',
    filterValue: '',
    currentPage: 1,
    totalPages: 1,
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.filterColumn !== this.state.filterColumn ||
      prevState.filterCondition !== this.state.filterCondition ||
      prevState.filterValue !== this.state.filterValue ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchData();
    }
  }

  fetchData = () => {
    const { filterColumn, filterCondition, filterValue, currentPage } = this.state;

    const params = {
      page: currentPage,
      [filterColumn]: filterValue,
      condition: filterCondition,
    };

    axios
      .get('http://localhost:8000/api/table/', { params })
      .then((res) => {
        this.setState({
          details: res.data.results,
          totalPages: res.data.total_pages,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

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

  render() {
    const { details, totalPages, currentPage } = this.state;

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
            {this.filterData().map((output, id) => (
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
        <div className="pagination-container">
          <button onClick={() => this.handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            Предыдущая
          </button>
          <span>Страница {currentPage} из {totalPages}</span>
          <button onClick={() => this.handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
            Следующая
          </button>
        </div>
      </div>
    );
  }
}

export default App;
