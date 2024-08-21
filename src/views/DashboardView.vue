<template>
    <div class="max-w-4xl mx-auto p-4">
       
      


        <!-- Payment History Section -->
        <section class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Payment History</h2>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="py-2 px-4 text-left">Date</th>
                            <th class="py-2 px-4 text-left">Meeting #</th>
                            <th class="py-2 px-4 text-left">Payment</th>
                            <th class="py-2 px-4 text-left">Attendance</th>
                            <th class="py-2 px-4 text-left">Fines</th>
                            <th class="py-2 px-4 text-left">Loan</th>
                            <th class="py-2 px-4 text-left">Saving</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="payment in payments" :key="payment.id" class="border-t">
                            <td class="py-2 px-4">{{ new
                            Intl.DateTimeFormat('en-UK', {
                                year: '2-digit', month: 'numeric', day: 'numeric'
                            }).format(new
                                Date(payment.date)) }}</td>
                            <td class="py-2 px-4">{{ payment.meetingNum }}</td>
                            <td class="py-2 px-4">{{ payment.payment }}</td>
                            <td class="py-2 px-4">{{ 0 - payment.attendance }}</td>
                            <td class="py-2 px-4">{{ 0 - payment.fine }}</td>
                            <td class="py-2 px-4">{{ 0 - payment.loanPayment }}</td>
                            <td class="py-2 px-4">{{ payment.saving }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Summary Section -->
        <section class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Summary</h2>
            <div class="grid grid-cols-2 gap-4">
                <div class="p-4 bg-gray-100 rounded">
                    <h3 class="font-semibold">Total Attendances</h3>
                    <p>{{ summary.totalAttendances }}</p>
                </div>
                <div class="p-4 bg-gray-100 rounded">
                    <h3 class="font-semibold">Missed Attendances</h3>
                    <p>{{ summary.missedAttendances }}</p>
                </div>
                <div class="p-4 bg-gray-100 rounded">
                    <h3 class="font-semibold">Fines Accrued</h3>
                    <p>{{ summary.finesAccrued }}</p>
                </div>
                <div class="p-4 bg-gray-100 rounded">
                    <h3 class="font-semibold">Fines Paid</h3>
                    <p>{{ summary.finesPaid }}</p>
                </div>
                <div class="p-4 bg-gray-100 rounded">
                    <h3 class="font-semibold">Outstanding Fines</h3>
                    <p>{{ summary.outstandingFines }}</p>
                </div>
            </div>
        </section>

        <!-- Loan Details Section -->
        <section v-if="loanDetails" class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Loan Details</h2>
            <div class="p-4 bg-gray-100 rounded">
                <p><strong>Loan Amount:</strong> {{ loanDetails.amount }}</p>
                <p><strong>Outstanding Balance:</strong> {{ loanDetails.balance }}</p>
                <p><strong>Next Payment Date:</strong> {{ loanDetails.nextPaymentDate }}</p>
            </div>
        </section>

        <!-- Change Password Section -->
        <!-- <section class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Change Password</h2>
            <form @submit.prevent="changePassword">
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="currentPassword">Current Password</label>
                    <input type="password" id="currentPassword" v-model="currentPassword"
                        class="w-full p-2 border rounded">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="newPassword">New Password</label>
                    <input type="password" id="newPassword" v-model="newPassword" class="w-full p-2 border rounded">
                </div>
                <div class="mb-4">
                    <label class="block text-sm font-medium mb-1" for="confirmPassword">Confirm New Password</label>
                    <input type="password" id="confirmPassword" v-model="confirmPassword"
                        class="w-full p-2 border rounded">
                </div>
                <button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Change
                    Password</button>
            </form>
        </section> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDataStore } from '@/stores/dataStore';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue'
import Navigation from '../components/Navigation.vue'

const dataStore = useDataStore()
const authStore = useAuthStore()

// Add more payment history entries as needed
const payments = ref([]);

const summary = ref({
  totalAttendances: 10,
  missedAttendances: 2,
  finesAccrued: '200 KES',
  finesPaid: '150 KES',
  outstandingFines: '50 KES'
});

const loanDetails = ref({
  amount: '10,000 KES',
  balance: '4,000 KES',
  nextPaymentDate: '2024-09-01'
});

const currentPassword = ref('');
const newPassword = ref('');
const confirmPassword = ref('');

const changePassword = () => {
  // Logic to handle password change
  console.log('Password changed:', currentPassword.value, newPassword.value, confirmPassword.value);
};



onMounted(async () => {
  const paymentsColl = await dataStore.fetchCollection("Payments")

  payments.value = paymentsColl.filter((p) => p.memberId == authStore.user.memberId)

  const meetingsCount = payments.value[0].meetingsCount
  const missedAttendances = meetingsCount - payments.value.length
  const  finesPaid = payments.value.reduce((prev,curr)=>curr.fine + prev,0)

  summary.value = {
  totalAttendances: payments.value.length,
  missedAttendances: missedAttendances,
  finesAccrued: (missedAttendances * 50) + ' KES',
  finesPaid: finesPaid +  ' KES',
  outstandingFines: (missedAttendances * 50 - finesPaid) +' KES'
}
  
})
</script>

<style>
/* Add custom styles if needed */
</style>