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
                            <td class="py-2 px-4 whitespace-nowrap">{{ new Intl.DateTimeFormat('en-UK', {
                            year:
                                '2-digit', month: 'numeric', day: 'numeric'
                        }).format(new Date(payment.date)) }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ payment.meetingNum }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ payment.payment }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ 0 - payment.attendance }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ 0 - payment.fine }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ 0 - payment.loanPayment }}</td>
                            <td class="py-2 px-4 whitespace-nowrap">{{ payment.saving }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        <!-- Summary Section -->
        <section v-if="summary" class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Summary</h2>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
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
                    <p>{{ summary.finesAccrued.toLocaleString('en-US', { style: 'currency', currency: 'KES' }) }}</p>
                </div>
                <div class="p-4 bg-gray-100 rounded">
                    <h3 class="font-semibold">Fines Paid</h3>
                    <p>{{ (summary.finesPaid).toLocaleString('en-US', { style: 'currency', currency: 'KES' }) }}</p>
                </div>
                <div class="p-4 bg-gray-100 rounded">
                    <h3 class="font-semibold">Outstanding Fines</h3>
                    <p>{{ summary.outstandingFines.toLocaleString('en-US', { style: 'currency', currency: 'KES' }) }}</p>
                </div>
            </div>
        </section>

        <!-- Loan Details Section -->
        <section class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Loan Details</h2>
            <div v-if="loanDetails" class="p-4 bg-gray-100 rounded">
                <p><strong>Loan Balance:</strong> {{ loanDetails.loanBal.toLocaleString('en-US', { style: 'currency', currency: 'KES' }) }}</p>
                <p><strong>Issue Date:</strong>{{ new Intl.DateTimeFormat('en-UK', {year:'2-digit', month: 'numeric', day: 'numeric'}).format(new Date(loanDetails.issueDate)) }}</p>
                <p><strong>Due Date:</strong>{{ new Intl.DateTimeFormat('en-UK', {year:'2-digit', month: 'numeric', day: 'numeric'}).format(new Date(loanDetails.dueDate)) }}</p>
                
                
            </div>
            <div v-else class="p-4 bg-gray-100 rounded">
                <p><strong>You have no loan details to show</strong></p>
            </div>
        </section>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useDataStore } from '@/stores/dataStore';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';

const dataStore = useDataStore();
const authStore = useAuthStore();
const payments = ref([]);
const summary = ref(null);
const loanDetails = ref(null);
const { user } = storeToRefs(useAuthStore());

onMounted(async () => {
    const paymentsColl = await dataStore.fetchCollection('Payments');
    const loansColl = await dataStore.fetchCollection("Loans")
    const memberId = user.value.memberId;

    /// Calculate Loan records

    const loanRecord = loansColl.reduce((latestObj, currentObj) => {
        // Check if the current object's name matches the person we're interested in
        if (currentObj.memberId === memberId) {
            // If there's no latestObj yet or the current date is later, update the latestObj
            if (!latestObj || new Date(currentObj.date) > new Date(latestObj.date)) {
                return currentObj;
            }
        }
        return latestObj;
    }, null);


    if (loanRecord) {

        const sumLoanTotal = loansColl.filter(u => u.memberId == memberId).reduce((prev, curr) => curr.loanTotal + prev, 0)
        
        const sumLoanPaid = paymentsColl.filter(u => u.memberId == memberId).reduce((sum, curr) =>{
            let current = curr.loanPayment || 0
            return sum += current
        }, 0)
        console.log(sumLoanPaid)

        const daysOverdue = new Date() - new Date(loanRecord.dueDate)
        let loanBal = sumLoanTotal - sumLoanPaid
        if (daysOverdue >= 90 && daysOverdue < 180) {
            loanBal = loanBal * 0.10
        } else if (daysOverdue >= 180 && daysOverdue < 270) {
            loanBal = loanBal * 0.15
        } else if (daysOverdue >= 180 && daysOverdue < 270) {
            loanBal = loanBal * 0.20
        }

        loanDetails.value = {
            loanBal: loanBal ,
            issueDate: loanRecord.date,
            dueDate: loanRecord.dueDate,
        }
    }

    // Calculate Payment summary

    payments.value = paymentsColl.filter(p => p.memberId === authStore.user.memberId);

    const meetingsCount = payments.value[0].meetingsCount;
    const missedAttendances = meetingsCount - payments.value.length;
    const finesPaid = (payments.value).reduce((acc, curr) => {
        let current = curr.fine || 0
        return acc + current
    }, 0);
    
    summary.value = {
        totalAttendances: payments.value.length,
        missedAttendances: missedAttendances,
        finesAccrued: missedAttendances * 50 ,
        finesPaid: (finesPaid) ,
        outstandingFines: missedAttendances * 50 - finesPaid 
    };
});
</script>

<style>
/* Custom styles if needed */
</style>
