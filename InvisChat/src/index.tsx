import { Plugin, registerPlugin } from "enmity/managers/plugins";
import manifest from "../manifest.json";
import { inviscommand } from "./components";

const Invis = {
  ...manifest,
  commands: [],

  onStart() {
    this.commands = inviscommand;
  },

  onStop() {
    Patcher.unpatchAll();
  },
};

registerPlugin(Invis);
