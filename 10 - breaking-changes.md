# Breaking Changes

## Filter removal
- Filter syntax was original taken from AngularJS
- Often used for output formatting like currencies, dates, text manipulation etc.
- Pure functions with no access to component state
- Can be chained
- Not valid JS
- Can be replaced with regular functions or computed properties

### Example filter in component in Vue2

```html
<h1>
  {{ text | capitalizeLastLetters | otherFilter }}
</h1>
```


```ts
export default {
  data () {
    return {
      text: 'lorem ipsum dolor sit amet',
    }
  },
  filters: {
    capitalizeLastLetters(value: string | null): string {
      if (!value) {
        return ''
      }

      const valueClean = value.trim()
      const words = valueClean.split(/\s+/);

      const wordsReversed = words.map((word) => word.split('').reverse().join(''))
      const wordsReversedCapitalized = wordsReversed.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase()
        const remainingLetters = word.slice(1)
        const newWord = `${firstLetter}${remainingLetters}`

        return newWord
      })
      const wordsCapitalized = wordsReversedCapitalized.map((word) => word.split('').reverse().join(''))

      const transformedValue = wordsCapitalized.join(' ')

      return transformedValue
    },
    ....
  }
}
```

### Example filter in component in Vue3

```html
<h1>
  {{ textLastLettersCapitalized }}
</h1>
<h1>
  {{ capitalizeLastLetters(text) }}
</h1>
```

```ts
export default {
  data () {
    return {
      text: 'lorem ipsum dolor sit amet',
    }
  },
  computed: {
    textLastLettersCapitalized(): string {
      if (!this.text) {
        return ''
      }

      const textClean = value.trim()
      const words = textClean.split(/\s+/);

      const wordsReversed = words.map((word) => word.split('').reverse().join(''))
      const wordsReversedCapitalized = wordsReversed.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase()
        const remainingLetters = word.slice(1)
        const newWord = `${firstLetter}${remainingLetters}`

        return newWord
      })
      const wordsCapitalized = wordsReversedCapitalized.map((word) => word.split('').reverse().join(''))

      const transformedValue = wordsCapitalized.join(' ')

      return transformedValue
    },
  },
  methods: {
    capitalizeLastLetters(value: string | null): string {
      if (!value) {
        return ''
      }

      const valueClean = value.trim()
      const words = valueClean.split(/\s+/);

      const wordsReversed = words.map((word) => word.split('').reverse().join(''))
      const wordsReversedCapitalized = wordsReversed.map((word) => {
        const firstLetter = word.charAt(0).toUpperCase()
        const remainingLetters = word.slice(1)
        const newWord = `${firstLetter}${remainingLetters}`

        return newWord
      })
      const wordsCapitalized = wordsReversedCapitalized.map((word) => word.split('').reverse().join(''))

      const transformedValue = wordsCapitalized.join(' ')

      return transformedValue
    },
  }
}
```