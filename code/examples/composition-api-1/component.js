import { ref, computed, defineComponent } from 'vue';
export default defineComponent({
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
    <h1>
      <template v-if="hasBeenClicked">Has started</template>
      <template v-else>Has not started</template>
    </h1>
    <button
      type="button"
      @click="handleClick"
    >
      Clicked {{ counter }} time(s)
    </button>
  `,
});
