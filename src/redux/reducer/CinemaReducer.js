import {
    GET_ALL_CINEMA,
    GET_LIST_CINEMA_CLUSTERS,
    SELECT_CINEMA,
} from "../type/CinemaType";

const initialState = {
    currentCinema: {},
    arrCinema: [],
    arrCinemaCluster: [],
};

export const CinemaReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_ALL_CINEMA:
            state.arrCinema = action.arrCinema;
            state.currentCinema = state.arrCinema[0];
            return { ...state };

        case SELECT_CINEMA:
            state.currentCinema = action.cinemaSelected;
            return { ...state };

        case GET_LIST_CINEMA_CLUSTERS:
            state.arrCinemaCluster = action.arrCinema;
            return { ...state };

        default:
            return state;
    }
};
