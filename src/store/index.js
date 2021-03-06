import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

const dataPers = createPersistedState({
  state: ["listNews", "OneNews"],
});
export default new Vuex.Store({
  plugins: [dataPers],
  state: {
    listNews: [],
    OneNews: [],
    category: "",
    search: "",
    listCategories: [
      {
        nama: "business",
      },
      {
        nama: "entertainment",
      },
      {
        nama: "general",
      },
      {
        nama: "health",
      },
      {
        nama: "science",
      },
      {
        nama: "sports",
      },
      {
        nama: "technology",
      },
    ],
  },
  getters: {},
  mutations: {
    setNews(state, payload) {
      state.listNews = payload.articles;
    },
    setCategory(state, payload) {
      state.category = payload;
    },
    setSearch(state, payload) {
      state.search = payload;
    },

    setOneNews(state, payload) {
      state.oneNews = state.listNews.find(
        (item) =>
          item.title
            .toLowerCase() // LowerCase
            .replace(/\s+/g, "-") // space to -
            .replace(/&/g, `-and-`) // & to and
            .replace(/--/g, `-`) == payload
      );
    },
  },
  actions: {
    fetchListNews(store, payload) {
      axios
        .get(
          `https://newsapi.org/v2/top-headlines?country=id&category=` +
            payload +
            `&apiKey=2418fb5a837a4ad69a6de201af5e0e35`
        )
        .then((response) => {
          store.commit("setNews", response.data);
        });
    },

    getNews(store, slug) {
      store.commit("setOneNews", slug);
    },
    getCategory(store, category) {
      store.commit("setCategory", category);
    },
    getSearch(store, payload) {
      store.commit("setSearch", payload);
    },
  },
  modules: {},
});
