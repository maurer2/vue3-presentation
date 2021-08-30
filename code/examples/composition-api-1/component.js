import { ref, computed, defineComponent } from 'vue';
export default defineComponent({
    name: 'TestComponent',
    setup() {
        const counter = ref(0);
        const hasBeenClicked = computed(() => counter.value !== 0);
        function handleClick() {
            counter.value += 1;
        }
        return {
            counter,
            hasBeenClicked,
            handleClick,
        };
    },
    template: `
    <div>
      <button
        type="button"
        @click="handleClick"
      >
        Clicked {{ counter }} time(s)
      </button>
    </div>
  `,
});
