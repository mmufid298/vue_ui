import Vue from "vue";
import VueRouter from "vue-router";
import ListBeritaView from "../views/ListBeritaView.vue";
import DetailBeritaView from "../views/DetailBeritaView.vue";
import DefaultView from "../views/DefaultView.vue";
import KategoriView from "../views/KategoriView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    redirect: "/berita",
  },

  {
    path: "/berita",
    component: DefaultView,
    children: [
      {
        path: "/kategori",
        component: DefaultView,
        children: [
          {
            path: "",
            name: "Kategori Berita",
            component: KategoriView,
          },
          {
            path: ":category",
            name: "genre Berita",
            component: ListBeritaView,
          },
        ],
      },
      {
        path: "",
        name: "Berita",
        component: ListBeritaView,
      },
      {
        path: ":slug",
        name: "Detail Berita",
        component: DetailBeritaView,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
