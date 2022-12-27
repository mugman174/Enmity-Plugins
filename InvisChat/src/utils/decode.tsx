import { REST } from "enmity/metro/common";

async function decoder(text, password) {
  let res = await REST.post({
    url: `https://invis.mugman.tech`,
    body: {
      type: "reveal",
      password: password || "password",
      secret: text,
    },
  });
  let encoded = res.body?.response;
  return encoded;
}

export { decoder };
