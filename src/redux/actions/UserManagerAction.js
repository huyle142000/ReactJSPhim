import { bothServiceToken } from "../../Service/BothTokenService";
import { MA_NHOM } from "../../utils/setting";
import { history } from "../../App";
import {
  GET_INFO_USER,
  GET_LIST_USER,
  GET_TYPE_USER,
} from "../type/UserManagerType";
import { toast } from "react-toastify";
export function getListUser(user = "") {
  return async (dispatch) => {
    try {
      let url;
      if (user === "") {
        url = `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MA_NHOM}`;
      } else {
        url = `QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${MA_NHOM}&tuKhoa=${user}`;
      }
      const { data } = await bothServiceToken.get(url);
      dispatch({ type: GET_LIST_USER, payload: data.content });
    } catch (e) {
    }
  };
}
// // upLoad User
export function getTypeUser() {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.get(
        "QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"
      );
      dispatch({ type: GET_TYPE_USER, payload: data.content });
    } catch (e) {
    }
  };
}
//get InfoUser to edit
export function getInfoUser(ma) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.post(
        `QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${ma}`
      );
      dispatch({ type: GET_INFO_USER, payload: data.content });
    } catch (e) {
    }
  };
}
// edit User
export function editUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.post(
        `QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
        user
      );
      history.push("/admin/useradmin");
      toast.success("Success");
      getListUser();
    } catch (e) {
    }
  };
}
// delete User
export function deleteUser(user) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.delete(
        `QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${user}`
      );
      toast.success("Success");

      getListUser();
    } catch (e) {
    }
  };
}
//Create User
export function createUser(value) {
  return async (dispatch) => {
    try {
      const { data } = await bothServiceToken.post(
        `QuanLyNguoiDung/ThemNguoiDung`,
        value
      );
      toast.success("Success");

      getListUser();
      history.push("/admin/useradmin");
    } catch (e) {
    }
  };
}
