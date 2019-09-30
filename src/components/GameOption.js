import React from "react";
import gameStore from "../stores/Game";
import playerStore from "../stores/Player";
import { observer } from "mobx-react";
import "./GameOption.scss";

@observer
class GameOption extends React.Component {
  constructor(props) {
    super(props);

    this.gameStore = gameStore;
    this.playerStore = playerStore;
  }

  resultClasses = () => {
    var extraClasses = "";
    if (
      this.gameStore.isResultScreen &&
      this.gameStore.currentTurn &&
      this.gameStore.currentTurn.picks
    ) {
      this.gameStore.currentTurn.picks.forEach(pick => {
        if (
          pick.player_id === this.playerStore.player.id &&
          pick.picked === this.props.id
        ) {
          extraClasses += " game-option__outer--selected";
        }
        if (
          pick.player_id !== this.playerStore.player.id &&
          pick.picked === this.props.id
        ) {
          extraClasses += " game-option__outer--opponent-selected";
        }
      });
    }
    return extraClasses;
  };

  render() {
    console.log(this.gameStore.currentTurn);
    const { name, emoji, id } = this.props;
    return (
      <div
        className={`game-option__outer ${
          this.gameStore.pickedItem === id ? "game-option__outer--selected" : ""
        } ${this.resultClasses()}`}
        onClick={() => {
          this.gameStore.setTurn(id);
        }}
      >
        <p className="game-option__emoji">{emoji}</p>
        <p className="game-option__label">{name}</p>
      </div>
    );
  }
}

export default GameOption;
