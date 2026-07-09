import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from "vue-router";
import ProductListView from "@/components/ProductListView.vue";
import ProductDetailView from "@/components/ProductDetailView.vue";
import ProductFormView from "@/components/ProductFormView.vue";
import ProductDeleteView from "@/components/ProductDeleteView.vue";
import RegisterView from "@/components/RegisterView.vue";
import LoginView from "@/components/LoginView.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "products",
    component: ProductListView,

    meta: { title: "Produits" },
  },
  {
    path: "/products/create",
    name: "product-create",
    component: ProductFormView,
    meta: { title: "Créer un produit" },
  },
  {
    path: "/products/view/:id(\\d+)",
    name: "product-view",
    component: ProductDetailView,
    props: true,
  },
  {
    path: "/products/edit/:id(\\d+)",
    name: "product-edit",
    component: ProductFormView,
    props: true,
  },
  {
    path: "/products/delete/:id(\\d+)",

    name: "product-delete",
    component: ProductDeleteView,
    props: true,
  },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/login", name: "login", component: LoginView},
];

const router = createRouter({
  history: createWebHistory(), // /#/produits/4
  routes,
});

export default router;
