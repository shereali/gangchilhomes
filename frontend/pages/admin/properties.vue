<template>
  <div class="admin-page animate-fade-in">
    <div class="flex justify-between items-center flex-wrap gap-4" style="margin-bottom: 24px;">
      <div>
        <h1 class="page-title">Property & Land Catalog (CRUD Engine)</h1>
        <p class="page-subtitle">Add, edit, delete, verify legal titles, and toggle live status of properties across Bangladesh.</p>
      </div>
      <button class="btn btn-emerald" @click="openAddPropertyModal">
        <span>+ Create New Property Mandate</span>
      </button>
    </div>

    <!-- Search, Filter & Bulk Actions Bar -->
    <div class="panel-card" style="padding:16px; margin-bottom:20px;">
      <div class="flex justify-between items-center flex-wrap gap-4">
        <div class="flex items-center gap-3 flex-wrap flex-1">
          <!-- Search Filter -->
          <label class="sr-only" for="inventory-search">Search property inventory</label>
          <input 
            id="inventory-search"
            v-model="inventorySearch" 
            type="text" 
            placeholder="Search by title, address, area..." 
            class="form-input" 
            style="max-width: 300px; background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" 
          />

          <!-- Category Filter -->
          <select v-model="inventoryTypeFilter" class="form-select" style="width: auto; background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);">
            <option value="">All Categories</option>
            <option value="Flat">Flats & Apartments</option>
            <option value="Plot">Residential Plots (Katha)</option>
            <option value="Land">Freehold Lands (Bigha)</option>
            <option value="Hotel">Hotel & Beach Resorts</option>
            <option value="Duplex">Duplexes & Penthouses</option>
          </select>

          <!-- Division Filter -->
          <select v-model="inventoryDivisionFilter" class="form-select" style="width: auto; background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);">
            <option value="">All Divisions</option>
            <option value="Dhaka North">Dhaka North</option>
            <option value="Dhaka South">Dhaka South</option>
            <option value="Chittagong">Chittagong & Cox's Bazar</option>
            <option value="Sylhet">Sylhet</option>
          </select>

          <!-- Status Filter -->
          <select v-model="inventoryStatusFilter" class="form-select" style="width: auto; background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);">
            <option value="">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Under Offer">Under Offer</option>
            <option value="Sold">Sold</option>
            <option value="Delisted">Delisted</option>
          </select>
        </div>

        <div class="flex items-center gap-2">
          <span style="font-size:0.85rem; color:#CBD5E1;">Showing {{ filteredProperties.length }} items</span>
        </div>
      </div>
    </div>

    <!-- Property Table -->
    <div class="panel-card" style="padding:0; overflow:hidden;">
      <div class="table-responsive">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Property & ID</th>
              <th>Category & Dimensions</th>
              <th>Price (BDT)</th>
              <th>Legal Due Diligence</th>
              <th>Featured</th>
              <th>Status</th>
              <th style="text-align:right;">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in filteredProperties" :key="prop.id">
              <td>
                <div class="flex items-center gap-3">
                  <img :src="prop.images[0]" class="table-thumb" />
                  <div>
                    <strong style="color:#FFF; display:block; max-width:260px; line-height:1.3;">{{ prop.title }}</strong>
                    <div style="font-size:0.78rem; color:#CBD5E1;">ID: #{{ prop.id }} • {{ prop.areaName }}, {{ prop.city }}</div>
                  </div>
                </div>
              </td>

              <td>
                <span class="badge badge-status">{{ prop.propertyType }}</span>
                <div style="font-size:0.8rem; color:#CBD5E1; margin-top:4px;">
                  {{ formatArea(prop.squareFootage, prop.landSize, prop.landUnit) }}
                </div>
              </td>

              <td style="font-family:var(--font-display); font-size:1.15rem; font-weight:800; color:#10B981;">
                {{ formatBDT(prop.price) }}
              </td>

              <td>
                <button 
                  class="badge" 
                  :class="prop.isRajukApproved ? 'badge-rajuk' : 'badge-status'"
                  style="cursor:pointer;"
                  @click="toggleRajukApproval(prop.id)"
                  title="Click to toggle RAJUK / CDA Approved status"
                >
                  {{ prop.isRajukApproved ? '✔ RAJUK Pass' : 'Pending Review' }}
                </button>
              </td>

              <td>
                <button 
                  class="star-toggle-btn" 
                  :class="{ active: prop.isFeatured }"
                  @click="toggleFeatured(prop.id)"
                  :title="prop.isFeatured ? 'Featured on Homepage' : 'Click to feature on Homepage'"
                >
                  ★
                </button>
              </td>

              <td>
                <select 
                  :value="prop.status" 
                  @change="changePropertyStatus(prop.id, $event)"
                  class="status-inline-select"
                >
                  <option value="Active">Active</option>
                  <option value="Under Offer">Under Offer</option>
                  <option value="Sold">Sold</option>
                  <option value="Delisted">Delisted</option>
                </select>
              </td>

              <td style="text-align:right;">
                <div class="flex justify-end gap-2">
                  <NuxtLink :to="`/properties/${prop.id}`" class="action-btn" target="_blank" title="Preview on live site" aria-label="Preview on live site">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </NuxtLink>
                  <button class="action-btn edit" @click="openEditPropertyModal(prop)" title="Edit details" aria-label="Edit details">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <path d="M17 3a2.83 2.83 0 0 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/>
                    </svg>
                  </button>
                  <button class="action-btn delete" @click="confirmDeleteProperty(prop.id)" title="Delete listing" aria-label="Delete listing">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                      <polyline points="3 6 5 6 21 6"/>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add/Edit Property Modal -->
    <div v-if="showPropModal" ref="propModalRoot" class="modal-overlay" @click.self="closePropModal">
      <div class="modal-card animate-fade-in-up" style="background:#0F172A; color:#FFF; border:1px solid rgba(255,255,255,0.1); max-width:800px;">
        <button class="modal-close-btn" @click="closePropModal" style="background:#1E293B; color:#FFF;" aria-label="Close property form">✕</button>

        <h3 style="font-size:1.6rem; font-weight:800; color:#FFF; margin-bottom:20px;">
          {{ editingPropId ? 'Edit Property Mandate #' + editingPropId : 'Create New Property Mandate' }}
        </h3>

        <form @submit.prevent="saveProperty">
          <div class="grid grid-2" style="gap:14px; margin-bottom:14px;">
            <div class="form-group">
              <label class="form-label" style="color:#CBD5E1;">Property Title</label>
              <input v-model="propForm.title" type="text" required placeholder="e.g. 5 Katha Corner Plot at Purbachal Sector 17" class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
            </div>
            <div class="form-group">
              <label class="form-label" style="color:#CBD5E1;">Property Category</label>
              <select v-model="propForm.propertyType" class="form-select" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);">
                <option value="Flat">Flat / Apartment</option>
                <option value="Plot">Residential Plot (Katha)</option>
                <option value="Land">Freehold Land (Bigha)</option>
                <option value="Hotel">Hotel & Beach Resort</option>
                <option value="Duplex">Duplex & Penthouse</option>
                <option value="Commercial">Corporate Office</option>
              </select>
            </div>
          </div>

          <div class="grid grid-3" style="gap:14px; margin-bottom:14px;">
            <div class="form-group">
              <label class="form-label" style="color:#CBD5E1;">Division</label>
              <select v-model="propForm.state" class="form-select" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);">
                <option value="Dhaka North">Dhaka North</option>
                <option value="Dhaka South">Dhaka South</option>
                <option value="Chittagong">Chittagong</option>
                <option value="Sylhet">Sylhet</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="color:#CBD5E1;">Area Name (Hub)</label>
              <input v-model="propForm.areaName" type="text" required class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
            </div>
            <div class="form-group">
              <label class="form-label" style="color:#CBD5E1;">Asking Price (BDT)</label>
              <input v-model.number="propForm.price" type="number" required class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
            </div>
          </div>

          <div class="grid grid-4" style="gap:12px; margin-bottom:14px;">
            <div class="form-group">
              <label class="form-label" style="color:#CBD5E1;">Sq. Footage</label>
              <input v-model.number="propForm.squareFootage" type="number" class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
            </div>
            <div class="form-group">
              <label class="form-label" style="color:#CBD5E1;">Land Size</label>
              <input v-model.number="propForm.landSize" type="number" step="0.5" class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
            </div>
            <div class="form-group">
              <label class="form-label" style="color:#CBD5E1;">Land Unit</label>
              <select v-model="propForm.landUnit" class="form-select" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);">
                <option value="Katha">Katha</option>
                <option value="Bigha">Bigha</option>
                <option value="Shotok">Shotok</option>
                <option value="Sqft">Sq. Ft.</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" style="color:#CBD5E1;">Beds / Baths</label>
              <div class="flex gap-2">
                <input v-model.number="propForm.bedrooms" type="number" placeholder="Beds" class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
                <input v-model.number="propForm.bathrooms" type="number" placeholder="Baths" class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-emerald btn-lg" style="width:100%;">
            <span>{{ editingPropId ? 'Save & Update Mandate' : 'Publish Property to Live Catalog' }}</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useProperties, type PropertyItem } from '~/composables/useProperties'
import { formatBDT, formatArea } from '~/composables/useCurrency'
import { useOverlayBehavior } from '~/composables/useOverlayBehavior'

definePageMeta({
  layout: 'admin'
})

const { properties, addProperty, deleteProperty } = useProperties()

const inventorySearch = ref('')
const inventoryTypeFilter = ref('')
const inventoryDivisionFilter = ref('')
const inventoryStatusFilter = ref('')

const showPropModal = ref(false)
const editingPropId = ref<number | null>(null)
const propModalRoot = ref<HTMLElement | null>(null)

const closePropModal = () => {
  showPropModal.value = false
}

useOverlayBehavior(showPropModal, closePropModal, propModalRoot)

const propForm = reactive({
  title: '',
  propertyType: 'Flat' as any,
  state: 'Dhaka North',
  areaName: 'Gulshan-2',
  address: 'Kemal Ataturk Avenue, Dhaka',
  price: 35000000,
  listingType: 'Sale' as const,
  bedrooms: 3,
  bathrooms: 3,
  squareFootage: 2400,
  landSize: 0,
  landUnit: 'Katha' as const,
  facing: 'South' as const,
  isRajukApproved: true,
  agentId: 1
})

const filteredProperties = computed(() => {
  return properties.value.filter(p => {
    if (inventoryTypeFilter.value && p.propertyType !== inventoryTypeFilter.value) return false
    if (inventoryDivisionFilter.value && p.state !== inventoryDivisionFilter.value) return false
    if (inventoryStatusFilter.value && p.status !== inventoryStatusFilter.value) return false
    if (inventorySearch.value) {
      const q = inventorySearch.value.toLowerCase()
      return p.title.toLowerCase().includes(q) || p.areaName.toLowerCase().includes(q) || p.address.toLowerCase().includes(q) || String(p.id).includes(q)
    }
    return true
  })
})

const openAddPropertyModal = () => {
  editingPropId.value = null
  propForm.title = ''
  propForm.price = 35000000
  showPropModal.value = true
}

const openEditPropertyModal = (p: PropertyItem) => {
  editingPropId.value = p.id
  propForm.title = p.title
  propForm.propertyType = p.propertyType as any
  propForm.state = p.state
  propForm.areaName = p.areaName
  propForm.price = p.price
  propForm.bedrooms = p.bedrooms
  propForm.bathrooms = p.bathrooms
  propForm.squareFootage = p.squareFootage || 2000
  propForm.landSize = p.landSize || 0
  propForm.landUnit = p.landUnit || 'Katha'
  propForm.isRajukApproved = p.isRajukApproved
  showPropModal.value = true
}

const saveProperty = () => {
  if (editingPropId.value) {
    const existing = properties.value.find(p => p.id === editingPropId.value)
    if (existing) {
      existing.title = propForm.title
      existing.propertyType = propForm.propertyType
      existing.state = propForm.state
      existing.areaName = propForm.areaName
      existing.price = propForm.price
      existing.bedrooms = propForm.bedrooms
      existing.bathrooms = propForm.bathrooms
      existing.squareFootage = propForm.squareFootage
      existing.landSize = propForm.landSize
      existing.landUnit = propForm.landUnit
      existing.isRajukApproved = propForm.isRajukApproved
    }
  } else {
    addProperty(propForm)
  }
  closePropModal()
}

const confirmDeleteProperty = (id: number) => {
  if (confirm(`Permanently delete property listing #${id}?`)) {
    deleteProperty(id)
  }
}

const toggleRajukApproval = (id: number) => {
  const p = properties.value.find(prop => prop.id === id)
  if (p) p.isRajukApproved = !p.isRajukApproved
}

const toggleFeatured = (id: number) => {
  const p = properties.value.find(prop => prop.id === id)
  if (p) p.isFeatured = !p.isFeatured
}

const changePropertyStatus = (id: number, event: Event) => {
  const target = event.target as HTMLSelectElement
  const p = properties.value.find(prop => prop.id === id)
  if (p) p.status = target.value as any
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

.table-thumb {
  width: 44px;
  height: 44px;
  border-radius: 8px;
  object-fit: cover;
}

.star-toggle-btn {
  background: none;
  border: none;
  font-size: 1.3rem;
  color: #475569;
  cursor: pointer;
  transition: color var(--transition-fast);
}

.star-toggle-btn.active {
  color: #F59E0B;
}

.status-inline-select {
  background: #1E293B;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 0.8rem;
}

.action-btn {
  width: 44px;
  height: 44px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.85rem;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.15);
}
</style>
