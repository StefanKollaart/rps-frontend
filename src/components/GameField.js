import React from "react";
import GameOption from "./GameOption";
import gameStore from "../stores/Game";
import playerStore from "../stores/Player";
import { observer } from "mobx-react";
import "./GameField.scss";

@observer
class GameField extends React.Component {
  constructor(props) {
    super(props);

    this.gameStore = gameStore;
    this.playerStore = playerStore;
  }

  renderGameOption = (option, index) => {
    return <GameOption {...option} key={`game-option-${index}`} />;
  };

  timerLabel = () => {
    // refactor with addition
    if (!this.gameStore.isResultScreen && this.gameStore.timer > -1) {
      return this.gameStore.timer;
    } else if (this.gameStore.currentTurn) {
      if (this.gameStore.currentTurn.is_draw) {
        return "Gelijkspel";
      } else if (
        this.playerStore.player.id === this.gameStore.currentTurn.winner_id
      ) {
        return "Jij wint!";
      } else {
        return "Je tegenspeler wint";
      }
    } else {
      return null;
    }
  };

  timer = () => {
    return (
      <div className="game-timer__outer">
        <p className="game-timer__count">{this.timerLabel()}</p>
      </div>
    );
  };

  render() {
    return (
      <div className="game-field__outer">
        <div className="game-field__options">
          {this.gameStore.playOptions.map(this.renderGameOption)}
        </div>
        {this.timer()}
      </div>
    );
  }
}

export default GameField;
