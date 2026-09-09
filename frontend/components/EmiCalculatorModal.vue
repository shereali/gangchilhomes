<template>
  <div v-if="isOpen" class="modal-overlay" ref="modalRoot" @click.self="$emit('close')">
    <div class="modal-card animate-fade-in-up">
      <button class="modal-close-btn" @click="$emit('close')">✕</button>

      <div class="flex items-center gap-3" style="margin-bottom: 20px;">
        <div style="width: 44px; height: 44px; border-radius: 12px; background: rgba(212,175,55,0.15); color: #B45309; display: flex; align-items: center; justify-content: center;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <rect x="2" y="5" width="20" height="14" rx="2"/>
            <line x1="2" y1="10" x2="22" y2="10"/>
          </svg>
        </div>
        <div>
          <h3 style="font-size: 1.4rem; font-weight: 800; color: #0A1128;">Bangladesh Home Loan & EMI Calculator</h3>
          <p style="font-size: 0.85rem; color: #64748B;">Compare rates with leading BD Banks (DBH, IDLC, BRAC, City Bank)</p>
        </div>
      </div>

      <!-- Controls -->
      <div style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px;">
        <!-- Loan Amount -->
        <div class="form-group">
          <div class="flex justify-between items-center">
            <label class="form-label">Loan Amount (BDT)</label>
            <strong style="color: #059669; font-size: 1rem;">{{ formatBDT(loanAmount) }}</strong>
          </div>
          <input v-model.number="loanAmount" type="range" min="1000000" max="100000000" step="500000" style="width:100%; accent-color: #059669;" />
        </div>

        <!-- Interest Rate -->
        <div class="form-group">
          <div class="flex justify-between items-center">
            <label class="form-label">Annual Interest Rate (%)</label>
            <strong style="color: #D4AF37; font-size: 1rem;">{{ interestRate }}%</strong>
          </div>
          <input v-model.number="interestRate" type="range" min="6.0" max="15.0" step="0.25" style="width:100%; accent-color: #D4AF37;" />
        </div>

        <!-- Partner Bank Rate Selector Chips -->
        <div class="form-group">
          <label class="form-label">Compare Real Partner Bank Benchmark Rates</label>
          <div class="flex gap-2 flex-wrap">
            <button 
              type="button" 
              class="btn btn-sm" 
              :class="interestRate === 9.25 ? 'btn-emerald' : 'btn-outline'"
              @click="interestRate = 9.25"
            >
              DBH Finance (9.25%)
            </button>
            <button 
              type="button" 
              class="btn btn-sm" 
              :class="interestRate === 9.40 ? 'btn-emerald' : 'btn-outline'"
              @click="interestRate = 9.40"
            >
              BRAC Bank (9.40%)
            </button>
            <button 
              type="button" 
              class="btn btn-sm" 
              :class="interestRate === 9.50 ? 'btn-emerald' : 'btn-outline'"
              @click="interestRate = 9.50"
            >
              IDLC Finance (9.50%)
            </button>
            <button 
              type="button" 
              class="btn btn-sm" 
              :class="interestRate === 9.75 ? 'btn-emerald' : 'btn-outline'"
              @click="interestRate = 9.75"
            >
              City Bank (9.75%)
            </button>
          </div>
        </div>

        <!-- Loan Tenure (Years) -->
        <div class="form-group">
          <div class="flex justify-between items-center">
            <label class="form-label">Loan Tenure (Years)</label>
            <strong style="color: #0F172A; font-size: 1rem;">{{ tenureYears }} Years</strong>
          </div>
          <input v-model.number="tenureYears" type="range" min="3" max="25" step="1" style="width:100%; accent-color: #0F172A;" />
        </div>
      </div>

      <!-- Result Card -->
      <div style="background: #0A1128; color: #FFFFFF; border-radius: var(--radius-lg); padding: 24px; text-align: center; margin-bottom: 20px; box-shadow: 0 10px 30px rgba(10,17,40,0.3);">
        <div style="font-size: 0.85rem; color: #CBD5E1; text-transform: uppercase; letter-spacing: 0.05em;">Estimated Monthly Installment (EMI)</div>
        <div style="font-family: var(--font-ui); font-size: 2.2rem; font-weight: 800; color: #10B981; margin: 8px 0; font-variant-numeric: tabular-nums;">
          {{ formatBDT(monthlyEmi) }}<span style="font-size:1rem; color:#CBD5E1;"> / month</span>
        </div>
        <div class="flex justify-center gap-6" style="margin-top: 14px; font-size: 0.85rem; color: #CBD5E1;">
          <div>Total Interest: <strong>{{ formatBDT(totalInterest) }}</strong></div>
          <div>Total Payment: <strong>{{ formatBDT(totalPayment) }}</strong></div>
        </div>
      </div>

      <div style="background: #F1F5F9; border-radius: var(--radius-md); padding: 14px; font-size: 0.85rem; color: #475569;">
        <strong>Bank Financing Partners:</strong> DBH Finance, IDLC Finance, BRAC Bank Home Loans, City Bank, and EBL. Up to 70% property valuation financing available.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { formatBDT } from '~/composables/useCurrency'
import { useOverlayBehavior } from '~/composables/useOverlayBehavior'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits(['close'])

const isOpenRef = computed(() => props.isOpen)
const modalRoot = ref<HTMLElement | null>(null)

const close = () => emit('close')

useOverlayBehavior(isOpenRef, close, modalRoot)

const loanAmount = ref(20000000) // 2 Crore default
const interestRate = ref(9.5) // 9.5% average BD mortgage rate
const tenureYears = ref(15) // 15 years

const monthlyEmi = computed(() => {
  const r = (interestRate.value / 12) / 100
  const n = tenureYears.value * 12
  const p = loanAmount.value
  if (r === 0) return Math.round(p / n)
  const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
  return Math.round(emi)
})

const totalPayment = computed(() => {
  return monthlyEmi.value * (tenureYears.value * 12)
})

const totalInterest = computed(() => {
  return totalPayment.value - loanAmount.value
})
</script>
