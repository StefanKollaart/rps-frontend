import { observable, decorate } from "mobx";

class ScreenStore {
  currentScreen = "name";
}

decorate(ScreenStore, {
  currentScreen: observable
});

const screenStore = new ScreenStore();
export default screenStore;
