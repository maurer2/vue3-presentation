# Composition api

## Benefits
- Fixes some gotchas of the options api that make beginners trip up (arrow functions in data, methods etc.)
- Removes the need to be familiar with OOP and execution context in JS
- Simpler way to split code and share functionality (an alternative to mixins)
- More React-like

## Disadvantages
- Further fragmentation of the Vue ecosystem (Options api, Class components etc.)
- Single large setup function per component (debatable)
- Console.log debugging more annoying due to Proxy wrapper

## Api

### Component structure
- setup function and parameters
- prop handling

### Ref

### Reactive

### Computed

### Watch & WatchEffect

### Others

## Gotchas
- Destructure props like in React doesn't work

## Comparison with modern React