<template>
  <div class="admin-shell">
    <!-- Admin Top Header -->
    <header class="admin-topbar">
      <div class="admin-topbar-inner">
        <div class="flex items-center gap-4">
          <NuxtLink to="/admin" class="admin-brand">
            <div class="admin-brand-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <div class="admin-brand-text">
              <span class="admin-brand-name">GANGCHIL<span style="color:#D4AF37;">.</span>ADMIN</span>
              <span class="admin-brand-sub">ENTERPRISE PROPERTY & CRM CONTROL</span>
            </div>
          </NuxtLink>

          <div class="system-status-indicator">
            <span class="status-dot"></span>
            <span>LARAVEL 13 API SYNCED</span>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <!-- Live Website Link -->
          <NuxtLink to="/" class="btn btn-sm btn-outline-white" title="Return to Public Facing Website">
            <span>View Live Website ↗</span>
          </NuxtLink>

          <!-- Quick Add Property Shortcut -->
          <NuxtLink to="/admin/properties?action=new" class="btn btn-sm btn-gold">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            <span>Add Property</span>
          </NuxtLink>

          <!-- Admin Avatar Pill -->
          <div class="admin-user-pill">
            <img :src="user.avatar" class="admin-user-avatar" />
            <div class="admin-user-info">
              <span class="admin-user-name">{{ user.name }}</span>
              <span class="admin-user-role">{{ user.role.toUpperCase() }}</span>
            </div>
          </div>

          <!-- Logout Button -->
          <button class="btn btn-sm btn-outline" style="color: #EF4444; border-color: rgba(239,68,68,0.4);" @click="handleLogout" title="Sign out of Admin Portal">
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>

    <!-- Admin Workspace Grid -->
    <div class="admin-workspace-container">
      <div class="admin-workspace-grid">
        <!-- 1. Dedicated Admin Sidebar -->
        <aside class="admin-sidebar">
          <div class="sidebar-section-title">Navigation Hub</div>
          <nav class="sidebar-nav">
            <NuxtLink to="/admin" class="sidebar-link" exact-active-class="active">
              <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="3" width="7" height="9" rx="1"/>
                <rect x="14" y="3" width="7" height="5" rx="1"/>
                <rect x="14" y="12" width="7" height="9" rx="1"/>
                <rect x="3" y="16" width="7" height="5" rx="1"/>
              </svg>
              <span>Overview & Analytics</span>
            </NuxtLink>

            <NuxtLink to="/admin/properties" class="sidebar-link" active-class="active">
              <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6"/>
              </svg>
              <span>Property Inventory</span>
              <span class="badge badge-status" style="margin-left:auto; font-size:0.7rem;">CRUD</span>
            </NuxtLink>

            <NuxtLink to="/admin/approvals" class="sidebar-link" active-class="active">
              <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M9 12l2 2 4-4"/>
                <path d="M12 3l7 4v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V7l7-4z"/>
              </svg>
              <span>RAJUK / Legal Queue</span>
              <span class="badge badge-urgent" style="margin-left:auto; font-size:0.7rem;">2 Pending</span>
            </NuxtLink>

            <NuxtLink to="/admin/viewings" class="sidebar-link" active-class="active">
              <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
              <span>VIP Viewings Log</span>
              <span class="badge badge-rajuk" style="margin-left:auto; font-size:0.7rem;">4 Tours</span>
            </NuxtLink>

            <NuxtLink to="/admin/agents" class="sidebar-link" active-class="active">
              <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="8" r="4"/>
                <path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>
              </svg>
              <span>Advisors & Brokers</span>
            </NuxtLink>

            <NuxtLink to="/admin/users" class="sidebar-link" active-class="active">
              <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span>Users & RBAC Control</span>
            </NuxtLink>

            <NuxtLink to="/admin/leads" class="sidebar-link" active-class="active">
              <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <path d="M22 12h-6l-2 3h-4l-2-3H2"/>
                <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>
              </svg>
              <span>Leads CRM & WhatsApp</span>
              <span class="badge badge-featured" style="margin-left:auto; font-size:0.7rem;">4 Leads</span>
            </NuxtLink>

            <NuxtLink to="/admin/financials" class="sidebar-link" active-class="active">
              <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <line x1="12" y1="1" x2="12" y2="23"/>
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
              </svg>
              <span>Financials & Escrow</span>
            </NuxtLink>

            <NuxtLink to="/admin/settings" class="sidebar-link" active-class="active">
              <svg class="sidebar-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <circle cx="12" cy="12" r="3"/>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
              </svg>
              <span>System & Bank Config</span>
            </NuxtLink>
          </nav>

          <!-- System Info Box in Sidebar -->
          <div class="sidebar-system-card">
            <div class="flex justify-between items-center" style="margin-bottom:6px;">
              <span style="font-size:0.75rem; color:#CBD5E1; font-weight:700; text-transform:uppercase;">Escrow Security</span>
              <span style="font-size:0.75rem; color:#10B981; font-weight:800;">100% Guaranteed</span>
            </div>
            <div style="font-size:0.8rem; color:#E2E8F0; line-height:1.4;">
              Zero Title Disputes. All C/S, R/S, B/S Khatians certified by Supreme Court Panel.
            </div>
          </div>
        </aside>

        <!-- 2. Main Admin Viewport -->
        <main class="admin-viewport">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuth } from '~/composables/useAuth'

const router = useRouter()
const { user, logout } = useAuth()

const handleLogout = async () => {
  await logout()
  router.push('/login')
}
</script>

<style scoped>
.admin-shell {
  background-color: #0B1120;
  min-height: 100vh;
  font-family: var(--font-sans);
  color: #E2E8F0;
}

.admin-topbar {
  background: #0F172A;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}

.admin-topbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1440px;
  margin: 0 auto;
  padding: 16px 24px;
  flex-wrap: wrap;
  gap: 16px;
}

.admin-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
}

.admin-brand-icon {
  width: 40px;
  height: 40px;
  background: var(--color-gold);
  border-radius: 10px;
  color: #0A1128;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-brand-name {
  font-family: var(--font-display);
  font-size: 1.3rem;
  font-weight: 800;
  color: #FFFFFF;
  line-height: 1.1;
  display: block;
}

.admin-brand-sub {
  font-size: 0.72rem;
  color: var(--color-gold);
  font-weight: 700;
  letter-spacing: 0.14em;
  display: block;
}

.system-status-indicator {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(16, 185, 129, 0.12);
  border: 1px solid rgba(16, 185, 129, 0.25);
  color: #10B981;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 700;
}

.status-dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #10B981;
  box-shadow: 0 0 8px #10B981;
}

.admin-user-pill {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 4px 12px 4px 6px;
  border-radius: var(--radius-full);
}

.admin-user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid var(--color-gold);
}

.admin-user-name {
  font-size: 0.82rem;
  font-weight: 700;
  color: #FFFFFF;
  display: block;
  line-height: 1.2;
}

.admin-user-role {
  font-size: 0.72rem;
  color: #CBD5E1;
  display: block;
}

.admin-workspace-container {
  max-width: 1440px;
  margin: 0 auto;
  padding: 24px;
}

.admin-workspace-grid {
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 24px;
}

.admin-sidebar {
  background: #0F172A;
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: var(--radius-xl);
  padding: 20px;
  height: fit-content;
}

.sidebar-section-title {
  font-size: 0.72rem;
  color: #64748B;
  text-transform: uppercase;
  font-weight: 800;
  letter-spacing: 0.08em;
  margin-bottom: 12px;
  padding-left: 8px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sidebar-link {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 11px 14px;
  background: transparent;
  color: #CBD5E1;
  border-radius: var(--radius-md);
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition-fast);
  text-decoration: none;
  width: 100%;
}

.sidebar-link:hover {
  background: rgba(255, 255, 255, 0.04);
  color: #FFFFFF;
}

.sidebar-link.active {
  background: var(--color-emerald);
  color: #FFFFFF;
  font-weight: 700;
  box-shadow: 0 4px 14px rgba(5, 150, 105, 0.35);
}

.sidebar-icon {
  flex-shrink: 0;
  color: var(--color-gold-bright);
}

.sidebar-system-card {
  margin-top: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px dashed rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-lg);
}

.admin-viewport {
  min-width: 0;
}

@media (max-width: 1024px) {
  .admin-workspace-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .sidebar-nav {
    flex-direction: row;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom: 8px;
  }
  .sidebar-link {
    white-space: nowrap;
    flex-shrink: 0;
    width: auto;
  }
  .sidebar-system-card {
    display: none;
  }
}

@media (max-width: 640px) {
  .admin-topbar-inner {
    padding: 12px 16px;
  }
  .admin-user-pill {
    display: none;
  }
}
</style>
