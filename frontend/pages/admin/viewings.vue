<template>
  <div class="admin-page animate-fade-in">
    <div class="flex justify-between items-center flex-wrap gap-4" style="margin-bottom: 24px;">
      <div>
        <h1 class="page-title">VIP Site Viewings & Inspection Logistics</h1>
        <p class="page-subtitle">Schedule, assign advisors, dispatch luxury vehicle pickups from Dhaka hubs, and update viewing statuses.</p>
      </div>
      <button class="btn btn-sm btn-gold" @click="openScheduleNewModal">+ Manual Booking</button>
    </div>

    <div class="panel-card" style="padding:0; overflow:hidden;">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Visitor & Contact</th>
              <th>Target Property</th>
              <th>Date & Slot</th>
              <th>VIP Pickup Request</th>
              <th>Assigned Specialist</th>
              <th>Status</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="v in viewingsList" :key="v.id">
              <td style="font-weight:800; color:#D4AF37;">#{{ v.id }}</td>
              <td>
                <strong style="color:#FFF;">{{ v.name }}</strong>
                <div style="font-size:0.78rem; color:#CBD5E1;">{{ v.phone }} • {{ v.contact }}</div>
              </td>
              <td style="color:#E2E8F0; font-weight:600;">{{ v.propertyTitle }}</td>
              <td>
                <div style="color:#FFF; font-weight:700;">{{ v.date }}</div>
                <div style="font-size:0.78rem; color:#CBD5E1;">{{ v.timeSlot }}</div>
              </td>
              <td>
                <span v-if="v.pickup" class="badge badge-featured">VIP Car Pickup</span>
                <span v-else style="color:#64748B; font-size:0.8rem;">Direct Arrival</span>
              </td>
              <td>
                <span style="color:#34D399; font-weight:600; font-size:0.88rem;">{{ v.assignedAgent }}</span>
              </td>
              <td>
                <select :value="v.status" @change="updateViewingStatus(v.id, $event)" class="status-inline-select">
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="In-Progress">In-Progress</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td style="text-align:right;">
                <a :href="`https://wa.me/${v.phone.replace(/[^0-9]/g, '')}`" target="_blank" class="btn btn-sm btn-emerald" style="background:#25D366; font-size:0.75rem; padding:4px 8px;">
                  WhatsApp
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

const viewingsList = ref([
  { id: 101, name: 'Shere Ali', phone: '+880 1711-234567', contact: 'WhatsApp', propertyTitle: 'Lakeview Penthouse at Gulshan-2', date: '2026-09-05', timeSlot: '03:00 PM - 04:00 PM', pickup: true, assignedAgent: 'Tanvir Ahmed', status: 'Confirmed' },
  { id: 102, name: 'Dr. Kabir Hossain (NRB Canada)', phone: '+1 416-555-0199', contact: 'Phone', propertyTitle: '10 Katha Corner Plot in Purbachal Sector 17', date: '2026-09-08', timeSlot: '11:30 AM - 01:00 PM', pickup: true, assignedAgent: 'Tanvir Ahmed', status: 'Confirmed' },
  { id: 103, name: 'Mrs. Tahmina Begum', phone: '+880 1819-332211', contact: 'WhatsApp', propertyTitle: 'South-Facing Duplex in Dhanmondi 8/A', date: '2026-09-10', timeSlot: '04:00 PM - 05:30 PM', pickup: false, assignedAgent: 'Tanvir Ahmed', status: 'In-Progress' },
  { id: 104, name: 'Syed Tanzeem (UAE)', phone: '+971 50 1234567', contact: 'WhatsApp', propertyTitle: 'Marine Drive Cox\'s Bazar Sea Suite', date: '2026-09-12', timeSlot: '02:30 PM - 04:00 PM', pickup: true, assignedAgent: 'Nusrat Jahan', status: 'Confirmed' }
])

const updateViewingStatus = (id: number, event: Event) => {
  const target = event.target as HTMLSelectElement
  const v = viewingsList.value.find(item => item.id === id)
  if (v) v.status = target.value
}

const openScheduleNewModal = () => {
  const name = prompt('Visitor Name:')
  if (name) {
    viewingsList.value.unshift({
      id: Date.now() % 100000,
      name,
      phone: '+880 1711-000000',
      contact: 'WhatsApp',
      propertyTitle: 'Lakeview Penthouse at Gulshan-2',
      date: '2026-09-15',
      timeSlot: '02:30 PM - 04:00 PM',
      pickup: true,
      assignedAgent: 'Tanvir Ahmed',
      status: 'Confirmed'
    })
  }
}
</script>

<style scoped>
.page-title {
  font-size: 1.85rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.2;
}

.page-subtitle {
  color: #CBD5E1;
  font-size: 0.95rem;
  margin-top: 4px;
}

.panel-card {
  background: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-xl);
  padding: 24px;
}

.table-responsive {
  overflow-x: auto;
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 780px;
}

.admin-table th {
  padding: 14px 16px;
  text-align: left;
  background: rgba(255, 255, 255, 0.02);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  font-size: 0.78rem;
  color: #CBD5E1;
  text-transform: uppercase;
  font-weight: 700;
}

.admin-table td {
  padding: 14px 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.04);
  font-size: 0.88rem;
  vertical-align: middle;
}

.status-inline-select {
  background: #1E293B;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
}
</style>
