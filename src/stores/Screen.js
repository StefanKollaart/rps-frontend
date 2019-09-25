import { observable } from "mobx";

class ScreenStore {
  @observable currentScreen = "name";

  setScreen(name) {
    this.currentScreen = name;
  }
}

const screenStore = new ScreenStore();
export default screenStore;
