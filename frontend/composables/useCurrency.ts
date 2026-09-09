// Formatter utilities for Bangladeshi Real Estate Market (BDT, Crore, Lakh, Katha, Shotok, Sqft)

export const formatBDT = (amount: number, unit?: string): string => {
  if (!amount && amount !== 0) return 'Price on Request'
  
  // If price is over 1 Crore (10,000,000 BDT)
  if (amount >= 10000000) {
    const crore = (amount / 10000000).toFixed(2).replace(/\.00$/, '')
    return `৳ ${crore} Crore` + (unit ? ` / ${unit}` : '')
  }
  
  // If price is over 1 Lakh (100,000 BDT)
  if (amount >= 100000) {
    const lakh = (amount / 100000).toFixed(2).replace(/\.00$/, '')
    return `৳ ${lakh} Lakh` + (unit ? ` / ${unit}` : '')
  }
  
  // Regular formatting with Bangladeshi comma separator (e.g. 35,000)
  return `৳ ${amount.toLocaleString('en-IN')}` + (unit ? ` / ${unit}` : '')
}

export const formatArea = (sqft?: number, landSize?: number, landUnit?: string): string => {
  if (landSize && landUnit) {
    return `${landSize} ${landUnit}`
  }
  if (sqft) {
    return `${sqft.toLocaleString()} Sq. Ft.`
  }
  return 'N/A'
}
