import React, { Component } from "react";
import SearchBox from "../searchBox/SearchBox";
import Categories from "../categories/Categories";
import ic_shipping from "./ic_shipping.png";
import "./SearchResults.scss";

class SearchResults extends Component {
  constructor(props) {
    super(props);
    let initialData;

    if (__isBrowser__) {
      initialData = window.__initialData__;
      delete window.__initialData__;
    }
    else {
      initialData = props.staticContext.initialData;
    }

    this.state = { products: initialData };
  }

  static requestInitialData(param) {
    const url = "http://127.0.0.1:3000/api/items?q="+param.query.search;

    return fetch(url)
      .then(response => response.json())
      .catch(error => console.log(error));
  }

  render() {
    const { products } = this.state;

    return (
      <div className="searchResults">
        <SearchBox searchText={this.props.location.search.split('=')[1]}></SearchBox>
        <Categories categories={products.categories}> </Categories>
        <div className="body">
          <div></div>
          <div className="list">
          { products && products.items &&
            products.items.map( item =>
              <li className="item" key={item.id }>
                <div className="itemImage">
                  <a href={ '/items/'+ item.id } >
                    <figure>
                      <img src={ item.picture } alt={ item.title } />
                    </figure>
                  </a>
                </div>
                <div className="itemInfo">
                    <div className="itemPrice">
                        $ { item.price.amount }
                        <img hidden={!item.free_shipping} src={ic_shipping}/>
                    </div>
                    <span className="itemTitle">
                        <a href={ '/items/'+ item.id } >
                            { item.title }
                        </a>
                    </span>
                </div>
            </li>
          )}
          {(products.length===0) &&
            <div className="productsNotFound">
              <p>No hay publicaciones que coincidan con tu búsqueda.</p>
              <ul>
                <li>Revisa la ortografía de la palabra.</li>
                <li>Utiliza palabras más genéricas o menos palabras.</li>
                <li>Navega por categorías de productospara encontrar un producto similar.</li>
              </ul>
            </div>
          }
          </div>
          <div></div>
        </div>
      </div>
    );
  }
}

export default SearchResults;
