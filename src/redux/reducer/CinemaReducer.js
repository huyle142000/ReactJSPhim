import {
  GET_ALL_CINEMA,
  GET_LIST_CINEMA_CLUSTERS,
  GET_LIST_CINEMA_RELEASE,
  SELECT_CINEMA,
} from "../type/CinemaType";

const initialState = {
  currentCinema: [
    {
      maHeThongRap: "BHDStar",
      tenHeThongRap: "BHD Star Cineplex",
      biDanh: "bhd-star-cineplex",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/bhd-star-cineplex.png",
    },
    {
      maHeThongRap: "CGV",
      tenHeThongRap: "cgv",
      biDanh: "cgv",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/cgv.png",
    },
    {
      maHeThongRap: "CineStar",
      tenHeThongRap: "CineStar",
      biDanh: "cinestar",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/cinestar.png",
    },
    {
      maHeThongRap: "Galaxy",
      tenHeThongRap: "Galaxy Cinema",
      biDanh: "galaxy-cinema",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/galaxy-cinema.png",
    },
    {
      maHeThongRap: "LotteCinima",
      tenHeThongRap: "Lotte Cinema",
      biDanh: "lotte-cinema",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/lotte-cinema.png",
    },
    {
      maHeThongRap: "MegaGS",
      tenHeThongRap: "MegaGS",
      biDanh: "megags",
      logo: "https://movienew.cybersoft.edu.vn/hinhanh/megags.png",
    },
  ],
  arrCinema: [],
  arrCinemaCluster: [],
  arrCinemaRelease: [],
};

export const CinemaReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_CINEMA:
      state.arrCinema = action.arrCinema;
      state.currentCinema = state.arrCinema;
      return { ...state };

    case SELECT_CINEMA:
      state.currentCinema = action.cinemaSelected;
      return { ...state };

    case GET_LIST_CINEMA_CLUSTERS:
      state.arrCinemaCluster = action.arrCinema;
      return { ...state };
    case GET_LIST_CINEMA_RELEASE:
      state.arrCinemaRelease = action.arrCinema;
      return { ...state };

    default:
      return state;
  }
};
