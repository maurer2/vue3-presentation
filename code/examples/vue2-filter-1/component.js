import Vue from 'vue2';
export default Vue.extend({
    filters: {
        capitalizeLastLetters(value) {
            if (!value) {
                return '';
            }
            const valueClean = value.trim();
            const words = valueClean.split(/\s+/);
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
            const transformedValue = wordsCapitalized.join(' ');
            return transformedValue;
        },
    },
    data() {
        return {
            text: 'Lorem ipsum dolor sit amet',
        };
    },
    template: `
    <div class="root">
      <p>
        Unfiltered: {{ text }}
      </p>
      <p>
        Filtered: {{ text | capitalizeLastLetters }}
      </p>
    </div>
  `,
});
