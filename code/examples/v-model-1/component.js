import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        firstName: {
            type: String,
            default: '',
        },
        lastName: {
            type: String,
            default: '',
        },
    },
    computed: {
        firstNameValue: {
            set(newValue) {
                this.$emit('update:firstName', newValue);
            },
            get() {
                return this.firstName;
            },
        },
    },
    methods: {
        handleInput(event) {
            if (event.target === null) {
                throw new Error('input field missing');
            }
            const targetElement = event.target;
            this.$emit('update:lastName', targetElement.value);
        },
    },
    template: `
    <div>
      <label for="first-name">First name: </label>
      <input v-model="firstNameValue" id="first-name" />
    </div>
    <div>
      <label for="last-name">Last name: </label>
      <input :value="lastName" @input="handleInput" id="last-name" />
    </div>
  `,
});
/*
Removed for sake of brevity
emits: [
  'update:firstName',
  'update:lastName',
],
*/
