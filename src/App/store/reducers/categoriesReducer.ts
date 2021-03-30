import { PayloadAction } from "@reduxjs/toolkit";

const SET_CATEGORIES_COUNT = "SET_CATEGORIES_COUNT";

interface CategoriesState {
  count: number;
}

const defaultState: CategoriesState = {
  count: 6,
};

const categoriesReducer = (
  state = defaultState,
  action: PayloadAction<number>
): CategoriesState => {
  switch (action.type) {
    case SET_CATEGORIES_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
