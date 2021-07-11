import { ref, computed } from 'vue'

export default {
  name: 'TestComponent',
  setup() {
    const counter = ref<number>(0)
    const hasBeenClicked = computed<boolean>(() => counter.value !== 0)

    function handleClick(): void {
      counter.value += 1
    }

    return {
      counter,
      hasBeenClicked,
      handleClick,
    }
  },
  template: `
    <div>
      <h1>Test 2</h1>
      <button
        type="button"
        @click="handleClick"
      >
        Clicked {{ counter }} time(s)
      </button>
    </div>
  `
}