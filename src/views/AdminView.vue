

<template>
    <div class="min-h-screen bg-gray-100 p-6">
      <h1 class="text-3xl font-bold text-center mb-8 text-cyan-600">You Are Admin</h1>
      
      <!-- User Selection -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-cyan-600 mb-4">Select User</h2>
        <select v-model="selectedUser" class="w-full p-3 border rounded">
          <option v-for="user in users" :key="user.id" :value="user">
            {{ user.name }} ({{ user.role }})
          </option>
        </select>
      </section>
  
      <!-- User Details -->
      <section v-if="selectedUser" class="mb-8">
        <h2 class="text-xl font-semibold text-cyan-600 mb-4">User Details</h2>
        <div class="bg-white p-4 rounded-lg shadow-lg">
          <p><strong>Name:</strong> {{ selectedUser.name }}</p>
          <p><strong>Role:</strong> {{ selectedUser.role }}</p>
          <p><strong>Status:</strong> {{ selectedUser.isActive ? 'Active' : 'Inactive' }}</p>
        </div>
      </section>
  
      <!-- Payment Details -->
      <section v-if="selectedUser" class="mb-8">
        <h2 class="text-xl font-semibold text-cyan-600 mb-4">Payment Details</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white border">
            <thead class="bg-gray-200">
              <tr>
                <th class="py-2 px-4 text-left">Date</th>
                <th class="py-2 px-4 text-left">Venue</th>
                <th class="py-2 px-4 text-left">Meeting #</th>
                <th class="py-2 px-4 text-left">Attendance Fee</th>
                <th class="py-2 px-4 text-left">Fines</th>
                <th class="py-2 px-4 text-left">Loan Payment</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="payment in selectedUser.payments" :key="payment.id" class="border-t">
                <td class="py-2 px-4 whitespace-nowrap">{{ payment.date }}</td>
                <td class="py-2 px-4 whitespace-nowrap">{{ payment.venue }}</td>
                <td class="py-2 px-4 whitespace-nowrap">{{ payment.meetingNumber }}</td>
                <td class="py-2 px-4 whitespace-nowrap">{{ payment.attendanceFee }}</td>
                <td class="py-2 px-4 whitespace-nowrap">{{ payment.fines }}</td>
                <td class="py-2 px-4 whitespace-nowrap">{{ payment.loanPayment }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
  
      <!-- Summary -->
      <section v-if="selectedUser" class="mb-8">
        <h2 class="text-xl font-semibold text-cyan-600 mb-4">Summary</h2>
        <div class="grid grid-cols-2 gap-4">
          <div class="p-4 bg-gray-100 rounded">
            <h3 class="font-semibold">Total Attendances</h3>
            <p>{{ selectedUser.summary.totalAttendances }}</p>
          </div>
          <div class="p-4 bg-gray-100 rounded">
            <h3 class="font-semibold">Missed Attendances</h3>
            <p>{{ selectedUser.summary.missedAttendances }}</p>
          </div>
          <div class="p-4 bg-gray-100 rounded">
            <h3 class="font-semibold">Fines Accrued</h3>
            <p>{{ selectedUser.summary.finesAccrued }}</p>
          </div>
          <div class="p-4 bg-gray-100 rounded">
            <h3 class="font-semibold">Fines Paid</h3>
            <p>{{ selectedUser.summary.finesPaid }}</p>
          </div>
          <div class="p-4 bg-gray-100 rounded">
            <h3 class="font-semibold">Outstanding Fines</h3>
            <p>{{ selectedUser.summary.outstandingFines }}</p>
          </div>
        </div>
      </section>
  
      <!-- Loan Details -->
      <!-- v-if="selectedUser.loanDetails" -->
      <section v-if="true" class="mb-8">
        <h2 class="text-xl font-semibold text-cyan-600 mb-4">Loan Details</h2>
        <div class="p-4 bg-gray-100 rounded">
          <p><strong>Loan Amount:</strong> selectedUser.loanDetails.amount </p>
          <p><strong>Outstanding Balance:</strong> selectedUser.loanDetails.balance </p>
          <p><strong>Next Payment Date:</strong>  selectedUser.loanDetails.nextPaymentDate </p>
        </div>
      </section>
  
      <!-- Admin Actions -->
      <section class="mb-8">
        <h2 class="text-xl font-semibold text-cyan-600 mb-4">Admin Actions</h2>
        <div class="flex flex-col md:flex-row md:space-x-4">
          <button @click="addMember" class="bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700 mb-2 md:mb-0">
            Add New Member
          </button>
          <!-- :disabled="selectedUser.role === 'Admin'" -->
          <button @click="removeMember"  class="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 mb-2 md:mb-0">
            Inactivate/Remove Member
          </button>
          <button @click="removeSelf" class="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700">
            Remove My Account
          </button>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const users = ref([
    {
      id: 1,
      name: 'John Doe',
      role: 'Admin',
      isActive: true,
      payments: [
        { id: 1, date: '2024-08-10', venue: 'Community Hall', meetingNumber: 5, attendanceFee: '500 KES', fines: '100 KES', loanPayment: '2000 KES' },
      ],
      summary: {
        totalAttendances: 10,
        missedAttendances: 2,
        finesAccrued: '200 KES',
        finesPaid: '150 KES',
        outstandingFines: '50 KES'
      },
      loanDetails: {
        amount: '10,000 KES',
        balance: '4,000 KES',
        nextPaymentDate: '2024-09-01'
      }
    },
    {
      id: 2,
      name: 'Jane Smith',
      role: 'Member',
      isActive: true,
      payments: [
        { id: 1, date: '2024-08-17', venue: 'Church Hall', meetingNumber: 6, attendanceFee: '500 KES', fines: '0 KES', loanPayment: '2000 KES' },
      ],
      summary: {
        totalAttendances: 8,
        missedAttendances: 1,
        finesAccrued: '50 KES',
        finesPaid: '50 KES',
        outstandingFines: '0 KES'
      },
      loanDetails: {
        amount: '15,000 KES',
        balance: '5,000 KES',
        nextPaymentDate: '2024-09-05'
      }
    }
  ]);
  
  const selectedUser = ref(null);
  
  const addMember = () => {
    console.log('Add new member logic');
  };
  
  const removeMember = () => {
    if (selectedUser.value.role !== 'Admin') {
      console.log('Inactivate/Remove member logic');
    }
  };
  
  const removeSelf = () => {
    console.log('Remove my account logic');
  };
  </script>
  
  <style>
  /* Additional custom styles can be added if necessary */
  </style>
  