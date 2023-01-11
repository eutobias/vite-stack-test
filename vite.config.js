import vitePugPlugin from "vite-plugin-pug-transformer";

import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";
import fetch from "node-fetch";

import * as dotenv from "dotenv"
dotenv.config()

const repoName = process.env.PRISMIC_REPO_NAME;
const privateToken = process.env.PRISMIC_PRIVATE_TOKEN;

const endpoint = prismic.getRepositoryEndpoint(repoName);
const accessToken = privateToken;
const routes = [
  { type: "pages", path: "/:uid" },
  { type: "bookmarks", path: "/" },
  { type: "posts", path: "/" },
];

const client = prismic.createClient(endpoint, { routes, accessToken, fetch });
let locals = {};

const init = async () => {
  const rawPages = await client.getAllByType("pages");
  const rawBookmarks = await client.getAllByType("bookmarks");

  const pages = rawPages.map((page) => ({
    slug: page.uid,
    title: prismicH.asText(page?.data?.title),
    content: prismicH.asHTML(page?.data?.content),
  }));

  const bookmarks = rawBookmarks.map((bookmark) => ({
    label: prismicH.asText(bookmark?.data.label),
    link: bookmark?.data.link,
  }));

  locals = { ...locals, pages, bookmarks };
};

await init();

export default {
  plugins: [vitePugPlugin({ pugLocals: locals })],
};
