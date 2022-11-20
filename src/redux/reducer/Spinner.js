import { PLAY_LOADING, STOP_LOADING } from "../type/SpinnerType";

const initialState = {
  isPlay: false,
};

export const Spinner = (state = initialState, action) => {
  switch (action.type) {
    case PLAY_LOADING:
      state.isPlay = true;
      return { ...state };
    case STOP_LOADING:
      state.isPlay = false;
      return { ...state };

    default:
      return state;
  }
};
