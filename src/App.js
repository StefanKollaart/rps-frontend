import React from "react";
import screenStore from "./stores/Screen";
import { observer } from "mobx-react";
import NameScreen from "./screens/Name";
import "./App.scss";

const AppView = observer(
  class App extends React.Component {
    constructor(props) {
      super(props);

      this.screenStore = screenStore;
    }

    getCurrentScreen = () => {
      switch (this.screenStore.currentScreen) {
        case "name":
          return <NameScreen />;
          break;
        default:
          return <NameScreen />;
      }
    };

    render() {
      return <div className="app__outer">{this.getCurrentScreen()}</div>;
    }
  }
);

export default AppView;
