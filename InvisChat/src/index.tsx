import * as Assets from "enmity/api/assets";
import { Toasts, React } from "enmity/metro/common";
import { Plugin, registerPlugin } from "enmity/managers/plugins";
import manifest from "../manifest.json";
import { inviscommand } from "./components";
import { getByProps } from "enmity/metro";
import { create } from "enmity/patcher";
import { decoder } from "./utils";
import { FormRow } from "enmity/components";
import { sendReply } from "enmity/api/clyde";

const Opener = getByProps("openLazy");
const getLastSelectedChannelId = getByProps("getLastSelectedChannelId");
const LazyActionSheet = getByProps("openLazy", "hideActionSheet");

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
    const INV_DETECTION = new RegExp(
      /( \u200c|\u200d |[\u2060-\u2064])[^\u200b]/
    );

    let attempt = 0;
    let attempts = 3;
    FluxDispatcher.dispatch({
      type: "LOAD_MESSAGES",
    });
    const lateStarter = () => {
      Patcher.before(
        Opener,
        "openLazy",
        ({ hideActionSheet }, [component, sheet]) => {
          if (sheet === "MessageLongPressActionSheet") {
            component.then((instance) => {
              Patcher.after(instance, "default", (_, args, res) => {
                if (
                  res.props.children().props.children.props.children[1][0]
                    .key == "420"
                ) {
                  return;
                }
                const text = res.props.children().props.children.props
                  .children[0].props.message.content; // why
                const channelId = getLastSelectedChannelId.getChannelId();
                if (!text.match(INV_DETECTION)) return;
                res.props.children().props.children.props.children[1].unshift(
                  <FormRow
                    key="420"
                    iconSource={Assets.getIDByName("ic_locked_24px")}
                    label="Decode Message"
                    onPress={() => {
                      decoder(text, undefined).then((c) =>
                        sendReply(channelId, { content: c })
                      );
                      hideActionSheet();
                    }}
                  />
                );
              });
            });
          }
        }
      );

      try {
        const MessageCreate = FluxDispatcher._actionHandlers._orderedActionHandlers.MESSAGE_CREATE.find(
          (h) => h.name === "MessageStore"
        );
        const LoadMessages = FluxDispatcher._actionHandlers._orderedActionHandlers.LOAD_MESSAGES_SUCCESS.find(
          (h) => h.name === "MessageStore"
        );

        Patcher.before(MessageCreate, "actionHandler", (_, args: any) => {
          if (!args[0].message.content) {
            return;
          }
          if (args[0].message.content.match(INV_DETECTION)) {
            args[0].message.content += " [:lock:]";
          }
        });
        Patcher.before(LoadMessages, "actionHandler", (_, args: any) => {
          if (!args[0].message.content) {
            return;
          }
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
