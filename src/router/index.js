import { createRouter, createWebHistory } from "vue-router";
import AdminProduct from '../components/AdminProduct.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/sign-in",
			component: () => import("../views/SignIn.vue"),
		},
		{
			path: "/sign-up",
			component: () => import("../views/SignUp.vue"),
		},
		{
			path: "/home",
			component: () => import("../views/Home.vue"),
		},
		{
			path: "/orders",
			component: () => import("../views/Orders.vue"),
		},
		{
			path: "/admin-orders",
			component: () => import("../views/AdminOrders.vue"),
		},
		{
			path: '/admin',
			name: 'AdminProduct',
			component: AdminProduct,
		},
	],
});

export default router;