import React from "react";
import NameScreen from "./screens/Name";
import GameScreen from "./screens/Game";
import screenStore from "./stores/Screen";
import { observer } from "mobx-react";
import "./App.scss";

@observer
class App extends React.Component {
  constructor(props) {
    super(props);

    this.screenStore = screenStore;
  }

  getCurrentScreen = () => {
    switch (this.screenStore.currentScreen) {
      case "name":
        return <NameScreen />;
      case "game":
        return <GameScreen />;
      default:
        return <NameScreen />;
    }
  };

  render() {
    return <div className="app__outer">{this.getCurrentScreen()}</div>;
  }
}

export default App;
