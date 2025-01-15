<script setup>
import { useCurrentUser } from 'vuefire';
import { signOut } from "firebase/auth";
import { useFirebaseAuth } from 'vuefire';
import { useRouter } from 'vue-router';
import Section from '../components/Section.vue';
import CtaButton from '../components/CtaButton.vue';
import ProductCardList from '../components/ProductCardList.vue';
import GallerySection from '../components/GallerySection.vue';
import SocialMediaSharingSection from '../components/SocialMediaSharingSection.vue';
import ContactUsSection from '../components/ContactUsSection.vue';
import CustomerFeedbackSection from '../components/CustomerFeedbackSection.vue';
import NavigationBar from '../components/NavigationBar.vue';

const router = useRouter();
const user = useCurrentUser();
const firebaseAuth = useFirebaseAuth();

function onSignOut() {
	signOut(firebaseAuth)
	.then(() => {
		router.push('/sign-in');
	})
	.catch((error) => {
		// An error happened.
	});
};

function toggleMenu() {
	const menu = document.getElementById('mobile-menu');
	menu.classList.toggle('hidden');
}

</script>

<template>
	<div class="bg-gray-50">
		
		<!-- Navigation Bar (Breadcrumb for mobile) -->
		<NavigationBar />
		
		
		<!-- Main Landing Section -->
		<section class="flex flex-col md:flex-row items-center justify-between min-h-screen px-6 mt-20 md:mt-28">
			<!-- Left Side (Image) -->
			<div class="w-full md:w-1/2">
				<img src="../assets/header-bg.png" alt="Delicious Cookies" class="w-full h-auto object-cover rounded-lg shadow-lg mb-6 md:mb-0">
			</div>
			
			<!-- Right Side (Text and CTA) -->
			<div class="w-full md:w-1/2 text-center md:text-left px-4 md:px-8">
				<h1 class="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Sweet Treats Await You!</h1>
				<p class="text-sm md:text-lg text-gray-600 mb-6">
					Discover our freshly baked cookies and desserts, made with premium ingredients. Whether you're craving a sweet snack or a special treat, we've got something for everyone.
				</p>
				<a href="#shop-now" class="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-pink-400 transition duration-300 transform hover:scale-105">
					Shop Now
				</a>
			</div>
		</section>
		
		<Section id="shop-now" name="pricing" class="py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 bg-orange-50">
			<div class="container mx-auto px-4 sm:px-6 lg:px-8">
				<h2 class="text-3xl font-semibold text-center text-gray-800 mb-8 md:text-4xl lg:text-5xl">
					Baked to Perfection, Ready for You
				</h2>
				<ProductCardList/>
			</div>
		</Section>
		
		<Section>
			<GallerySection/>
		</Section>

		<CustomerFeedbackSection/>

		<SocialMediaSharingSection/>

		<ContactUsSection/>
		
	</div>
</template>

<style scoped>
.header-img {
	background-image: url('../assets/header-bg.png');
	background-size: cover;
	background-repeat: no-repeat;
}
a {
	font-weight: 500;
}
.span-gradient {
	background: rgb(217,174,238);
	background: -moz-linear-gradient(90deg, rgba(217,174,238,1) 0%, rgba(148,218,233,1) 100%);
	background: -webkit-linear-gradient(90deg, rgba(217,174,238,1) 0%, rgba(148,218,233,1) 100%);
	background: linear-gradient(90deg, rgba(217,174,238,1) 0%, rgba(148,218,233,1) 100%);
	filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d9aeee",endColorstr="#94dae9",GradientType=1);
	background-clip: text;
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
}
</style>