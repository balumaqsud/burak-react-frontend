import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homepage;

export const retrievePopularDishes = createSelector(
  selectHomePage,
  (homepage) => homepage.popularDishes
);
export const retrieveNewDishes = createSelector(
  selectHomePage,
  (homepage) => homepage.newDishes
);
export const retrieveTopUsers = createSelector(
  selectHomePage,
  (homepage) => homepage.topUsers
);
