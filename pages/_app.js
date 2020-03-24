import React from "react";
import ReactDOM from "react-dom";
import { register } from "codelift";

register({ React, ReactDOM });

import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
