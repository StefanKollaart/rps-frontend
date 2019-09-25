import { observable, decorate } from "mobx";

class ScreenStore {
  name = "";

  setName(name) {
    console.log(this.name);
    this.name = name;
    console.log(this.name);
  }
}

decorate(ScreenStore, {
  currentScreen: observable
});

const screenStore = new ScreenStore();
export default screenStore;
