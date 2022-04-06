import { Plugin, registerPlugin } from "enmity-api/plugins";
import {
  Command,
  EnmitySectionID,
  ApplicationCommandInputType,
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "enmity-api/commands";
import { sendReply } from "enmity-api/clyde";
import { showToast } from "enmity-api/toast";

const HelloWorld: Plugin = {
  name: "HelloWorld",
  commands: [],

  onStart() {
    const h: Command = {
      id: "hello-world",
      applicationId: EnmitySectionID,
      name: "hello",
      displayName: "hello",
      description: "hello world",
      displayDescription: "hello world",
      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,
      options: [
        {
          name: "toast",
          displayName: "toast",
          description: "Toast",
          displayDescription: "Toast",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
      execute: async function (args, message): Promise<void> {
        let toasttext = { content: String(args), source: 42069 };
        showToast(toasttext);
        sendReply(message.channel.id, "Hello, world!");
      },
    };
    this.commands.push(h);
  },

  onStop() {
    this.commands = [];
  },
};

registerPlugin(HelloWorld);
