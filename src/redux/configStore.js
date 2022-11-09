import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { MovieManagerReducer } from "./reducer/MovieManagerReducer";
import { BannerReducer } from "./reducer/BannerReducer";
import { CinemaReducer } from "./reducer/CinemaReducer";
import { ModalFilmReducer } from "./reducer/ModalFilmReducer";
import { FormReducer} from "./reducer/FormReducer";


const rootReducer = combineReducers({
    ModalFilmReducer,
    BannerReducer,
    CinemaReducer,
    MovieManagerReducer,
    FormReducer
});
export const store = createStore(rootReducer, applyMiddleware(thunk));
