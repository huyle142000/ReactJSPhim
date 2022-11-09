import { bothServiceToken } from "../../Service/BothTokenService";
import { getCinemaQuery } from "../../utils/cinemaConfigString";
import { CINEMA_CLUSTERS, CINEMA_INFO } from "../../utils/setting";
import { GET_ALL_CINEMA, GET_LIST_CINEMA_CLUSTERS } from "../type/CinemaType";

export const getAllCinema = () => {
  return (middleWareDispatch) => {
    let promise = bothServiceToken.get(CINEMA_INFO);
    promise
      .then((res) => {
        middleWareDispatch({
          type: GET_ALL_CINEMA,
          arrCinema: res.data.content,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getCinemaClusters = (cinemaId) => {
    return (middleWareDispatch) => {
        bothServiceToken
            .get(CINEMA_CLUSTERS + getCinemaQuery(cinemaId))
            .then((res) => {
                console.log(res.data);
                middleWareDispatch({
                    type: GET_LIST_CINEMA_CLUSTERS,
                    arrCinema: res.data.content,
                });
            })
            .catch((err) => {
                console.log(err);
            });
    };
};

export function cinemaModalAction(type, payload) {
  return (dispatch) => {
    dispatch({ type: type, payload });
  };
}
