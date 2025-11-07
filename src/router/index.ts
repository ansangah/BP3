import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PrototypeView from "../views/PrototypeView.vue";
import FlyweightView from "../views/FlyweightView.vue";
import MediatorView from "../views/MediatorView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/prototype",
    name: "prototype",
    component: PrototypeView,
  },
  {
    path: "/flyweight",
    name: "flyweight",
    component: FlyweightView,
  },
  {
    path: "/mediator",
    name: "mediator",
    component: MediatorView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

export default router;
