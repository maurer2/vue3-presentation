import { defineComponent } from 'vue';
const radioButtonStates = {
    on: 'On',
    off: 'Off',
};
export default defineComponent({
    props: {
        modelValue: {
            type: String,
            default: 'off',
        },
    },
    emits: [
        'update:modelValue',
    ],
    computed: {
        modelValueComputed: {
            set(newValue) {
                this.$emit('update:modelValue', newValue);
            },
            get() {
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
