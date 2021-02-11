import React from "react";
import "./scss/global.scss";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes/Routes";

import { Provider } from "react-redux";
import {store} from "./store";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
