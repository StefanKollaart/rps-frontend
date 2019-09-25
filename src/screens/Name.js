import React from "react";
import playerStore from "../stores/Player";
import { observer } from "mobx-react";
import "./Name.scss";

@observer
class NameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.playerStore = playerStore;
  }

  render() {
    console.log(this.playerStore);
    return (
      <div className="name-screen__outer">
        <h1 className="name-screen__heading">
          Welkom bij Rock, Paper, Scissors
        </h1>
        <h2 className="name-screen__subheading">Vul je naam in en doe mee.</h2>
        <input
          type="text"
          className="name-screen__field"
          placeholder="Hoe heet je?"
          value={this.playerStore.name}
          onChange={e => {
            this.playerStore.setName(e.target.value);
          }}
        />
        <button
          className="name-screen__button"
          onClick={() => {
            this.playerStore.start();
          }}
        >
          Start spel
        </button>
      </div>
    );
  }
}

export default NameScreen;
