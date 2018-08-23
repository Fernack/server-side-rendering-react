import React, { Component } from "react";
import Logo_ML from "./Logo_ML.png";
import "./SearchBox.scss";

class SearchBox extends Component {
  constructor(props) {
      super(props)

      this.state = {
        query: this.props.searchText ? this.props.searchText : ''
      }
  }

  handleUserInput = (event) => {
    this.setState({query: event.target.value})
  }

  render() {
    return (
      <div className="searchBox">
        <div></div>
        <div className="logoSearchContainer">
          <img src={Logo_ML}/>
          <form action="/items" role="search">
            <input type="text" onChange={this.handleUserInput} value={ this.state.query } name="search" autoComplete="off"  placeholder="Nunca dejes de buscar"/>
            <button role="button" aria-label="Buscar" className="searchBtn" type="submit"></button>
          </form>
        </div>
        <div></div>
      </div>
    );
  }
}

export default SearchBox;
