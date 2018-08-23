import React, { Component } from "react";
import SearchBox from "../searchBox/SearchBox";
import Categories from "../categories/Categories";
import "./DetailProduct.scss";

class DetailProduct extends Component {
  constructor(props) {
    super(props);

    let initialData;
    if (__isBrowser__) {
      initialData = window.__initialData__;
      delete window.__initialData__;
    } else {
      initialData = props.staticContext.initialData;
    }

    this.state = { product: initialData };
  }

  static requestInitialData(param) {
    const url = "http://127.0.0.1:3000/api/items/" + param.params['0'].split('/')[2];

    return fetch(url)
      .then(response => response.json())
      .catch(error => console.log(error));
  }


  render() {
    const { product } = this.state;

    return (
      <div className="detailProduct">
        <SearchBox searchText={this.props.location.search.split('=')[1]}></SearchBox>
        <Categories categories={["No se calcular la categoria porque no está en el json"]}> </Categories>
        <div className="body">
          <div></div>
          <div className="item">
            <div className="itemDetail">
              <figure>
                  <img src={ product.item.picture } />
              </figure>
              <div className="itemInfo">
                  <span>{product.item.condition === 'used' ? 'Usado' : 'Nuevo' } - {product.item.sold_quantity} vendidos </span>
                  <h2 className="title">{product.item.title}</h2>
                  <h2 className="price">{product.item.price.amount}</h2>
                  <button role="button" aria-label="Comprar" className="buyBtn" type="submit">Comprar</button>
              </div>
            </div>
            <div className="descriptionItem">
              <h2> Descripción del producto </h2>
              <span>{ product.item.description }</span>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default DetailProduct;
