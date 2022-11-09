import axios from "axios";
import {DOMAIN_CINEMA, TOKEN} from "../../utils/setting";
import { ACCESS_TOKEN, LOGIN, OPEN_LOGIN, USER_LOGIN } from "../type/FormType";
import Login from "../../pages/Login/Login";
import Swal from 'sweetalert2'
import { CLOSE_MODAL } from "../type/ModalType";

export const loginAction = (userInfo) => {
    return (dispatch2) => { 
        let promise = axios({
            url:`${DOMAIN_CINEMA}/QuanLyNguoiDung/DangNhap`,
            method:"post",
            data:userInfo,
            headers:{
                "TokenCybersoft":TOKEN
            }
        });
        promise.then((result) => { 
            console.log(result.data);
            localStorage.setItem(ACCESS_TOKEN, result.data.content.accessToken); 

            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Đăng nhập thành công',
                showConfirmButton: false,
                timer: 1500
              })
            let action = {
                type: LOGIN,
                uLogin: result.data.content
            }
            dispatch2(action);

            let userInfo = JSON.stringify(result.data.content);
            console.log(result.data.content)
            localStorage.setItem(USER_LOGIN, userInfo);
         });
         promise.catch((error) => { 
            console.log(error.response?.data);
          });
     }
}

export const registerAction = (userInfo) => {
    return (dispatch2) => { 
        let promise = axios({
            url:`${DOMAIN_CINEMA}/QuanLyNguoiDung/DangKy`,
            method:"post",
            data:userInfo,
            headers:{
                "TokenCybersoft":TOKEN
            }
        });
        promise.then((result) => { 
            console.log(result.data);
            Swal.fire({
                position: 'top-center',
                icon: 'success',
                title: 'Đăng ký thành công',
                showConfirmButton: false,
                timer: 1500
              });
            dispatch2({ type: OPEN_LOGIN, modalLogin: <Login/> })
         });
         promise.catch((error) => { 
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Tài khoản hoặc email đã tồn tại!',
              })
            console.log(error.response?.data);
          });
     }
}
