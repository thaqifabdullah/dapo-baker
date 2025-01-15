<template>
	<div>
		<!-- Contact Us Section -->
		<section id="contact" class="bg-white py-16 px-6">
			<div class="max-w-7xl mx-auto text-center">
				<h2 class="text-3xl font-bold text-gray-800 mb-8">Contact Us</h2>
				<p class="text-lg text-gray-600 mb-8">We'd love to hear from you! Fill out the form below or chat with us on WhatsApp.</p>
				
				<!-- Contact Form -->
				<div class="max-w-lg mx-auto">
					<form @submit.prevent="submitForm" class="space-y-6">
						
						<!-- Name Field -->
						<div>
							<label for="name" class="block text-left text-lg font-semibold text-gray-800 mb-2">Your Name</label>
							<input type="text" id="name" name="name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Your Name" required>
						</div>
						
						<!-- Email Field -->
						<div>
							<label for="email" class="block text-left text-lg font-semibold text-gray-800 mb-2">Your Email</label>
							<input type="email" id="email" name="email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Your Email" required>
						</div>
						
						<!-- Message Field -->
						<div>
							<label for="message" class="block text-left text-lg font-semibold text-gray-800 mb-2">Your Message</label>
							<textarea id="message" name="message" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500" placeholder="Your Message" required></textarea>
						</div>
						
						<!-- Submit Button -->
						<div class="text-center">
							<button type="submit" class="bg-pink-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-pink-400 transition duration-300 transform hover:scale-105">Send Message</button>
						</div>
						
					</form>
					
					<!-- WhatsApp Contact Button -->
					<div class="mt-8">
						<p class="text-lg text-gray-800 mb-4">Or chat with us on WhatsApp:</p>
						<a href="https://wa.me/60163428900?text=Hello%2C%20I%27d%20like%20to%20ask%20about%20your%20desserts%21" target="_blank" class="inline-block bg-green-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-green-400 transition duration-300 transform hover:scale-105">
							Chat on WhatsApp
						</a>
					</div>
					
				</div>
			</div>
		</section>
		
	</div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>