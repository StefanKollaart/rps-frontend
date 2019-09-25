import React from "react";
import gameStore from "../stores/Game";
import playerStore from "../stores/Player";
import { observer } from "mobx-react";
import "./Player.scss";

@observer
class Player extends React.Component {
  constructor(props) {
    super(props);

    this.gameStore = gameStore;
    this.playerStore = playerStore;
  }

  score = () => {
    const game_player = this.gameStore.game.game_players.reduce((acc, val) => {
      return val.player_id == this.props.id ? val : acc;
    });
    return game_player.score;
  };

  addition = () => {
    // refactor with timerlabel
    var label = "";
    if (
      !(!this.gameStore.isResultScreen && this.gameStore.timer > -1) &&
      this.gameStore.currentTurn
    ) {
      if (this.gameStore.currentTurn.is_draw) {
        label = "+1";
      } else if (
        this.playerStore.player.id == this.gameStore.currentTurn.winner_id &&
        this.props.id == this.playerStore.player.id
      ) {
        label = "+1";
      } else if (this.props.id !== this.playerStore.player.id) {
        label = "+1";
      }
    }

    if (label == "") {
      return null;
    } else {
      return <span className="player__addition">{label}</span>;
    }
  };

  render() {
    const { name } = this.props;
    return (
      <div className="player__outer">
        <h4 className="player__name">
          {name} ({this.score()}) {this.addition()}
        </h4>
      </div>
    );
  }
}

export default Player;
