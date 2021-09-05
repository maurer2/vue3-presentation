import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        text: {
            type: String,
            default: '',
        },
    },
    emits: {
        'update-text': (newValue) => {
            const nonLatinCharactersRegex = /[^\x00-\x7F]+/;
            if (nonLatinCharactersRegex.test(newValue)) {
                return false;
            }
            return true;
        },
        'toggle-button': null, // disable validation
    },
    computed: {
        textValue: {
            set(newValue) {
                this.$emit('update-text', newValue);
            },
            get() {
                return this.text;
            },
        },
    },
    methods: {
        handleButtonClick() {
            this.$emit('toggle-button');
        },
    },
    template: `
    <fieldset>
      <legend>Form</legend>
      <label for="field">Field: </label>
      <input v-model="textValue" id="field" />
      <button type="button" @click="handleButtonClick">
        Click
      </button>
    </fieldset>
  `,
});
