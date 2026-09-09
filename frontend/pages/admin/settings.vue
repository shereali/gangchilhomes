<template>
  <div class="admin-page animate-fade-in">
    <h1 class="page-title">System & Banking Partner Configuration</h1>
    <p class="page-subtitle">Configure Bangladeshi currency formatting rules, partner bank home loan interest rates, and WhatsApp notification numbers.</p>

    <div class="panel-card" style="margin-top:24px; max-width:720px;">
      <h3 class="panel-title" style="margin-bottom:16px;">Mortgage & Banking Rates (EMI Engine)</h3>
      
      <div class="grid grid-2" style="gap:16px; margin-bottom:16px;">
        <div class="form-group">
          <label class="form-label" style="color:#CBD5E1;">DBH Finance Benchmark Rate (%)</label>
          <input type="text" value="9.25%" class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
        </div>
        <div class="form-group">
          <label class="form-label" style="color:#CBD5E1;">IDLC Finance Benchmark Rate (%)</label>
          <input type="text" value="9.50%" class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
        </div>
      </div>

      <div class="grid grid-2" style="gap:16px; margin-bottom:20px;">
        <div class="form-group">
          <label class="form-label" style="color:#CBD5E1;">Primary WhatsApp Dispatch Number</label>
          <input type="text" value="+880 1819-987654" class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
        </div>
        <div class="form-group">
          <label class="form-label" style="color:#CBD5E1;">VIP Chauffeur Pickup Base</label>
          <input type="text" value="Gulshan-2 Diplomatic Enclave" class="form-input" style="background:#1E293B; color:#FFF; border-color:rgba(255,255,255,0.15);" />
        </div>
      </div>

      <button class="btn btn-emerald" @click="saveSettings">
        Save & Deploy System Changes
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'admin'
})

const saveSettings = () => {
  alert('System and banking partner configurations saved successfully!')
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

.panel-title {
  font-size: 1.2rem;
  font-weight: 800;
  color: #FFFFFF;
}
</style>
