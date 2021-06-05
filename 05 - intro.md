# Intro

## Goals
- Better Typescript integration
- Remove Vue2 reactivity issues (no more Vue.set etc.)
- Unify and extend data binding (v-model vs .sync, multiple v-models)
- Remove Vue2 template limitations (fragments, multi-root etc.)
- Avoid common errors (execution context,arrow functions with computed etc.)
- Simplify component splitting to avoid overly complex components (monster components)
- More FP, less OOP
- Faster, smaller etc.

## Better Typescript support
- Vue2 was written using Flow with types for Typescript being generated separately
- Vue3 is a complete rewrite in Typescript
- Class API was originally considered but ultimately dropped during development
- Type interference for props and mostly works out of the box already for options-api and composition-api
- Type checking still doesn't work in templates out the box
