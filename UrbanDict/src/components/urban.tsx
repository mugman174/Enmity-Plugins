import { sendReply } from "enmity/api/clyde";
import {
  Command,
  ApplicationCommandType,
  ApplicationCommandInputType,
  ApplicationCommandOptionType,
} from "enmity/api/commands";
import { REST } from "enmity/metro/common";

const command: Command = {
  id: "urban-dict",

  name: "urban",
  displayName: "urban",

  description: "Urban Dictionary it",
  displayDescription: "Urban Dictionary it",

  type: ApplicationCommandType.Chat,
  inputType: ApplicationCommandInputType.BuiltInText,

  options: [
    {
      name: "text",
      displayName: "text",
      description: "Text to define",
      displayDescription: "Text to define",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "send",
      displayName: "send",
      description: "Do you want to send the output?",
      displayDescription: "Do you want to send the output?",
      type: ApplicationCommandOptionType.Boolean,
      required: false,
    },
  ],

  execute: async function (args, message) {
    let word = args[0].value;
    let res = await REST.get(
      `https://api.urbandictionary.com/v0/define?term=${word}`
    );
    let definition = res.body?.list[0]?.definition;
    let link = res.body?.list[0]?.permalink || "Unknown";
    if (!definition) {
      sendReply(message.channel.id, "Could not find that definition.");
      return {};
    }
    definition = `Top definition for ${args[0].value}:\n\`\`\`${definition}\n\`\`\`\nlink: <${link}>`;

    if (args.length == 2 && args[1].value) {
      return { content: definition };
    } else {
      sendReply(message.channel.id, definition);
    }
  },
};

export { command };
