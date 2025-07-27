// server base url
export const URL =
  process.env.NEXT_PUBLIC_API_ENDPOINT || "http://127.0.0.1:4000";
// app config
export const AppConfig = () => ({
  app: {
    // server endpoint
    url: URL,
    name: "Online Judge",
    slogan: "Online Judge",
    meta: {
      description: "Online Judge",
      keywords: "Online Judge",
    },

    // api endpoint
    apiUrl: `${URL}/api`,
  },
});
