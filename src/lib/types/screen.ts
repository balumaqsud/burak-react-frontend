//react app state

import { Member } from "./member";
import { Product } from "./product";

//screen component based type state

// homepage
export interface AppRootState {
  homePage: HomePageState;
  productsPage: ProductsPageState;
}

export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}
export interface ProductsPageState {
  restaurant: Member | null;
  chosenProduct: Product | null;
  products: Product[];
}

// products

//etc
