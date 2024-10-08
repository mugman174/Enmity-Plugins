import { Plugin, registerPlugin } from "enmity-api/plugins";
import {
  Command,
  EnmitySectionID,
  ApplicationCommandInputType,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  unregisterCommands,
} from "enmity-api/commands";
import { showToast } from "enmity-api/toast";
function slashOpt(name, description) {
  return {
    name: name,
    displayName: name,
    description: description,
    displayDescription: description,
    type: ApplicationCommandOptionType.String,
    required: true,
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

const MockPlugin: Plugin = {
  name: "MockPlugin",
  commands: [],

  onStart() {
    unregisterCommands("mock");
    const mock_slash = slashComad(
      "mock",
      "mock",
      "MaKe yOuR TeXt lIkE ThIs",
      [slashOpt("text", "The text to mock-ify")],
      async function (args, message): Promise<object> {
        let input = args[0].value;
        for (let i = 0; i < input.length; i += 2) {
          input =
            input.substr(0, i) + input[i].toUpperCase() + input.substr(i + 1);
        }
        return { content: input };
      }
    );
    this.commands.push(mock_slash);
  },

  onStop() {
    this.commands = [];
  },
};

registerPlugin(MockPlugin);
