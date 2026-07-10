import {
  createRouter,
  createWebHistory,
  type RouteLocationNormalized,
  type RouteRecordRaw,
} from "vue-router";
import ProductListView from "@/components/ProductListView.vue";
import ProductDetailView from "@/components/ProductDetailView.vue";
import ProductFormView from "@/components/ProductFormView.vue";
import ProductDeleteView from "@/components/ProductDeleteView.vue";
import RegisterView from "@/components/RegisterView.vue";
import LoginView from "@/components/LoginView.vue";
import { useAuthStore } from "@/stores/auth";
import CategoryListView from "@/components/CategoryListView.vue";
import AdminView from "@/components/AdminView.vue";
import CategoryFormView from "@/components/CategoryFormView.vue";

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "products",
    component: ProductListView,
    // beforeEnter: (to: RouteLocationNormalized) => {
    //   const authStore = useAuthStore();
    //   if (!authStore.isAuthenticated) return { name: "login" };
    // },

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
  { path: "/login", name: "login", component: LoginView },
  {
      path: '/admin',
      name: 'admin',
      component: AdminView,
      children: [
        { path: 'categories', name: 'admin-categories', component: CategoryListView },
        { path: 'categories/new', name: 'admin-category-create', component: CategoryFormView },
        { path: 'categories/edit/:id(\\d+)', name: 'admin-category-edit', component: CategoryFormView, props: true }
      ]
    }
];

const router = createRouter({
  history: createWebHistory(), // /#/produits/4
  routes,
});

router.beforeEach((to: RouteLocationNormalized) => {
  const authStore = useAuthStore();

  // guard global
  if (to.path.startsWith("/admin") && !authStore.isAuthenticated) {
    // si la route commence par admin et que je ne suis pas authentifié
    return { name: "login", query: { redirect: to.fullPath } }; // on redirige vers /login avec une query variable du type : ?redirect="/admin/..."
  }
});

export default router;
