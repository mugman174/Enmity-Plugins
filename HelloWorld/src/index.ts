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
import { showDialog } from "enmity-api/dialog";
import { getString, setString } from "enmity-api/clipboard";
import { getModuleByProps } from "enmity-api/module";

function slashOpt(name, description, type) {
  return {
    name: name,
    displayName: name,
    description: description,
    displayDescription: description,
    type: type || ApplicationCommandOptionType.String,
  };
}
function slashComad(id, name, description, options, func) {
  return {
    id: id,
    applicationId: EnmitySectionID,
    name: name,
    displayName: name,
    description: description,
    displayDescripton: description,
    type: ApplicationCommandType.Chat,
    inputType: ApplicationCommandInputType.BuiltInText,
    options: options,
    execute: func,
  };
}

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
        sendReply(message.channel.id, "Hello, world!");
        if (args) {
          let toasttext = { content: args[0].value, source: 42069 };
          showToast(toasttext);
        }
      },
    };

    toasty = (ct) => showToast({ content: ct });
    const dialog: Comamnd = {
      id: "dialogue",
      applicationId: EnmitySectionID,
      name: "dialog",
      displayName: "dialog",
      description: "Display a dialog box",
      displayDescription: "Display a dialog box",
      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,
      options: [
        {
          name: "message",
          displayName: "message",
          description: "Dialog message",
          displayDescription: "Dialog message",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
      execute: async function (args, message): Promise<void> {
        showDialog({
          body: args[0].value,
          title: "Prompt",
          onCancel: () => toasty("Cancelled"),
          onConfirm: () => toasty("Confirm"),
          onSecondaryConfirm: () => toasty("Confirm2"),
        });
      },
    };
    const clippy: Command = {
      id: "clip",
      applicationId: EnmitySectionID,
      name: "clip",
      displayName: "clip",
      description: "Clipboard fun",
      displayDescription: "Clipboard fun",
      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,
      options: [
        {
          name: "data",
          displayName: "data",
          description: "Leave empty to get clipboard, or set to set",
          displayDescription: "Leave empty to get clipboard, or set to set",
          type: ApplicationCommandOptionType.String,
          required: false,
        },
      ],
      execute: async function (args, message): Promise<void> {
        if (args.length && args[0]) {
          await setString(args[0].value);
          o = args[0].value;
        } else {
          o = await getString();
        }
        sendReply(message.channel.id, o);
      },
    };
    const evalcmd = {
      id: "eval",
      applicationId: EnmitySectionID,
      name: "eval",
      displayName: "eval",
      description: "Enter some jaberscrep and run",
      displayDescription: "Enter some javerscrept and run",
      type: ApplicationCommandType.Chat,
      inputType: ApplicationCommandInputType.BuiltInText,
      options: [
        {
          name: "js",
          displayName: "js",
          description: "the code",
          displayDescription: "the code",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
      execute: async function (args, message): Promise<void> {
        sendReply(message.channel.id, window.eval(args[0].value));
      },
    };

    const getchd = slashComad(
      "getchannel",
      "getch",
      "get a channel id",
      [
        slashOpt(
          "channel",
          "the channel",
          ApplicationCommandOptionType.Channel
        ),
      ],
      async function (args, message): Promise<void> {
        ch = getModuleByProps("getChannels")
          ?.getChannels(message.guild.id)
          .SELECTABLE.find((m) => m.channel.id == args[0].value).channel;
        sendReply(message.channel.id, ch?.name || "welp");
      }
    );

    this.commands.push(getchd);
    this.commands.push(evalcmd);
    this.commands.push(clippy);
    this.commands.push(h);
    this.commands.push(dialog);
  },

  onStop() {
    this.commands = [];
  },
};

registerPlugin(HelloWorld);
