<script setup>
	import { ref } from 'vue';
	import { getFirestore, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
	import { useCollection } from 'vuefire';
	import { firebaseApp } from '../firebase';
	
	const db = getFirestore(firebaseApp);
	const productList = useCollection(collection(db, 'products'));
	
	const newProduct = ref({
		name: '',
		flavor: '',
		description: '',
		price: 0,
		quantity: 0,
	});
	
	const editingProduct = ref(null);
	
	async function addProduct() {
		try {
			await addDoc(collection(db, 'products'), newProduct.value);
			newProduct.value = { name: '', flavor: '', description: '', price: 0, quantity: 0 };
		} catch (error) {
			console.error('Error adding product: ', error);
		}
	}
	
	async function removeProduct(productId) {
		try {
			await deleteDoc(doc(db, 'products', productId));
		} catch (error) {
			console.error('Error removing product: ', error);
		}
	}
	
	async function editProduct(product) {
		editingProduct.value = { ...product };
	}
	
	async function updateProduct() {
		try {
			await updateDoc(doc(db, 'products', editingProduct.value.id), editingProduct.value);
			editingProduct.value = null;
		} catch (error) {
			console.error('Error updating product: ', error);
		}
	}
</script>

<template>
	<div class="container mx-auto p-4">
		<h1 class="text-2xl font-bold mb-4">Admin Product Management</h1>

		<form v-if="editingProduct" @submit.prevent="updateProduct()" class="bg-white p-4 rounded shadow-md mb-4 max-w-md mx-auto">
			<div class="mb-4">
				<label class="block text-gray-700">Product Name</label>
				<input v-model="editingProduct.name" placeholder="Product Name" required class="w-full p-2 border border-gray-300 rounded" />
			</div>
			<div class="mb-4">
				<label class="block text-gray-700">Flavor</label>
				<input v-model="editingProduct.flavor" placeholder="Flavor" required class="w-full p-2 border border-gray-300 rounded" />
			</div>
			<div class="mb-4">
				<label class="block text-gray-700">Description</label>
				<textarea v-model="editingProduct.description" placeholder="Description" required class="w-full p-2 border border-gray-300 rounded"></textarea>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700">Price</label>
				<input v-model.number="editingProduct.price" type="number" placeholder="Price" required class="w-full p-2 border border-gray-300 rounded" />
			</div>
			<div class="mb-4">
				<label class="block text-gray-700">Quantity</label>
				<input v-model.number="editingProduct.quantity" type="number" placeholder="Quantity" required class="w-full p-2 border border-gray-300 rounded" />
			</div>
			<button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">Update Product</button>
		</form>

		<form v-else @submit.prevent="addProduct()" class="bg-white p-4 rounded shadow-md mb-4 max-w-md mx-auto">
			<div class="mb-4">
				<label class="block text-gray-700">Product Name</label>
				<input v-model="newProduct.name" placeholder="Product Name" required class="w-full p-2 border border-gray-300 rounded" />
			</div>
			<div class="mb-4">
				<label class="block text-gray-700">Flavor</label>
				<input v-model="newProduct.flavor" placeholder="Flavor" required class="w-full p-2 border border-gray-300 rounded" />
			</div>
			<div class="mb-4">
				<label class="block text-gray-700">Description</label>
				<textarea v-model="newProduct.description" placeholder="Description" required class="w-full p-2 border border-gray-300 rounded"></textarea>
			</div>
			<div class="mb-4">
				<label class="block text-gray-700">Price</label>
				<input v-model.number="newProduct.price" type="number" placeholder="Price" required class="w-full p-2 border border-gray-300 rounded" />
			</div>
			<div class="mb-4">
				<label class="block text-gray-700">Quantity</label>
				<input v-model.number="newProduct.quantity" type="number" placeholder="Quantity" required class="w-full p-2 border border-gray-300 rounded" />
			</div>
			<button type="submit" class="bg-green-500 text-white px-4 py-2 rounded">Add Product</button>
		</form>
		
		<ul class="space-y-4">
			<li v-for="product in productList" :key="product.id" class="bg-white p-4 rounded shadow-md flex justify-between items-center">
				<div>
					<h3 class="text-lg font-semibold">{{ product.name }}</h3>
					<p class="text-gray-600">{{ product.flavor }}</p>
				</div>
				<div class="space-x-2">
					<button @click="editProduct(product)" class="bg-yellow-500 text-white px-4 py-2 rounded">Edit</button>
					<button @click="removeProduct(product.id)" class="bg-red-500 text-white px-4 py-2 rounded">Remove</button>
				</div>
			</li>
		</ul>
	</div>
</template>

<style scoped>
	/* Add your styles here */
</style>
