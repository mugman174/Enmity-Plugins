import {
  Command,
  EnmitySectionID,
  ApplicationCommandInputType,
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "enmity-api/commands";
//import { get } from "enmity-api/rest";
import { Plugin, registerPlugin } from "enmity-api/plugins";
import { sendReply } from "enmity-api/clyde";

const wttr: Plugin = {
  name: "wttr",
  commands: [],

  onStart() {
    const command: Command = {
      id: "wttr",
      applicationId: EnmitySectionID,
      name: "wttr",
      displayName: "wttr",
      description: "Get the weather",
      displayDescription: "Get the weather",
      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,
      options: [
        {
          name: "location",
          displayName: "location",
          description: "Location",
          displayDescription: "Location",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
      execute: async function (args, message): Promise<void> {
        let embeds = [
          {
            image: {
              url: `https://wttr.in/${args[0].value}.png`,
              height: 9999,
              width: 9999,
            },
          },
        ];
        sendReply(message.channel.id, { embeds });
      },
    };
    this.commands.push(command);
  },

  onStop() {
    this.commands = [];
  },
};

registerPlugin(wttr);
