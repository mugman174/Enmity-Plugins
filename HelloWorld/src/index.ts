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
          sendReply(args[0].value);
        } else {
          x = await getString();
          sendReply(x);
        }
      },
    };

    this.commands.push(h);
    this.commands.push(dialog);
  },

  onStop() {
    this.commands = [];
  },
};

registerPlugin(HelloWorld);
