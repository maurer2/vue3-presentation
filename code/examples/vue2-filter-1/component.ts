import Vue from 'vue2';

export default Vue.extend({
  filters: {
    capitalizeLastLetters(value: string | null): string {
      if (!value) {
        return '';
      }

      const valueClean: string = value.trim();
      const words: string[] = valueClean.split(/\s+/);
      const wordsReversed: string[] = words
        .map((word) => word.split('').reverse().join(''));

      const wordsReversedCapitalized: string[] = wordsReversed.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase();
        const remainingLetters = word.slice(1).toLowerCase();
        const newWord = `${firstLetter}${remainingLetters}`;

        return newWord;
      });

      const wordsCapitalized: string[] = wordsReversedCapitalized
        .map((word) => word.split('').reverse().join(''));
      const transformedValue: string = wordsCapitalized.join(' ');

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
