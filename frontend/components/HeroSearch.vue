<template>
  <div class="search-box-wrapper animate-fade-in-up">
    <!-- Search Intent Tabs -->
    <div class="search-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        class="search-tab-btn"
        :class="{ active: activeTab === tab.id }"
        @click="selectTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Inputs Row -->
    <div class="search-inputs-grid">
      <!-- 1. Location / Keyword Search -->
      <div class="search-input-field">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
        <input 
          v-model="locationQuery"
          type="text" 
          placeholder="Location (e.g. Gulshan, Purbachal, Cox's Bazar...)" 
          @keyup.enter="handleSearch"
        />
      </div>

      <!-- 2. Property Type Selector -->
      <div class="search-input-field">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        </svg>
        <select v-model="selectedType">
          <option value="">All Property Types</option>
          <option value="Flat">Flat / Apartment</option>
          <option value="Plot">Residential Plot (Katha)</option>
          <option value="Land">Commercial / Agro Land (Bigha)</option>
          <option value="Hotel">Hotel & Beach Resort</option>
          <option value="Duplex">Luxury Duplex / Penthouse</option>
          <option value="Commercial">Commercial Office / Space</option>
        </select>
      </div>

      <!-- 3. Division / State Selector -->
      <div class="search-input-field">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="2" y1="12" x2="22" y2="12"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        </svg>
        <select v-model="selectedState">
          <option value="">All Divisions</option>
          <option value="Dhaka North">Dhaka North (Gulshan, Banani, Uttara)</option>
          <option value="Dhaka South">Dhaka South (Dhanmondi, Motijheel)</option>
          <option value="Chittagong">Chittagong & Cox's Bazar</option>
          <option value="Sylhet">Sylhet & Sreemangal</option>
        </select>
      </div>

      <!-- 4. Price Bracket (BDT) -->
      <div class="search-input-field">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" stroke-width="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
        <select v-model="selectedPriceMax">
          <option value="">Max Budget (BDT)</option>
          <option value="10000000">Up to ৳ 1.00 Crore</option>
          <option value="30000000">Up to ৳ 3.00 Crore</option>
          <option value="50000000">Up to ৳ 5.00 Crore</option>
          <option value="100000000">Up to ৳ 10.00 Crore</option>
          <option value="200000000">Above ৳ 10.00 Crore</option>
        </select>
      </div>

      <!-- Search CTA Button -->
      <button class="btn btn-emerald search-submit-btn" @click="handleSearch">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <span>Search</span>
      </button>
    </div>

    <!-- Quick Location Chips -->
    <div class="hero-quick-chips">
      <span class="chip-label">Trending Searches:</span>
      <button class="quick-chip" @click="quickSearch('Gulshan')">Gulshan Penthouses</button>
      <button class="quick-chip" @click="quickSearch('Purbachal')">Purbachal Sector 17 Plots</button>
      <button class="quick-chip" @click="quickSearch('Bashundhara')">Bashundhara Block M</button>
      <button class="quick-chip" @click="quickSearch('Marine Drive')">Cox's Bazar Hotel Suites</button>
      <button class="quick-chip" @click="quickSearch('Dhanmondi')">Dhanmondi Duplexes</button>
      <button class="quick-chip" @click="quickSearch('Sreemangal')">Sylhet Tea Resorts</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tabs = [
  { id: 'sale', label: 'Buy Properties' },
  { id: 'lease', label: 'Rent / Commercial Lease' },
  { id: 'plots', label: 'Lands & Plots (Katha/Bigha)' },
  { id: 'resorts', label: 'Hotels & Resorts' }
]

const activeTab = ref('sale')
const locationQuery = ref('')
const selectedType = ref('')
const selectedState = ref('')
const selectedPriceMax = ref('')

const selectTab = (tabId: string) => {
  activeTab.value = tabId
  if (tabId === 'plots') {
    selectedType.value = 'Plot'
  } else if (tabId === 'resorts') {
    selectedType.value = 'Hotel'
  } else {
    selectedType.value = ''
  }
}

const handleSearch = () => {
  const query: Record<string, string> = {}
  if (locationQuery.value) query.q = locationQuery.value
  if (selectedType.value) query.type = selectedType.value
  if (selectedState.value) query.state = selectedState.value
  if (selectedPriceMax.value) query.maxPrice = selectedPriceMax.value
  if (activeTab.value === 'lease') query.listingType = 'Lease'

  router.push({ path: '/properties', query })
}

const quickSearch = (term: string) => {
  locationQuery.value = term
  handleSearch()
}
</script>
