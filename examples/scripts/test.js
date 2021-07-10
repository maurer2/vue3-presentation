import { ref, computed } from 'vue'

export default {
  name: 'TestComponent',
  setup() {
    const counter = ref(0)
    const hasBeenClicked = computed(() => counter.value !== 0)

    function handleClick() {
      counter.value += 1
    }

    return {
      counter,
      hasBeenClicked,
      handleClick,
    }
  },
  template: `
    <button
      type="button"
      @click="handleClick"
    >
      Clicked {{ counter }} time(s)
    </button>
  `
}
