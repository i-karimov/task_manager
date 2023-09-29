import React from "react";

import store from "store";
import { Provider } from "react-redux";
import TaskBoard from "./components/TaskBoard";
import MUITheme from "MUITheme/MUITheme";

const App = () => {
  return (
    <Provider store={store}>
      <MUITheme>
        <TaskBoard />
      </MUITheme>
    </Provider>
  );
};

export default App;
