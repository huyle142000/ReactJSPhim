import { Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { bothServiceToken } from "../../Service/BothTokenService";
import { BOOK_TICKET, SEAT_BOOKING } from "../../utils/setting";
import { GET_SEAT } from "../type/CinemaType";

import { CLEAR_SEAT } from "../type/TIcketBookingTypes";

export const getSeatBookingAction = (showTimeId) => {
  return (middleWareDispatch) => {
    bothServiceToken
      .get(SEAT_BOOKING + showTimeId)
      .then((res) => {
        middleWareDispatch({
          type: GET_SEAT,
          arrSeat: res.data.content,
        });
      })
      .catch((err) => {
      });
  };
};

export const bookTicketAction = (seatBookingModel) => {
  return (middleWareDispatch) => {
    bothServiceToken
      .post(BOOK_TICKET, seatBookingModel)
      .then((res) => {
        middleWareDispatch({
          type: CLEAR_SEAT,
        });
        toast.success("Đặt vé thành công")
      })
      .catch((err) => {
        toast.err("Đặt vé thất bại")
        
      });
  };
};
