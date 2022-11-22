import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Route } from "react-router-dom";
import { history } from "../../App";
import Footer from "../../components/FooterComponent/FooterRFC";
import Header from "../../components/HeaderComponent/HeaderRFC";

export default function HomeTemplate(props) {
  const { Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(propRoute) => {
        return (
          <Fragment>
            <Header {...propRoute} />
            <Component {...propRoute} />
            <Footer {...propRoute} />
          </Fragment>
        );
      }}
    />
  );
}
