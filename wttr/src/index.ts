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
import { Image } from "enmity-api/react";

async function getImageSize(file: string): Promise<any> {
  return new Promise((resolve, reject) => {
    Image.getSize(
      file,
      (width: number, height: number) => {
        resolve({ width, height });
      },
      (error) => {
        reject(error);
      }
    );
  });
}

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
          required: false,
        },
        {
          name: "detailed",
          displayName: "detailed",
          description: "Detailed View",
          displayDescription: "Detailed View (default: off)",
          type: ApplicationCommandOptionType.Boolean,
          required: false,
        },
      ],
      execute: async function (args, message): Promise<void> {
        let loc = "";
        if (args[0]?.name == "location") {
          loc = args[0].value;
        }
        let url = `https://wttr.in/${loc}.png`;
        if (!args[1]?.value) {
          url = url + "?0";
        }
        let s = await getImageSize(url);
        let embeds = [
          {
            image: {
              url,
              height: s.height,
              width: s.width,
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
