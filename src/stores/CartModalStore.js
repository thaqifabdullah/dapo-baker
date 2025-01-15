// stores/modalStore.js
import { defineStore } from "pinia";

export const useCartModalStore = defineStore("cartModal", {
	state: () => ({
		isCartModalOpen: false,
	}),
	actions: {	
		openCartModal() {
			this.isCartModalOpen = true;
		},
		closeCartModal() {
			this.isCartModalOpen = false;
		},
	},
});
