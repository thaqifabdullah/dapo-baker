<template>
	<!-- Cart Modal -->
	<div v-if="cartModalStore.isCartModalOpen" @click.self="closeModal" class="fixed inset-0 z-50 bg-gray-900 bg-opacity-50 flex justify-end">
		<div
		class="bg-white w-96 h-full p-6 overflow-y-auto transform transition-all duration-300 ease-in-out"
		:class="{
			'translate-x-0': cartModalStore.isCartModalOpen,
			'-translate-x-full': !cartModalStore.isCartModalOpen,
			'w-full sm:w-3/4 md:w-96': true,
		}"
		>
		<div class="flex justify-between items-center">
			<h2 class="text-2xl font-bold text-gray-800">Your Cart</h2>
			<button @click="closeModal" class="text-gray-600 text-2xl">&times;</button>
		</div>
		
		<!-- Cart Items List -->
		<div class="mt-6">
			<div v-if="cartItems.length === 0" class="text-center text-gray-500">
				Your cart is empty.
			</div>
			
			<div v-else>
				<div v-for="(item, index) in cartItems" :key="index" class="flex items-center justify-between mb-4">
					<img src="../assets/dessert1.jpg" alt="Product Image" class="w-16 h-16 object-cover rounded-lg" />
					<div class="flex-1 ml-4">
						<p class="text-lg font-semibold text-gray-800">{{ item.name }}</p>
						<div class="flex items-center mt-2">
							<button @click="decreaseQuantity(item.id)" class="text-gray-600 hover:text-gray-800 px-2">-</button>
							<input
							type="number"
							v-model.number="item.quantity"
							@input="updateQuantity(index, item.quantity)"
							class="w-12 text-center border rounded mx-2"
							min="1"
							/>
							<button @click="increaseQuantity(item.id)" class="text-gray-600 hover:text-gray-800 px-2">+</button>
						</div>
					</div>
					<p class="text-lg font-semibold text-pink-500">RM{{ (item.price * item.quantity).toFixed(2) }}</p>
					<button
					@click="removeFromCart(item.id)"
					class="text-red-500 hover:text-red-700 ml-4"
					aria-label="Remove Item"
					>
					<i class="fas fa-trash"></i>
				</button>
			</div>
		</div>
	</div>
	
	<!-- Cart Actions -->
	<div v-if="cartItems.length > 0" class="mt-6">
		<div class="flex justify-between items-center">
			<p class="text-lg font-semibold">Total: RM{{ cartTotal }}</p>
			<button @click="checkout" class="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-400">
				Checkout
			</button>
		</div>
	</div>
</div>
</div>
</template>

<script setup>
	import { computed } from "vue";
	import { useCartStore } from "../stores/CartStore";
	import { useCartModalStore } from "../stores/CartModalStore";
	import { defineProps, defineEmits } from "vue";
	import { useFirestore, useCurrentUser } from 'vuefire';
	import { collection, addDoc, serverTimestamp} from 'firebase/firestore';
	import { firebaseApp } from '../firebase';
	import { useRouter } from 'vue-router';
	
	const emit = defineEmits(["close"]);
	
	const cartStore = useCartStore();
	const cartModalStore = useCartModalStore();
	// Get Firestore instance
	const db = useFirestore();
	
	const user = useCurrentUser();

	// Reference a Firestore collection
	const ordersCollection = collection(db, 'orders');
	const router = useRouter();	
	
	// State and actions from the Pinia store
	const cartItems = computed(() => cartStore.items);
	const cartTotal = computed(() => cartStore.cartTotal);
	
	const checkout = async () => {
		if (!user.value) {
			user
			alert('Please log in to place an order.');
			router.push('/sign-in');
			return;
		}
		
		if (cartStore.items.length === 0) {
			alert('Your cart is empty!');
			return;
		}
		
		try {
			const orderData = {
				userId: user.value.uid, // Authenticated user's UID
				items: cartStore.items,
				total: cartStore.cartTotal,
				createdAt: serverTimestamp(),
				status: 'pending',
			};
			
			const docRef = await addDoc(ordersCollection, orderData);

			
			// Clear the cart after successful checkout
			cartStore.clearCart();
    		alert('Order placed successfully!');
		} catch (error) {
			console.error('Error adding order:', error);
			alert('Something went wrong. Please try again.');
		}
	};
	
	const increaseQuantity = (itemId) => {
		const item = cartStore.items.find((item) => item.id === itemId);
		if (item) {
			cartStore.updateQuantity(itemId, item.quantity + 1);
		}
	};
	
	const decreaseQuantity = (itemId) => {
		const item = cartStore.items.find((item) => item.id === itemId);
		if (item) {
			cartStore.updateQuantity(itemId, Math.max(1, item.quantity - 1));
		}
	};
	
	const updateQuantity = (itemId, quantity) => {
		cartStore.updateQuantity(itemId, Math.max(1, quantity));
	};
	
	const removeFromCart = (itemId) => {
		cartStore.removeFromCart(itemId);
	};
	
	const closeModal = () => {
		cartModalStore.closeCartModal();
	};
	
</script>

<style scoped>
	/* Custom Styles if needed */
	@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
</style>
