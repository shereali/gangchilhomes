<template>
  <div class="admin-page animate-fade-in">
    <div class="flex justify-between items-start flex-wrap gap-4" style="margin-bottom: 24px;">
      <div>
        <h1 class="page-title">Executive Intelligence & KPI Analytics</h1>
        <p class="page-subtitle">Real-time asset valuation, regional capital allocation, and transaction pipeline across Bangladesh.</p>
      </div>
      <div class="flex gap-2">
        <button class="btn btn-sm btn-outline-white" @click="exportReport">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
          </svg>
          Export Audit Report
        </button>
        <NuxtLink to="/admin/properties" class="btn btn-sm btn-emerald">
          View Property Catalog →
        </NuxtLink>
      </div>
    </div>

    <!-- 4 Top KPI Metric Cards -->
    <div class="grid grid-4" style="margin-bottom: 28px;">
      <div class="kpi-card">
        <div class="kpi-label">Total Portfolio Asset Valuation</div>
        <div class="kpi-value text-emerald">৳ {{ totalPortfolioCrores }} Crore</div>
        <div class="kpi-sub">
          <span style="color:#10B981;">↑ +18.2%</span> vs last quarter across 4 divisions
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Active Property Mandates</div>
        <div class="kpi-value text-gold">{{ properties.length }} Assets</div>
        <div class="kpi-sub">
          {{ flatsCount }} Flats • {{ plotsCount }} Plots • {{ resortsCount }} Resorts
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">VIP Site Viewings Scheduled</div>
        <div class="kpi-value" style="color:#60A5FA;">{{ viewingsCount }} Inspections</div>
        <div class="kpi-sub">
          Gulshan, Purbachal & Inani Beach
        </div>
      </div>

      <div class="kpi-card">
        <div class="kpi-label">Active Leads & Inquiries</div>
        <div class="kpi-value" style="color:#F43F5E;">4 Leads</div>
        <div class="kpi-sub">
          Avg 14.5 min response time SLA
        </div>
      </div>
    </div>

    <!-- Regional Capital Allocation & Urgent Queue -->
    <div class="grid grid-2" style="margin-bottom: 28px;">
      <!-- Regional Allocation Breakdown -->
      <div class="panel-card">
        <h3 class="panel-title">Regional Capital Allocation (BDT)</h3>
        <p class="panel-sub">Asset distribution across prime Bangladeshi corridors</p>
        
        <div style="display:flex; flex-direction:column; gap:16px; margin-top:20px;">
          <div>
            <div class="flex justify-between" style="font-size:0.85rem; margin-bottom:6px;">
              <span><strong>Dhaka North</strong> (Gulshan, Banani, Purbachal New Town)</span>
              <span class="text-emerald"><strong>৳ 220.5 Cr (57%)</strong></span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: 57%; background: #10B981;"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between" style="font-size:0.85rem; margin-bottom:6px;">
              <span><strong>Dhaka South</strong> (Dhanmondi, Jalshiri, Keraniganj)</span>
              <span style="color:#3B82F6;"><strong>৳ 68.0 Cr (18%)</strong></span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: 18%; background: #3B82F6;"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between" style="font-size:0.85rem; margin-bottom:6px;">
              <span><strong>Chittagong & Cox's Bazar</strong> (Marine Drive Resorts)</span>
              <span class="text-gold"><strong>৳ 54.0 Cr (14%)</strong></span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: 14%; background: #D4AF37;"></div>
            </div>
          </div>

          <div>
            <div class="flex justify-between" style="font-size:0.85rem; margin-bottom:6px;">
              <span><strong>Sylhet Division</strong> (Sreemangal Tea Estates)</span>
              <span style="color:#EC4899;"><strong>৳ 42.9 Cr (11%)</strong></span>
            </div>
            <div class="progress-track">
              <div class="progress-fill" style="width: 11%; background: #EC4899;"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Urgent Review Queue -->
      <div class="panel-card">
        <div class="flex justify-between items-center" style="margin-bottom:14px;">
          <h3 class="panel-title">Urgent Review & Action Queue</h3>
          <NuxtLink to="/admin/approvals" class="btn btn-sm btn-outline-white">View Queue</NuxtLink>
        </div>

        <div style="display:flex; flex-direction:column; gap:12px;">
          <div class="action-queue-item">
            <div class="flex items-center gap-3">
              <span style="width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; color: #D4AF37;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="9" y1="13" x2="15" y2="13"/>
                </svg>
              </span>
              <div>
                <strong style="color:#FFF; font-size:0.92rem;">7.5 Katha Plot in Purbachal Sector 20</strong>
                <div style="font-size:0.78rem; color:#CBD5E1;">Seller: Kazi Rashed • Asking: ৳ 2.70 Cr • Allotment Uploaded</div>
              </div>
            </div>
            <NuxtLink to="/admin/approvals" class="btn btn-sm btn-gold">
              Verify
            </NuxtLink>
          </div>

          <div class="action-queue-item" style="border-left-color: #60A5FA;">
            <div class="flex items-center gap-3">
              <span style="width: 36px; height: 36px; border-radius: 8px; background: rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: center; color: #60A5FA;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                  <path d="M5 17h14M5 17l-2 4M19 17l2 4M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM5 17v-3a7 7 0 0 1 14 0v3"/>
                </svg>
              </span>
              <div>
                <strong style="color:#FFF; font-size:0.92rem;">VIP Chauffeur Pickup Assigned</strong>
                <div style="font-size:0.78rem; color:#CBD5E1;">Dr. Kabir Hossain • Airport to Purbachal Sector 17</div>
              </div>
            </div>
            <NuxtLink to="/admin/viewings" class="btn btn-sm btn-outline-white">
              Logistics
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Recently Added Property Mandates -->
    <div class="panel-card">
      <div class="flex justify-between items-center" style="margin-bottom: 16px;">
        <h3 class="panel-title">Recently Added Property Mandates</h3>
        <NuxtLink to="/admin/properties" class="btn btn-sm btn-outline-white">Full Inventory →</NuxtLink>
      </div>

      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Category</th>
              <th>Location</th>
              <th>Price (BDT)</th>
              <th>Verification</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="p in properties.slice(0, 4)" :key="p.id">
              <td>
                <strong style="color:#FFF;">{{ p.title }}</strong>
              </td>
              <td><span class="badge badge-status">{{ p.propertyType }}</span></td>
              <td style="color:#CBD5E1;">{{ p.areaName }}, {{ p.city }}</td>
              <td style="font-weight:800; color:#10B981;">{{ formatBDT(p.price) }}</td>
              <td>
                <span v-if="p.isRajukApproved" class="badge badge-rajuk">RAJUK Pass</span>
                <span v-else class="badge badge-status">Municipal</span>
              </td>
              <td>
                <span class="badge badge-status">{{ p.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProperties } from '~/composables/useProperties'
import { formatBDT } from '~/composables/useCurrency'

definePageMeta({
  layout: 'admin'
})

const { properties } = useProperties()

const totalPortfolioCrores = computed(() => {
  const totalBDT = properties.value.reduce((acc, p) => acc + p.price, 0)
  return (totalBDT / 10000000).toFixed(1)
})

const flatsCount = computed(() => properties.value.filter(p => p.propertyType === 'Flat' || p.propertyType === 'Penthouse' || p.propertyType === 'Duplex').length)
const plotsCount = computed(() => properties.value.filter(p => p.propertyType === 'Plot' || p.propertyType === 'Land').length)
const resortsCount = computed(() => properties.value.filter(p => p.propertyType === 'Hotel').length)
const viewingsCount = computed(() => 4)

const exportReport = () => {
  alert('Audit Report Generated! Asset valuation summary exported for Gangchil Board of Directors.')
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

.kpi-card {
  background: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-xl);
  padding: 22px;
  box-shadow: var(--shadow-sm);
}

.kpi-label {
  font-size: 0.78rem;
  color: #CBD5E1;
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.kpi-value {
  font-family: var(--font-ui);
  font-size: 1.8rem;
  font-weight: 800;
  margin: 6px 0;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
}

.kpi-sub {
  font-size: 0.8rem;
  color: #64748B;
}

.panel-card {
  background: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-xl);
  padding: 24px;
}

.panel-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #FFFFFF;
}

.panel-sub {
  font-size: 0.85rem;
  color: #CBD5E1;
  margin-top: 2px;
}

.progress-track {
  width: 100%;
  height: 8px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 4px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  border-radius: 4px;
}

.action-queue-item {
  background: rgba(255, 255, 255, 0.03);
  border-left: 3px solid #D4AF37;
  border-radius: var(--radius-md);
  padding: 14px 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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
</style>
