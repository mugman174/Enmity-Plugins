import { sendReply } from "enmity/api/clyde";
import {
  Command,
  ApplicationCommandType,
  ApplicationCommandInputType,
  ApplicationCommandOptionType,
} from "enmity/api/commands";
import { REST } from "enmity/metro/common";

const command: Command = {
  id: "invischat",

  name: "invis",
  displayName: "invis",

  description: "Invisible Chat",
  displayDescription: "Invisible Chat",

  type: ApplicationCommandType.Chat,
  inputType: ApplicationCommandInputType.BuiltInText,

  options: [
    {
      name: "text",
      displayName: "text",
      description: "Text to encode",
      displayDescription: "Text to encode",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "cover",
      displayName: "cover",
      description: "message that everyone will see to cover the hidden text",
      displayDescription:
        "message that everyone will see to cover the hidden text",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "password",
      displayName: "password",
      description: "The password to use (default: passowrd)",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],

  execute: async function (args, message) {
    let msg = args.find((o) => o.name == "text").value;
    let cover = args.find((o) => o.name == "cover").value;
    let password = args.find((o) => o.name == "password")?.value || "password";
    let res = await REST.post({
      url: `https://invis.mugman.ga`,
      body: {
        type: "hide",
        password: password,
        cover: cover,
        secret: msg,
      },
    });
    let encoded = res.body?.response;
    if (!encoded) {
      sendReply(message.channel.id, "Failed");
      return {};
    }
    return { content: encoded };
  },
};

export { command };
