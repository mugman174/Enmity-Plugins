const Opener = getByProps("openLazy");
import { Toasts } from "enmity/metro/common";
import { Plugin, registerPlugin } from "enmity/managers/plugins";
import manifest from "../manifest.json";
import { inviscommand } from "./components";
import { getByProps } from "enmity/metro";
import { create } from "enmity/patcher";
import { decoder } from "./utils";

const FluxDispatcher = getByProps(
  "_currentDispatchActionType",
  "_subscriptions",
  "_waitQueue"
);
const Patcher = create("invis-chat");

const Invis = {
  ...manifest,
  commands: [],

  onStart() {
    this.commands = inviscommand;

    Patcher.before(Opener, "openLazy", (_, [component, sheet]) => {
      if (sheet === "MessageLongPressActionSheet") {
        component.then((instance) => {
          let func = instance.default;
          instance.default = function (
            { message, user, channel, canAddNewReactions },
            _
          ) {
            let og = func({ message, user, channel, canAddNewReactions }, _);
            if (
              og.props?.children?.props?.children?.props?.children[1][0].key ==
              "420"
            ) {
              return og;
            }
            let ButtonRow =
              og.props?.children?.props?.children?.props?.children[1][0].type;
            let decodeButton = (
              <ButtonRow
                key="420"
                onPressRow={(_) => {
                  Opener.hideActionSheet();
                  alert(decoder(message.content, "password"));
                }}
                message="Decode message with InvisChat"
              />
            );
            og.props.children.props.children.props.children[1].unshift(
              decodeButton
            );
            return og;
          };
          return instance;
        });
      }
    });

    const INV_DETECTION = new RegExp(
      /( \u200c|\u200d |[\u2060-\u2064])[^\u200b]/
    );
    let attempt = 0;
    let attempts = 3;
    FluxDispatcher.dispatch({
      type: "LOAD_MESSAGES",
    });
    const lateStarter = () => {
      try {
        const MessageCreate = FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_CREATE.find(
          (h) => h.name === "MessageStore"
        );
        const LoadMessages = FluxDispatcher._actionHandlers._orderedActionHandlers.LOAD_MESSAGES_SUCCESS.find(
          (h) => h.name === "MessageStore"
        );

        Patcher.before(MessageCreate, "actionHandler", (_, args: any) => {
          if (args[0].message.content.match(INV_DETECTION)) {
            args[0].message.content += " [:lock:]";
          }
        });
        Patcher.before(LoadMessages, "actionHandler", (_, args: any) => {
          if (args[0].message.content.match(INV_DETECTION)) {
            args[0].message.content += " `[:lock:]`";
          }
        });

        console.log("Success");
        Toasts.open({ content: "Invisible Chat has started" });
      } catch {
        Toasts.open({ content: "Invisible Chat - Trying Again" });
        setTimeout(lateStarter, 300);
      }
    };
    lateStarter();
  },

  onStop() {
    Patcher.unpatchAll();
  },
};

registerPlugin(Invis);
