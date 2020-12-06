import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddForm from "../components/AddForm.vue";
import EditForm from "../components/EditForm.vue";
import ChatRoom from "../components/ChatRoom.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  { path: "/add-workout", name: "add", component: AddForm },
  { path: "/edit-workout/:id", name: "edit", component: EditForm },
  { path: "/chatroom/", name: "chatroom", component: ChatRoom }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
