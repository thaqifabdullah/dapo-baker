<script setup>
import { getFirestore, collection } from 'firebase/firestore';
import { useCollection } from 'vuefire';
import { firebaseApp } from '../firebase';
import { ref, watchEffect } from 'vue';
import CartModal from './CartModal.vue';
import { useCartStore } from '../stores/CartStore';
import { useCartModalStore } from '../stores/CartModalStore';

const db = getFirestore(firebaseApp);
const productList = useCollection(collection(db, 'products'));

const isCartModalOpen = ref(false);	 // Controls the visibility of the cart modal
const selectedQuantities = ref({});
const cartStore = useCartStore();
const cartModalStore = useCartModalStore();

watchEffect(() => {
	// Update the selectedQuantities object whenever the cartItems array changes
	productList.value.forEach(product => {
		selectedQuantities.value[product.id] = 1;
	});
});

function addToCart(product) {
	
	const item = {
		...product,
		quantity: selectedQuantities.value[product.id] ?? 1,
	};
	
	cartStore.addToCart(item);
	
	// Open the cart modal
	cartModalStore.openCartModal();
};

function closeCartModal() {
	// Close the cart modal
	cartModalStore.closeCartModal();
};

</script>

<template>
	<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
		<div v-for="product in productList" :key="product.id" class="bg-white max-w-sm rounded-lg overflow-hidden flex flex-col h-full shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 mx-auto w-full">
			<img src="https://live.staticflickr.com/563/31235245553_9880e67039_q.jpg" alt="Product Image" class="w-full h-56 object-cover">
			<div class="flex flex-col justify-between flex-grow">
				<div class="p-4">
					<h3 class="text-xl font-semibold text-gray-800">{{ product.name }}</h3>
					<h4 class="mt-4 text-sm font-medium text-gray-800">Flavor: <span class="text-sm text-gray-600 mt-2">{{ product.flavor }}</span></h4>
					<p class="text-sm text-gray-600 mt-2">{{ product.description }}</p>
				</div>
				<div>
					<div class="p-4 bg-gray-100 flex justify-between items-center">
						<!-- Price -->
						<span class="text-lg font-semibold text-red-500">RM {{ product.price.toFixed(2) }}</span>
						
						<!-- Quantity Input -->
						<div class="flex items-center space-x-2">
							<label for="quantity" class="text-sm font-medium text-gray-700">Qty:</label>
							<input type="number" id="quantity" name="quantity" min="1" :max="product.quantity" v-model.number="selectedQuantities[product.id]" class="w-12 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none">
						</div>
					</div>
					<div class="p-4 bg-gray-100 flex justify-center">
						<button @click="addToCart(product)" class="bg-pink-400 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-pink-300 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 mt-4">
							Add to Cart
						</button>
						
					</div>
				</div>
				
			</div>
			
		</div>
		
	</div>
	
	<CartModal />
</template>

<style scoped>

</style>