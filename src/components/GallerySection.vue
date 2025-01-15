<script setup>

</script>

<template>
	<section class="py-12 bg-pink-50">
		<div class="container mx-auto px-6 sm:px-12 lg:px-24">
			<h2 class="text-3xl font-semibold text-center text-gray-800 mb-8 md:text-4xl lg:text-5xl">
				Sweet Treats Gallery
			</h2>
			<p class="text-center text-lg text-gray-600 mb-12 md:text-xl lg:text-2xl">
				Discover our delicious desserts, crafted with love and the finest ingredients.
			</p>
			
			<!-- Gallery Grid -->
			<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				
				<!-- Gallery Item 1 -->
				<div v-for="n in 6" :key="index" class="group relative overflow-hidden rounded-lg shadow-lg">
					<img :src="`/src//assets/dessert${n}.jpg`" :alt="`Dessert ${n}`" class="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110">
					<div class="absolute inset-0 bg-black opacity-30 group-hover:opacity-0 transition-opacity duration-300"></div>
					<div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<button class="bg-white text-pink-500 px-6 py-3 rounded-full text-lg font-semibold">
							View More
						</button>
					</div>
				</div>
				
			</div>
		</div>
	</section>
	
</template>

<style scoped>

</style>