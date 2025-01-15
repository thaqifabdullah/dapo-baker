<script setup>
import { ref, onMounted } from 'vue';
import { useFirestore, useCurrentUser } from 'vuefire';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { watchEffect } from 'vue';

const db = useFirestore();
const user = useCurrentUser();
const orders = ref([]);

watchEffect(async () => {
  if (user.value) {
    const ordersCollection = collection(db, 'orders');
    const q = query(ordersCollection, where('userId', '==', user.value.uid));
    const querySnapshot = await getDocs(q);
    orders.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  }
});
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-center">My Orders</h1>
    <div v-if="orders.length === 0" class="text-center text-gray-500">
      You have no orders.
    </div>
    <ul v-else class="space-y-4">
      <li v-for="order in orders" :key="order.id" class="bg-white p-6 rounded-lg shadow-md">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold">Order ID: {{ order.id }}</h3>
          <p class="text-gray-600">Total: RM{{ order.total }}</p>
        </div>
        <ul class="divide-y divide-gray-200">
          <li v-for="item in order.items" :key="item.id" class="py-2 flex justify-between">
            <span>{{ item.name }} (x{{ item.quantity }})</span>
            <span>RM{{ (item.price * item.quantity).toFixed(2) }}</span>
          </li>
        </ul>
        <p class="text-gray-500 text-sm mt-4">Ordered on: {{ order.createdAt.toDate().toLocaleString() }}</p>
        <p class="text-sm mt-2" :class="{
          'text-yellow-500': order.status === 'pending',
          'text-blue-500': order.status === 'confirmed',
          'text-green-500': order.status === 'completed',
          'text-gray-500': !order.status
        }">{{ order.status ? order.status.toUpperCase() : 'UNDEFINED' }}</p>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
