import { defineComponent, PropType } from 'vue';

const radioButtonStates = {
  on: 'On',
  off: 'Off',
} as const;
type RadioButtonStates = keyof typeof radioButtonStates

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<RadioButtonStates>,
      default: 'off',
    },
  },
  emits: [
    'update:modelValue',
  ],
  computed: {
    modelValueComputed: {
      set(newValue: RadioButtonStates): void {
        this.$emit('update:modelValue', newValue);
      },
      get(): string {
        return this.modelValue;
      },
    },
  },
  template: `
    <div>
      <input type="radio" v-model="modelValueComputed" value="on" id="on-button" />
      <label for="on-button"> On</label>
    </div>
    <div>
      <input type="radio" v-model="modelValueComputed" value="off" id="off-button" />
      <label for="off-button"> Off</label>
    </div>
  `,
});
