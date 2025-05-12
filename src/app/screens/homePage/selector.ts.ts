import { createSelector } from "reselect";
import { AppRootState } from "../../../lib/types/screen";

const selectHomePage = (state: AppRootState) => state.homepage ?? {};

export const retrievePopularDishes = createSelector(
  selectHomePage,
  (Homepage) => Homepage.popularDishes
);
export const retrieveNewDishes = createSelector(
  selectHomePage,
  (Homepage) => Homepage.newDishes
);
export const retrieveTopUsers = createSelector(
  selectHomePage,
  (Homepage) => Homepage.topUsers
);
