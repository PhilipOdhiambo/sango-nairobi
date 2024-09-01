<template>
    <div v-if="access" class="max-w-4xl mx-auto p-4">

        <!-- Payment History Section -->
        <section class="mb-8">
            <h1 class="text-2xl font-bold text-cyan-600 mb-4">Record History</h1>
            <div class="overflow-x-auto">
                <table class="min-w-full bg-white border">
                    <thead class="bg-gray-200">
                        <tr>
                            <th class="py-2 px-4 text-left">Date</th>
                            <th class="py-2 px-4 text-left">Account</th>
                            <th class="py-2 px-4 text-left">Paid</th>
                            <th class="py-2 px-4 text-left">Pending</th>
                            <th class="py-2 px-4 text-left">Comment</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(record, index) in data" :key="record.Date + index" class="border-t">
                            <td class="py-2 px-4 whitespace-nowrap">{{ new Intl.DateTimeFormat('en-UK', {
        year:
            '2-digit', month: 'numeric', day: 'numeric'
    }).format(new Date(record.Date)) }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ record.Account }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ record.Paid }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ record.Pending }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ record.Comment }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Summary Section -->
        <div v-if="access" class="p-4 container bg-cyan-">
      <h2 class="text-xl font-bol text-cyan-600 mb-4">Account Summary</h2>
      <div v-for="(member, memberName) in summary" :key="memberName"
          class="mb-4 bg-white border shadow p-4 rounded-lg">
          <table class="w-full mt-2">
              <thead>
                  <tr class="bg-cyan-600 text-white">
                      <th class="p-2 text-left">Account</th>
                      <th class="p-2 text-left">Paid</th>
                      <th class="p-2 text-left">Pending</th>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for="(account, accountName) in member.accounts" :key="accountName" class="border-b">
                      <td class="p-2">{{ accountName }}</td>
                      <td class="p-2">{{ account.Paid }}</td>
                      <td class="p-2">{{ account.Pending }}</td>
                  </tr>
              </tbody>
          </table>
          <div class="p-4 mt-4  rounded-lg">
              <p class="  text-cyan-900">Available Balance</p>
              <p class="text-lg font-bod text-gray-600">{{ currency(member.availableBalance) }}</p>
          </div>
      </div>
  </div>


    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDataStore } from '@/stores/dataStore';
import { useAuthStore } from '@/stores/auth';
import { useLoadingStore } from '@/stores/loadingStore';
import { useConstStore } from '@/stores/consts'
import { useRouter, useRoute } from 'vue-router'
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const dataStore = useDataStore();
const authStore = useAuthStore();
const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const url = useConstStore().url
const payments = ref([]);
const summary = ref(null);
const loanDetails = ref(null);
const access = ref(null);
const data = ref(null)

// Calculate Payment summary
const summarizeData = (data) => {
    const summary = data.reduce((acc, entry) => {
        const { "Member Name": memberName, Account, Paid, Pending } = entry;

        if (!acc[memberName]) {
            acc[memberName] = {
                totalSavings: 0,
                totalPending: 0,
                availableBalance: 0,
                accounts: {}
            };
        }

        if (!acc[memberName].accounts[Account]) {
            acc[memberName].accounts[Account] = { Paid: 0, Pending: 0 };
        }

        acc[memberName].accounts[Account].Paid += Paid ? Number(Paid) : 0;
        acc[memberName].accounts[Account].Pending += Pending ? Number(Pending) : 0;

        if (Account === 'Members Savings') {
            acc[memberName].totalSavings += Paid ? Number(Paid) : 0;
        }

        acc[memberName].totalPending += Pending ? Number(Pending) : 0;

        // Calculate available balance
        acc[memberName].availableBalance = acc[memberName].totalSavings - acc[memberName].totalPending;

        return acc;
    }, {});

    return summary;
};

// Custom currency filter
const currency = (value) => {
  if (typeof value !== 'number') {
      return value;
  }
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'KES',
  }).format(value);
};

onMounted(async () => {
    const routeRoles = encodeURIComponent(JSON.stringify(route.meta.roles))
    const token = localStorage.getItem('user')
    useLoadingStore().startLoading()
    const res = await (await fetch(`${url}?route=profile&token=${token}&roles=${routeRoles}`)).json()
    if (!res.access) {
        useLoadingStore().stopLoading()
        return router.push('/')
    } else if (res.access == "forbidden") {
        useLoadingStore().stopLoading()
        return router.push('/forbidden')
    }
    useLoadingStore().stopLoading()
    
    data.value = res.data
    access.value = res.access
    summary.value = summarizeData(data.value)

    /// Calculate Loan records


});

</script>

<style>
/* Custom styles if needed */
</style>
