# Breaking Changes

## Filter removal
- Filter syntax was original taken from AngularJS
- Often used for output formatting like currencies, dates, text manipulation etc.
- Pure functions with no access to component state
- Can be chained
- Not valid JS
- Can be replaced with regular functions or computed properties

### Example filter in template

```html
<h1>
  {{ text | capitalizeLastLetters | capitalizeFirstLetters }}
</h1>
```

### Example filter in component in Vue2

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
    capitalizeFirstLetters(value: string | null): string {
      if (!value) {
        return ''
      }

      return value
    }
  }
}
```