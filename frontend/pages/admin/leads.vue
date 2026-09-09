<template>
  <div class="admin-page animate-fade-in">
    <h1 class="page-title">Lead Hunter CRM & Dispatch Inbox</h1>
    <p class="page-subtitle">High-intent buyer leads captured from WhatsApp pulse, 15-minute callback modals, and listing inquiry forms.</p>

    <div style="display:flex; flex-direction:column; gap:14px; margin-top:24px;">
      <div v-for="lead in leadsList" :key="lead.id" class="panel-card">
        <div class="flex justify-between items-start flex-wrap gap-4" style="margin-bottom:12px;">
          <div>
            <div class="flex items-center gap-2">
              <strong style="color:#FFF; font-size:1.15rem;">{{ lead.name }}</strong>
              <span class="badge badge-featured">{{ lead.type }}</span>
              <span class="badge badge-status">Captured {{ lead.date }}</span>
            </div>
            <div style="font-size:0.88rem; color:#CBD5E1; margin-top:2px;">
              Target Property: <strong style="color:#10B981;">{{ lead.property }}</strong>
            </div>
          </div>
          <div class="flex gap-2">
            <a :href="`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}`" target="_blank" class="btn btn-sm btn-emerald" style="background:#25D366;">
              Launch WhatsApp Chat
            </a>
            <a :href="`tel:${lead.phone}`" class="btn btn-sm btn-outline-white">
              Direct Phone Call
            </a>
          </div>
        </div>

        <div style="background:rgba(255,255,255,0.02); padding:12px 16px; border-radius:var(--radius-md); font-size:0.88rem; color:#CBD5E1;">
          "{{ lead.message }}"
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'admin'
})

const leadsList = ref([
  { id: 1, name: 'Dr. Farhan Chowdhury', phone: '+44 7911 123456', property: 'Lakeview Penthouse at Gulshan-2', type: 'NRB Investor (UK)', message: 'Interested in title verification deeds and bank escrow transfer options.', date: 'Today 09:15 AM' },
  { id: 2, name: 'Engr. Mahfuzur Rahman', phone: '+880 1711-998877', property: '10 Katha Plot in Purbachal Sector 17', type: 'Direct Buyer', message: 'Want to inspect boundary pillars this Friday afternoon with my architect.', date: 'Yesterday' },
  { id: 3, name: 'Syed Tanzeem', phone: '+971 50 1234567', property: 'Marine Drive Cox\'s Bazar Sea Suite', type: 'Hospitality ROI', message: 'Interested in buying 2 fractional suite units with 14% annual guaranteed yield.', date: '2 days ago' },
  { id: 4, name: 'Advocate Munirul Islam', phone: '+880 1819-556677', property: 'South-Facing Duplex in Dhanmondi 8/A', type: 'Family Residence', message: 'Looking for RAJUK 14-storey structural clearance certificate copy.', date: '3 days ago' }
])
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
</style>
