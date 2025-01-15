<script setup>
import { ref, onMounted } from 'vue';
import { useFirestore } from 'vuefire';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

const db = useFirestore();
const orders = ref([]);

onMounted(async () => {
  const ordersCollection = collection(db, 'orders');
  const querySnapshot = await getDocs(ordersCollection);
  orders.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
});

async function updateOrderStatus(orderId, status) {
  try {
    const orderDoc = doc(db, 'orders', orderId);
    await updateDoc(orderDoc, { status });
    const order = orders.value.find(order => order.id === orderId);
    if (order) {
      order.status = status;
    }
  } catch (error) {
    console.error('Error updating order status:', error);
  }
}
</script>

<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4 text-center">Manage Orders</h1>
    <div v-if="orders.length === 0" class="text-center text-gray-500">
      No orders available.
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
        <div class="flex items-center mt-2">
          <p class="text-sm mr-4" :class="{
            'text-yellow-500': order.status === 'pending',
            'text-blue-500': order.status === 'confirmed',
            'text-green-500': order.status === 'completed',
            'text-gray-500': !order.status
          }">{{ order.status ? order.status.toUpperCase() : 'UNDEFINED' }}</p>
          <button v-if="order.status === 'pending'" @click="updateOrderStatus(order.id, 'confirmed')" class="bg-blue-500 text-white px-4 py-2 rounded ml-4">Confirm</button>
          <button v-if="order.status === 'confirmed'" @click="updateOrderStatus(order.id, 'completed')" class="bg-green-500 text-white px-4 py-2 rounded ml-4">Complete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>
