import React from "react";
import styles from "./login.module.css";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "../../redux/actions/FormAction";
import { useFormik } from "formik";
import { CLOSE_MODAL } from "../../redux/type/ModalType";
import { OPEN_REGISTER } from "../../redux/type/FormType";
import Register from "../Register/Register";

export default function Login() {
  let dispatch = useDispatch();
  useSelector((state) => state.ModalFilmReducer);
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    onSubmit: (values) => {
      let action = loginAction(values);
      dispatch(action);
    },
  });

  return (
    <div className={styles.login_box}>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.user_box}>
          <input
            onChange={formik.handleChange}
            type="text"
            name="taiKhoan"
            required
          />
          <label>Account</label>
        </div>
        <div className={styles.user_box}>
          <input
            onChange={formik.handleChange}
            type="password"
            name="matKhau"
            required
          />
          <label>Password</label>
        </div>
        <div className="btn_div">
          <h6
            className="text-danger isuser btn"
            onClick={() => {
              dispatch({ type: OPEN_REGISTER, modalRegister: <Register /> });
            }}
          >
            Bạn có tài khoản chưa?
          </h6>
          <button type="submit" className="btn_movie">
            Submit
            <span />
            <span />
            <span />
            <span />
          </button>
        </div>
      </form>
    </div>
  );
}
