import { observable } from "mobx";
import { baseURL } from "../settings.js";
import axios from "axios";
import screenStore from "./Screen";

class PlayerStore {
  @observable name = "";
  @observable player = {};

  setName(name) {
    this.name = name;
  }

  async start() {
    const player = await this.createPlayer();
    if (player && player.name) {
      screenStore.setScreen("game");
    }
  }

  async createPlayer() {
    const player = await axios.post(`${baseURL}/players`, {
      player: {
        name: this.name
      }
    });
    this.player = player.data;
    return player.data;
  }
}

const playerStore = new PlayerStore();
export default playerStore;
