import SearchBox from "./searchBox/SearchBox";
import SearchResults from "./searchResults/SearchResults";
import DetailProduct from "./detailProduct/DetailProduct";

const routes = [
  {
    path: "/",
    exact: true,
    component: SearchBox
  },
  {
    path: "/items",
    exact: true,
    component: SearchResults
  },
  {
    path: "/items/:id",
    exact: true,
    component: DetailProduct
  }
];

export default routes;
