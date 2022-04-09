import {
  Command,
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
    const command: Command = {
      id: "urban-dict",
      applicationId: EnmitySectionID,
      name: "urban",
      displayName: "urban",
      description: "Searches urban dictionary for a word",
      displayDescription: "Searches urban dictionary for a word",

      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,

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

      execute: async function (args, message): Promise<void> {
        let word = args[0].value;
        showToast({ content: word });
        let res = await get(
          `https://api.urbandictionary.com/v0/define?term=${word}`
        );
        showToast({ content: String(res.status) });
        sendReply(message.channel.id, res.body.list[0]?.definition);
      },
    };
    this.commands.push(command);
  },

  onStop() {
    this.commands = [];
  },
};
registerPlugin(UrbanDict);
