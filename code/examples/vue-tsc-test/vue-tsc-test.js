import { ref, computed, defineComponent } from 'vue';
export default defineComponent({
    name: 'VueTSC-Test',
    setup() {
        const numberValue = ref(101);
        const splitTest = computed(() => numberValue.value.split('1'));
        return {
            numberValue,
        };
    },
    template: `
    <div>
      <h1>Test</h1>
      {{ numberValue.split('1') }}
    </div>
  `,
});
