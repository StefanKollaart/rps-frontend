import React from "react";
import Spinner from "../components/Spinner";
import Player from "../components/Player";
import GameField from "../components/GameField";
import { observer } from "mobx-react";
import gameStore from "../stores/Game";
import "./Game.scss";

@observer
class GameScreen extends React.Component {
  constructor(props) {
    super(props);

    this.gameStore = gameStore;
  }

  componentDidMount() {
    this.gameStore.fetch();
    this.gameStore.time();
  }

  renderPlayer = (player, index) => {
    return <Player {...player} key={`player-${index}`} />;
  };

  renderFieldIfGameStarted = () => {
    if (this.gameStore.game.players.length == 2) {
      return <GameField />;
    } else {
      return (
        <div className="game-field__waiting">
          <p>Wachten op tweede speler...</p>
        </div>
      );
    }
  };

  render() {
    if (this.gameStore.game && this.gameStore.game.id) {
      return (
        <div className="game-screen__outer">
          <div className="game-players__outer">
            <h3 className="game-players__title">Spelers</h3>
            {this.gameStore.game.players.map(this.renderPlayer)}
          </div>
          {this.renderFieldIfGameStarted()}
        </div>
      );
    } else {
      return <Spinner />;
    }
  }
}

export default GameScreen;
