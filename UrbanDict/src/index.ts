import {
  EnmitySectionID,
  ApplicationCommandInputType,
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "enmity-api/commands";
import { get } from "enmity-api/rest";
import { Plugin, registerPlugin } from "enmity-api/plugins";
import { sendReply } from "enmity-api/clyde";
import { showToast } from "enmity-api/toast";

const UrbanDict: Plugin = {
  name: "UrbanDict",
  commands: [],

  onStart() {
    command = {
      name: "urban",
      displayName: "urban",
      description: "Searches urban dictionary for a word",
      displayDescription: "Searches urban dictionary for a word",
      options: [
        {
          name: "word",
          displayName: "word",
          description: "The word to search for",
          displayDescription: "The word to search for",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "send",
          displayName: "send",
          description: "Whether to send the result in a message",
          displayDescription: "Whether to send the result in a message",
          type: ApplicationCommandOptionType.Boolean,
          required: false,
        },
      ],
      execute: async (args, message) => {
        word = args[0].value;
        let res = await get(
          `https://api.urbandictionary.com/v0/define?term=${word}`
        ).body;
        sendReply(res.list[0]?.definition);
      },
    };
    this.commands.push(command);
  },

  onStop() {
    this.commands = [];
  },
};
try {
  registerPlugin(UrbanDict);
} catch {
  showToast({ content: "o deer urban dict failed to exist" });
}
