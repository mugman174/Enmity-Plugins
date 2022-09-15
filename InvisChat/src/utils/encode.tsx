import { REST } from "enmity/metro/common";

async function encoder(secret, cover, password) {
  let res = await REST.post({
    url: `https://invis.mugman.ga`,
    body: {
      type: "hide",
      password: password || "password",
      cover: cover,
      secret: secret,
    },
  });
  let encoded = res.body?.response;
  return encoded;
}

export { encoder };
