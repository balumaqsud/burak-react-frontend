//react app state

import { Member } from "./member";
import { Product } from "./product";

//screen component based type state

// homepage
export interface AppRootState {
  homepage: HomePageState;
}

export interface HomePageState {
  popularDishes: Product[];
  newDishes: Product[];
  topUsers: Member[];
}

// products

//etc
