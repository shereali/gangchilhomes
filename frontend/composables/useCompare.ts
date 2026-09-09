import { ref, computed } from 'vue'

const comparedPropertyIds = ref<number[]>([])

export const useCompare = () => {
  const comparisonList = computed(() => comparedPropertyIds.value)
  const compareCount = computed(() => comparedPropertyIds.value.length)

  const toggleCompare = (id: number) => {
    const index = comparedPropertyIds.value.indexOf(id)
    if (index > -1) {
      comparedPropertyIds.value.splice(index, 1)
    } else {
      if (comparedPropertyIds.value.length >= 4) {
        alert('You can compare a maximum of 4 properties at a time.')
        return
      }
      comparedPropertyIds.value.push(id)
    }
  }

  const isInCompare = (id: number) => {
    return comparedPropertyIds.value.includes(id)
  }

  const clearComparison = () => {
    comparedPropertyIds.value = []
  }

  return {
    comparisonList,
    compareCount,
    toggleCompare,
    isInCompare,
    clearComparison
  }
}
