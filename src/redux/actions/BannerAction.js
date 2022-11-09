import axios from "axios";
import { bothServiceToken } from "../../Service/BothTokenService";
import { DOMAIN_CINEMA, MA_NHOM, TOKEN } from "../../utils/setting";
import { GET_BANNER, PLAY_TRAILER } from "../type/BannerType";

export function getBanner() {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.get(
        `QuanLyPhim/LayDanhSachPhim?maNhom=${MA_NHOM}`
      );
console.log(data)
      dispatch({ type: GET_BANNER, payload: data.content });
    } catch (e) {
      console.log(e.response);
    }
  };
}
// PlayTrailer
export function playTrailer(payload) {
  console.log(payload);
  return (dispatch) => {
    dispatch({ type: PLAY_TRAILER, payload });
  };
}
