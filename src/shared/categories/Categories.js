import React, { Component } from "react";
import "./Categories.scss";

class Categories extends Component {
  constructor(props) {
      super(props)

      this.state = {
        categories: this.props.categories
      }
  }

  render() {
    const { categories } = this.state;

    return (
      <div className="categories">
        <div></div>
        <div className="breadcrum">
        {
          categories && categories.map(
            ( category, index, arr ) =>
              ((index>0) && (index!==arr.length)) ? <span key={index}> > {category} </span> : <span key={index}> {category} </span>
          )
        }
        </div>
      </div>
    );
  }
}

export default Categories;
