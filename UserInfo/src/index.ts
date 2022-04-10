import { Plugin, registerPlugin } from "enmity-api/plugins";
import {
  Command,
  EnmitySectionID,
  ApplicationCommandInputType,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  unregisterCommands,
} from "enmity-api/commands";
import { sendReply } from "enmity-api/clyde";
import { getUser } from "enmity-api/users";

function slashOpt(name, description, type) {
  return {
    name: name,
    displayName: name,
    description: description,
    displayDescription: description,
    type: type || ApplicationCommandOptionType.String,
    required: true,
  };
}

function slashComad(id, name, description, options, func): Command {
  return {
    id: id,
    applicationId: EnmitySectionID,
    name: name,
    displayName: name,
    description: description,
    displayDescription: description,
    type: ApplicationCommandType.Chat,
    inputType: ApplicationCommandInputType.BuiltInText,
    options: options,
    execute: func,
  };
}

const UserInfo: Plugin = {
  name: "UserInfo",
  commands: [],

  onStart() {
    const uinfo: Command = slashComad(
      "userinfo",
      "userinfo",
      "Get info about a server member",
      [
        slashOpt(
          "member",
          "the server member",
          ApplicationCommandOptionType.User
        ),
      ],
      async function (args, message) {
        let user = await getUser(args[0].value);
        let embeds = [
          {
            title: user.username,
            fields: [
              {
                name: "Information",
                value: `Mention: <@${user.id}>\nUser ID: ${user.id}`,
                inline: true,
              },
              { inline: true, name: "Details", value: `Hypesquad: TBD` },
              {
                inline: true,
                name: "Dates",
                value: `Account Creation Date: no`, //<t:${user.createdTimestamp}>`,
              },
            ],
          },
        ];
        sendReply(message.channel.id, { embeds });
      }
    );
    this.commands.push(uinfo);
  },

  onStop() {
    this.commands = [];
  },
};

registerPlugin(UserInfo);
