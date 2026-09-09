<template>
  <div class="admin-page animate-fade-in">
    <h1 class="page-title">Legal Due Diligence & RAJUK Clearance Queue</h1>
    <p class="page-subtitle">Audit uploaded municipal documents, land registry Khatians (CS, RS, BS), mutation receipts, and issue verification badges.</p>

    <div style="display:flex; flex-direction:column; gap:20px; margin-top:24px;">
      <div v-for="item in pendingApprovalItems" :key="item.id" class="panel-card" style="border-left: 4px solid #D4AF37;">
        <div class="flex justify-between items-start flex-wrap gap-4" style="margin-bottom:16px;">
          <div>
            <span class="badge badge-featured" style="margin-bottom:6px;">Awaiting Legal Vetting</span>
            <h3 style="font-size:1.35rem; font-weight:800; color:#FFF;">{{ item.title }}</h3>
            <div style="font-size:0.85rem; color:#CBD5E1;">Seller / Mandate Owner: <strong>{{ item.seller }}</strong> (Phone: {{ item.phone }})</div>
          </div>
          <div style="text-align:right;">
            <div style="font-family:var(--font-ui); font-size:1.5rem; font-weight:800; color:#10B981; font-variant-numeric:tabular-nums;">
              {{ formatBDT(item.price) }}
            </div>
            <div style="font-size:0.8rem; color:#CBD5E1;">{{ item.location }}</div>
          </div>
        </div>

        <!-- Document Checklist -->
        <div style="background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); border-radius:var(--radius-md); padding:16px; margin-bottom:20px;">
          <strong style="color:#FFF; font-size:0.9rem; display:block; margin-bottom:8px;">Uploaded Document Dossier:</strong>
          <div class="grid grid-3" style="gap:10px;">
            <div class="doc-attachment-pill">
              <span>📄</span>
              <span>RAJUK Allotment Letter.pdf</span>
            </div>
            <div class="doc-attachment-pill">
              <span>📄</span>
              <span>Mutation & Khajna Receipt.pdf</span>
            </div>
            <div class="doc-attachment-pill">
              <span>📄</span>
              <span>CS/RS/BS Khatian Record.pdf</span>
            </div>
          </div>
        </div>

        <div class="flex justify-between items-center flex-wrap gap-4">
          <div style="font-size:0.85rem; color:#10B981; font-weight:600;">
            ✔ 0 Encumbrance Guarantee Verified by Supreme Court Panel
          </div>
          <div class="flex gap-3">
            <button class="btn btn-sm btn-outline" style="color:#EF4444; border-color:rgba(239,68,68,0.4);" @click="rejectApproval(item.id)">
              Request Clarification / Reject
            </button>
            <button class="btn btn-sm btn-emerald" @click="approveListing(item.id)">
              ✔ Approve & Issue RAJUK Verified Badge
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useProperties } from '~/composables/useProperties'
import { formatBDT } from '~/composables/useCurrency'

definePageMeta({
  layout: 'admin'
})

const { addProperty } = useProperties()

const pendingApprovalItems = ref([
  {
    id: 901,
    title: '7.5 Katha Corner Plot in Purbachal Sector 20',
    seller: 'Kazi Rashedul Islam',
    phone: '+880 1712-445566',
    price: 27000000,
    location: 'Sector 20, Purbachal New Town'
  },
  {
    id: 902,
    title: 'Modern 3,200 Sqft Duplex Villa in Bashundhara Block-I',
    seller: 'Engr. Asadullah Chowdhury',
    phone: '+880 1819-334455',
    price: 39000000,
    location: 'Block I, Bashundhara R/A'
  }
])

const approveListing = async (id: number) => {
  const idx = pendingApprovalItems.value.findIndex(item => item.id === id)
  if (idx > -1) {
    const item = pendingApprovalItems.value[idx]
    pendingApprovalItems.value.splice(idx, 1)
    await addProperty({
      title: item.title,
      price: item.price,
      propertyType: 'Plot',
      state: 'Dhaka North',
      areaName: 'Purbachal',
      address: item.location,
      bedrooms: 0,
      bathrooms: 0,
      landSize: 7.5,
      landUnit: 'Katha',
      isRajukApproved: true
    })
    alert(`Title approved! RAJUK badge issued for ${item.title}`)
  }
}

const rejectApproval = (id: number) => {
  pendingApprovalItems.value = pendingApprovalItems.value.filter(item => item.id !== id)
  alert('Submission rejected and clarification dispatched to seller.')
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

.doc-attachment-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #1E293B;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 0.82rem;
  color: #CBD5E1;
}
</style>
