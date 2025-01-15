import { defineStore } from 'pinia';

export const useCartStore = defineStore('cart', {
	state: () => ({
		items: [], // Array to hold cart items
	}),
	getters: {
		cartTotal: (state) =>
			state.items.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2),
		itemCount: (state) => state.items.reduce((count, item) => count + item.quantity, 0),
	},
	actions: {
		addToCart(item) {
			const existingItem = this.items.find((cartItem) => cartItem.id === item.id);
			if (existingItem) {
				existingItem.quantity += item.quantity;
			} else {
				this.items.push({ ...item, quantity: item.quantity || 1 });
			}
		},
		updateQuantity(itemId, quantity) {
			const item = this.items.find((cartItem) => cartItem.id === itemId);
			if (item) {
				item.quantity = Math.max(quantity, 1); // Ensure quantity is at least 1
			}
		},
		removeFromCart(itemId) {
			this.items = this.items.filter((cartItem) => cartItem.id !== itemId);
		},
		clearCart() {
			this.items = [];
		},
	},
});
