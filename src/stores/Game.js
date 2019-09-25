import { observable, computed } from "mobx";
import { baseURL } from "../settings.js";
import axios from "axios";
import playerStore from "./Player";
import Cable from "actioncable";

class GameStore {
  @observable game = {};
  @observable socketData = {};
  @observable playOptions = [];
  @observable pickedItem = 0;
  @observable timerStarted = false;
  @observable timer = 15;
  @observable startedTimerForTurn = 0;

  time() {
    if (
      this.game.players &&
      this.game.players.length == 2 &&
      this.currentTurn &&
      (!this.timerStarted || this.startedTimerForTurn != this.currentTurn.id)
    ) {
      const createdTime =
        new Date(this.currentTurn.created_at).getTime() / 1000;
      const nowTime = new Date().getTime() / 1000;
      const maxSeconds = createdTime + 15;
      var seconds = maxSeconds - nowTime;
      this.timer = parseInt(seconds);
      this.startedTimerForTurn = this.currentTurn.id;
    }

    if (this.timer < 0) {
      this.pickedItem = 0;
    }

    setTimeout(() => {
      this.time();
    }, 100);
  }

  setTurn(id) {
    axios.post(`${baseURL}/picks`, {
      pick: {
        player_id: playerStore.player.id,
        turn_id: this.currentTurn.id,
        picked: id
      }
    });
    this.pickedItem = id;
  }

  @computed get isResultScreen() {
    const activeTurns = this.game.turns.filter(turn => {
      return turn.active;
    });
    return activeTurns.length == 0;
  }

  @computed get currentTurn() {
    if (this.game.turns && this.game.turns.length > 0) {
      return this.game.turns.reduce((acc, val) => {
        return val.id > acc.id ? val : acc;
      });
    } else {
      return false;
    }
  }

  async setSocket(game) {
    let cable = Cable.createConsumer("ws://localhost:3030/cable");
    this.chats = cable.subscriptions.create(
      {
        channel: "GameChannel",
        game_id: game.id
      },
      {
        connected: () => {},
        received: data => {
          console.log(data);
          this.game = data;
        },
        create: chatContent => {
          this.perform("create", {
            content: chatContent
          });
        }
      }
    );
  }

  async fetch() {
    const game = await axios.get(
      `${baseURL}/games/match_or_create?player_id=${playerStore.player.id}`
    );
    const playOptions = await axios.get(`${baseURL}/games/play_options`);
    this.game = game.data;
    this.playOptions = playOptions.data;
    if (game.data.id) {
      this.setSocket(game.data);
    }
  }
}

const gameStore = new GameStore();
export default gameStore;
