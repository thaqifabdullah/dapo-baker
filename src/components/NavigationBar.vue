<template>
	<!-- Navigation Bar -->
	<nav class="bg-white shadow-md py-2 px-6 fixed w-full top-0 left-0 z-10">
		<div class="max-w-7xl mx-auto flex justify-between items-center">
			<!-- Logo -->
			<a href="#" class="text-2xl font-bold text-pink-500">
				<img src="../assets/logo-dapo-baker.svg" alt="Logo" class="w-16 h-16 rounded-full" />
			</a>
			
			<!-- Hamburger Icon for Mobile -->
			<button class="md:hidden text-gray-800" @click="toggleMenu">
				<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				class="w-6 h-6"
				>
				<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
		
		<!-- Desktop Menu (Horizontal links) -->
		<ul class="hidden md:flex space-x-6 items-center">
			<li>
				<a href="#shop-now" class="text-gray-800 hover:text-pink-500">Shop</a>
			</li>
			<li>
				<a href="#about" class="text-gray-800 hover:text-pink-500">About</a>
			</li>
			<li>
				<a href="#contact" class="text-gray-800 hover:text-pink-500">Contact</a>
			</li>
			<li v-if="user">
				<span type="button" @click="signOutUser" class="text-gray-800 hover:text-pink-500">Sign Out</span>
			</li>
			<!-- Cart Modal Button -->
			<li>
				<button
				@click="openCartModal"
				class="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-400 flex items-center space-x-2"
				>
				<span>Cart</span>
				<span v-if="cartItemCount > 0" class="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
					{{ cartItemCount }}
				</span>
			</button>
		</li>
	</ul>
	
	<!-- Mobile Menu (Hidden by default) -->
	<ul
	v-show="isMenuOpen"
	class="md:hidden absolute top-16 left-0 w-full bg-white shadow-lg text-center py-4 space-y-4 transition-all duration-300"
	>
	<li>
		<a href="#shop-now" class="text-gray-800 hover:text-pink-500">Shop</a>
	</li>
	<li>
		<a href="#about" class="text-gray-800 hover:text-pink-500">About</a>
	</li>
	<li>
		<a href="#contact" class="text-gray-800 hover:text-pink-500">Contact</a>
	</li>
	<!-- Cart Modal Button for Mobile -->
	<li>
		<button
		@click="openCartModal"
		class="bg-pink-500 text-white py-2 px-4 rounded-full hover:bg-pink-400"
		>
		Cart
		<span v-if="cartItemCount > 0" class="ml-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
			{{ cartItemCount }}
		</span>
	</button>
</li>
</ul>
</div>
</nav>
</template>

<script setup>
	import { ref, computed } from "vue";
	import { useCartModalStore } from "../stores/CartModalStore";
	import { useCartStore } from "../stores/cartStore";
	import { useCurrentUser, useFirebaseAuth } from 'vuefire';
	import { signOut } from "firebase/auth";

	
	// Access the Firebase Auth instance
	const firebaseAuth = useFirebaseAuth();
	
	// Reactive user data
	const user = useCurrentUser();
	
	// Sign out method
	const signOutUser = async () => {
		try {
			await signOut(firebaseAuth);
			alert('You have signed out successfully.');
		} catch (error) {
			console.error('Error signing out:', error);
			alert('An error occurred while signing out. Please try again.');
		}
	};

	// Modal Store
	const modalStore = useCartModalStore();
	const openCartModal = modalStore.openCartModal;
	
	// Cart Store
	const cartStore = useCartStore();
	const cartItemCount = computed(() => cartStore.items.length);
	
	// Mobile Menu Toggle
	const isMenuOpen = ref(false);
	const toggleMenu = () => {
		isMenuOpen.value = !isMenuOpen.value;
	};
</script>

<style scoped>
	/* Optional styles for the badge */
	.badge {
		display: inline-block;
		min-width: 1.5rem;
		height: 1.5rem;
		line-height: 1.5rem;
		text-align: center;
		border-radius: 9999px;
		font-size: 0.75rem;
		font-weight: bold;
	}
</style>
