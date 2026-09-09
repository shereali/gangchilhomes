<template>
  <header class="app-header">
    <div class="container nav-container">
      <!-- 1. Brand Logo -->
      <NuxtLink to="/" class="brand-logo">
        <div class="brand-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
            <polyline points="9 22 9 12 15 12 15 22"/>
          </svg>
        </div>
        <div class="brand-text">
          <span class="brand-title">GANGCHIL<span style="color: #D4AF37;">.</span>HOMES</span>
          <span class="brand-subtitle">BANGLADESH REAL ESTATE</span>
        </div>
      </NuxtLink>

      <!-- 2. Desktop Navigation Menu (Visible > 1024px) -->
      <ul class="nav-links">
        <li><NuxtLink to="/" class="nav-link">Home</NuxtLink></li>
        <li><NuxtLink to="/properties" class="nav-link">Properties</NuxtLink></li>
        <li><NuxtLink to="/properties?type=Plot" class="nav-link">Plots & Lands</NuxtLink></li>
        <li><NuxtLink to="/properties?type=Hotel" class="nav-link">Resorts</NuxtLink></li>
        <li><NuxtLink to="/agents" class="nav-link">Agents</NuxtLink></li>
        <li><NuxtLink to="/compare" class="nav-link">Compare</NuxtLink></li>
      </ul>

      <!-- 3. Desktop Action Buttons -->
      <div class="nav-actions">
        <!-- Saved Wishlist Counter -->
        <NuxtLink to="/dashboard?tab=favorites" class="header-icon-btn" title="Saved Properties">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
          <span v-if="user.savedProperties.length > 0" class="icon-counter-badge">
            {{ user.savedProperties.length }}
          </span>
        </NuxtLink>

        <!-- Sign In (Desktop) -->
        <NuxtLink to="/login" class="btn btn-sm btn-outline-white desktop-only">
          <span>Sign In</span>
        </NuxtLink>

        <!-- List Property CTA (Desktop) -->
        <NuxtLink to="/list-property" class="btn btn-sm btn-gold desktop-cta">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <line x1="12" y1="5" x2="12" y2="19"/>
            <line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          <span>List Property</span>
        </NuxtLink>

        <!-- Mobile Hamburger Button -->
        <button class="mobile-hamburger-btn" @click="mobileMenuOpen = true" aria-label="Open Navigation Menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round">
            <line x1="3" y1="6" x2="21" y2="6"/>
            <line x1="3" y1="12" x2="21" y2="12"/>
            <line x1="3" y1="18" x2="21" y2="18"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- ======================================================================
         LUXURY MOBILE & TABLET DRAWER (SLIDE-IN)
         ====================================================================== -->
    <transition name="drawer-fade">
      <div v-if="mobileMenuOpen" ref="drawerRoot" class="mobile-drawer-overlay" @click.self="mobileMenuOpen = false">
        <div class="mobile-drawer-panel">
          <!-- Drawer Header -->
          <div class="drawer-header">
            <div class="flex items-center gap-2">
              <div class="brand-icon" style="width:34px; height:34px; font-size:1.1rem;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <span class="brand-title" style="font-size:1.15rem;">GANGCHIL<span style="color:#D4AF37;">.</span>HOMES</span>
            </div>
            <button class="drawer-close-btn" @click="mobileMenuOpen = false" aria-label="Close Menu">✕</button>
          </div>

          <!-- Drawer Navigation Links -->
          <nav class="drawer-nav">
            <NuxtLink to="/" class="drawer-link" @click="mobileMenuOpen = false">
              <svg class="drawer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
              <span>Home Overview</span>
            </NuxtLink>
            <NuxtLink to="/properties" class="drawer-link" @click="mobileMenuOpen = false">
              <svg class="drawer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>
              </svg>
              <span>All Properties & Flats</span>
            </NuxtLink>
            <NuxtLink to="/properties?type=Plot" class="drawer-link" @click="mobileMenuOpen = false">
              <svg class="drawer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M12 21s-6-5.2-6-10a6 6 0 0 1 12 0c0 4.8-6 10-6 10z"/>
                <circle cx="12" cy="11" r="2"/>
              </svg>
              <span>Plots & Freehold Lands</span>
            </NuxtLink>
            <NuxtLink to="/properties?type=Hotel" class="drawer-link" @click="mobileMenuOpen = false">
              <svg class="drawer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M22 17H2a1 1 0 0 1-1-1V5h2v8h6V8h8a6 6 0 0 1 6 6v2zM4 11h4M20 17v3M4 20v-3"/>
              </svg>
              <span>Beach Resorts & Suites</span>
            </NuxtLink>
            <NuxtLink to="/agents" class="drawer-link" @click="mobileMenuOpen = false">
              <svg class="drawer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>
              </svg>
              <span>Regional Senior Advisors</span>
            </NuxtLink>
            <NuxtLink to="/compare" class="drawer-link" @click="mobileMenuOpen = false">
              <svg class="drawer-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3M4 12h2M10 12h2M16 12h2"/>
              </svg>
              <span>Compare Properties</span>
            </NuxtLink>
          </nav>

          <!-- Drawer Action CTAs -->
          <div class="drawer-actions-footer">
            <NuxtLink to="/list-property" class="btn btn-gold btn-lg" style="width:100%; margin-bottom:10px;" @click="mobileMenuOpen = false">
              <span>+ List Property / Land</span>
            </NuxtLink>
            <NuxtLink to="/login" class="btn btn-outline-white" style="width:100%;" @click="mobileMenuOpen = false">
              <span>Sign In to Account</span>
            </NuxtLink>
            <div style="text-align:center; margin-top:16px;">
              <a href="tel:+8801819987654" style="color:#10B981; font-size:0.85rem; font-weight:700;">
                24/7 VIP Hotline: +880 1819-987654
              </a>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAuth } from '~/composables/useAuth'
import { useOverlayBehavior } from '~/composables/useOverlayBehavior'

const { user } = useAuth()
const mobileMenuOpen = ref(false)
const drawerRoot = ref<HTMLElement | null>(null)

useOverlayBehavior(mobileMenuOpen, () => { mobileMenuOpen.value = false }, drawerRoot)
</script>

<style scoped>
.mobile-hamburger-btn {
  display: none;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #FFFFFF;
  width: 42px;
  height: 42px;
  border-radius: var(--radius-sm);
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.mobile-hamburger-btn:hover {
  background: rgba(255, 255, 255, 0.18);
}

/* Breakpoint for Desktop vs Mobile Header */
@media (max-width: 1024px) {
  .nav-links {
    display: none !important;
  }
  .desktop-only {
    display: none !important;
  }
  .mobile-hamburger-btn {
    display: flex !important;
  }
}

@media (max-width: 640px) {
  .desktop-cta {
    display: none !important;
  }
  .brand-title {
    font-size: 1.15rem;
  }
  .brand-subtitle {
    font-size: 0.58rem;
  }
}

/* Mobile Drawer Styles */
.mobile-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.78);
  z-index: 3000;
  display: flex;
  justify-content: flex-end;
}

.mobile-drawer-panel {
  width: 320px;
  max-width: 85vw;
  height: 100%;
  background: #0A1128;
  border-left: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  padding: 24px;
  box-shadow: -15px 0 35px rgba(0, 0, 0, 0.6);
  overflow-y: auto;
}

.drawer-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 18px;
}

.drawer-close-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #FFFFFF;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.drawer-nav {
  display: flex;
  flex-direction: column;
  gap: 6px;
  flex: 1;
  margin-bottom: 24px;
}

.drawer-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  color: #CBD5E1;
  font-size: 0.92rem;
  font-weight: 600;
  border-radius: var(--radius-md);
  transition: all var(--transition-fast);
}

.drawer-link:hover, .drawer-link.router-link-active {
  background: rgba(255, 255, 255, 0.08);
  color: #FFFFFF;
}

.drawer-icon {
  flex-shrink: 0;
  color: var(--color-gold-bright);
}

.drawer-actions-footer {
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

/* Drawer Transitions */
.drawer-fade-enter-active, .drawer-fade-leave-active {
  transition: opacity 0.25s ease;
}
.drawer-fade-enter-from, .drawer-fade-leave-to {
  opacity: 0;
}
</style>
