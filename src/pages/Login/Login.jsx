import React from 'react';
import styles from "./login.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { loginAction } from '../../redux/actions/FormAction';
import { useFormik } from 'formik';
import { CLOSE_MODAL } from '../../redux/type/ModalType';


export default function Login() {

  let dispatch = useDispatch();
  useSelector(state => state.ModalFilmReducer);
  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: ''
    },
    onSubmit: values => {
      console.log(values);
      let action = loginAction(values);
      dispatch(action);
      dispatch({ type: CLOSE_MODAL })
    },
  })

  return (
    <div className={styles.login_box}>
      <h2>Login</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className={styles.user_box}>
          <input onChange={formik.handleChange} type="text" name="taiKhoan" required />
          <label>Account</label>
        </div>
        <div className={styles.user_box}>
          <input onChange={formik.handleChange} type="password" name="matKhau" required />
          <label>Password</label>
        </div>
        <button style={{ width: "70%", margin: "40px auto 0" }} className={styles.form_submit}>
          <span />
          <span />
          <span />
          <span />
          Submit
        </button>
      </form>
    </div>
  );
}

