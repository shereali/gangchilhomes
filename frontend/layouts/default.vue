<template>
  <div class="site-layout">
    <!-- Public Website Navigation Header -->
    <AppHeader />

    <!-- Main Website Viewport -->
    <main class="site-main-content">
      <slot />
    </main>

    <!-- Side-by-side Multi-Property Comparison Bottom Bar & Modal -->
    <ComparisonDrawer />

    <!-- Floating WhatsApp Pulse & VIP Instant Callback Hunter Widget -->
    <LeadHunterWidget />

    <!-- Luxury Footer -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '~/components/AppHeader.vue'
import AppFooter from '~/components/AppFooter.vue'
import ComparisonDrawer from '~/components/ComparisonDrawer.vue'
import LeadHunterWidget from '~/components/LeadHunterWidget.vue'
</script>

<style scoped>
.site-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.site-main-content {
  flex: 1;
  min-height: calc(100vh - 80px);
}
</style>
