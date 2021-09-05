import Vue from 'vue2';
export default Vue.extend({
    filters: {
        capitalizeLastLetters(value) {
            if (!value) {
                return '';
            }
            const words = value.trim().split(/\s+/);
            const wordsReversed = words
                .map((word) => word.split('').reverse().join(''));
            const wordsReversedCapitalized = wordsReversed.map((word) => {
                const firstLetter = word.charAt(0).toUpperCase();
                const remainingLetters = word.slice(1).toLowerCase();
                const newWord = `${firstLetter}${remainingLetters}`;
                return newWord;
            });
            const wordsCapitalized = wordsReversedCapitalized
                .map((word) => word.split('').reverse().join(''));
            const wordsCapitalizedString = wordsCapitalized.join(' ');
            return wordsCapitalizedString;
        },
    },
    data() {
        return {
            text: '',
        };
    },
    template: `
    <div class="root">
      <input v-model="text" placeholder="Please enter a text" />
      <p>
        Filtered: {{ text | capitalizeLastLetters }}
      </p>
    </div>
  `,
});
