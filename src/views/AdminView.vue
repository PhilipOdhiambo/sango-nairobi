<template>
  <div v-if="access" class="p-4 container bg-cyan-50">
      <h1 class="text-2xl font-bold text-cyan-600 mb-4">Members Summary</h1>
      <div v-for="(member, memberName) in summary" :key="memberName"
          class="mb-4 bg-white border shadow p-4 rounded-lg">
          <h2 class="text-lg font-semibold text-cyan-800">{{ memberName }}</h2>
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



</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useConstStore } from '../stores/consts'
import { useAuthStore } from '../stores/auth'
import { useRouter, useRoute } from 'vue-router'
import { useLoadingStore } from '../stores/loadingStore';

const router = useRouter()
const route = useRoute()

const access = ref()

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

const summary = ref();
const user = ref()

onMounted(async () => {
  const routeRoles = encodeURIComponent(JSON.stringify(route.meta.roles))
    const token = localStorage.getItem('user')
    const url = useConstStore().url
    useLoadingStore().startLoading()
    const res = await (await fetch(`${url}?route=admin&token=${token}&roles=${routeRoles}`)).json()
    if (!res.access) {
      useLoadingStore().stopLoading()
      return router.push('/')
    } else if (res.access == "forbidden") {
      useLoadingStore().stopLoading()
      return router.push('/forbidden')
    }
    useAuthStore().role = "admin"
    console.log( useAuthStore().role)
    access.value = res.access
    summary.value = summarizeData(res.data)
    useLoadingStore().stopLoading()
})



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
</script>

<style scoped>
.container {
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
</style>