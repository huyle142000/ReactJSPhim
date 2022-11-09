import React from 'react'
import styles from "../Login/login.module.css";
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { registerAction } from '../../redux/actions/FormAction';



export default function Register() {

  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      hoTen: '',
      xacNhanMK: '',
    },
    validationSchema: Yup.object({
      taiKhoan: Yup.string().required("Tài khoản không được để trống"),
      matKhau: Yup.string().required("Mật khẩu không được để trống")
      .min(6, 'Mật khẩu ít nhất có 6 kí tự.'),
      xacNhanMK: Yup.string()
        .oneOf([Yup.ref('matKhau'), null], 'Mật khẩu chưa hợp lệ')
        .required("Mật khẩu không được để trống"),
      email: Yup.string().required("Email không được để trống")
        .email("Email chưa đúng định dạng"),
      hoTen: Yup.string().required("Họ tên không được để trống")
        .matches(/^[A-Z a-z]+$/, "Họ tên không đúng định dạng"),
      soDt: Yup.string().required("Số điện thoại không được để trống")
        .matches(/^[0-9]*$/, "Số điện thoại phải là số")
    }),
    onSubmit: values => {
      console.log(values);
      let action = registerAction(values);
      dispatch(action);
    },
  });

  return (
    <div className={styles.login_box}>
      <h2>Register</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-6">
            <div className={styles.user_box}>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="taiKhoan" required />
              <label>Account</label>
              {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
                <span className='text-info'>{formik.errors.taiKhoan}</span>
              ) : null}
            </div>
            <div className={styles.user_box}>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="matKhau" required />
              <label>Password</label>
              {formik.touched.matKhau && formik.errors.matKhau ? (
                <span className='text-info'>{formik.errors.matKhau}</span>
              ) : null}
            </div>
            <div className={styles.user_box}>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="password" name="xacNhanMK" required />
              <label>Password Confirm</label>
              {formik.touched.xacNhanMK && formik.errors.xacNhanMK ? (
                <span className='text-info'>{formik.errors.xacNhanMK}</span>
              ) : null}
            </div>
          </div>
          <div className="col-6">
            <div className={styles.user_box}>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="hoTen" required />
              <label>Username</label>
              {formik.touched.hoTen && formik.errors.hoTen ? (
                <span className='text-info'>{formik.errors.hoTen}</span>
              ) : null}
            </div>
            <div className={styles.user_box}>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="email" required />
              <label>Email</label>
              {formik.touched.email && formik.errors.email ? (
                <span className='text-info'>{formik.errors.email}</span>
              ) : null}
            </div>
            <div className={styles.user_box}>
              <input onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" name="soDt" required />
              <label>Phone number</label>
              {formik.touched.soDt && formik.errors.soDt ? (
                <span className='text-info'>{formik.errors.soDt}</span>
              ) : null}
            </div>
            <button type='submit' className={styles.form_submit}>
              <span />
              <span />
              <span />
              <span />
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
