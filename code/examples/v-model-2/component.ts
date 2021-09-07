import { defineComponent, PropType } from 'vue';

export default defineComponent({
  props: {
    modelValue: {
      type: String as PropType<string>,
      default: '',
    },
  },
  emits: [
    'update:modelValue',
  ],
  computed: {
    modelValueComputed: {
      set(newValue: string): void {
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
