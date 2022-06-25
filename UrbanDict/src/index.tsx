import { Plugin, registerPlugin } from "enmity/managers/plugins";
import manifest from "../manifest.json";
import { urbcommand } from "./components";

const Urb = {
  ...manifest,
  commands: [],

  onStart() {
    this.commands = urbcommand;
  },

  onStop() {
    Patcher.unpatchAll();
  },
};

registerPlugin(Urb);
