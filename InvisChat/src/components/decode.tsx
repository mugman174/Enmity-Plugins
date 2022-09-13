import { sendReply } from "enmity/api/clyde";
import {
  Command,
  ApplicationCommandType,
  ApplicationCommandInputType,
  ApplicationCommandOptionType,
} from "enmity/api/commands";
import { REST } from "enmity/metro/common";

const dcommand: Command = {
  id: "invischatdecode",

  name: "decode",
  displayName: "decode",

  description: "Decode Invisible Chat",
  displayDescription: "Decode Invisible Chat",

  type: ApplicationCommandType.Chat,
  inputType: ApplicationCommandInputType.BuiltInText,

  options: [
    {
      name: "text",
      displayName: "text",
      description: "Text to decode",
      displayDescription: "Text to decode",
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
    let password = args.find((o) => o.name == "password")?.value || "password";
    let res = await REST.post({
      url: `https://invis.mugman.ga`,
      body: {
        type: "reveal",
        password: password,
        secret: msg,
      },
    });
    let encoded = res.body?.response;
    if (!encoded) {
      sendReply(message.channel.id, "Failed");
      return {};
    }
    await sendReply(message.channel.id, encoded);
  },
};

export { dcommand };
