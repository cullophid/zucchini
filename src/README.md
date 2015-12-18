# Zucchini
*A simple browser testing framework based on es7 and cucumber*
This framework is based on the excellent work of [cucumber](https://cucumber.io/) and [Capybara](https://github.com/jnicklas/capybara)

**Zucchini is NOT production ready! There are still plenty of bugs, and the documentation is still very poor**

## Motivation

The main challenge with writing browser tests in javascript is async. Javascript is currently not great a handling async operations, and when writing browser tests almost every operation is async. The existing solutions are either based on promises, or methods chaining, and while most of them are excellent frameworks, they still don't offer the same simplicity as blocking code.

### Enter es7
In es7 we get a brand new feature called async functions. That means that in stead of writing:

```js
const promiseFunction = () =>
  return getFoo()
    .then((foo) => {
      return transformFoo(foo)
    })
    .then((bar) => {
      return transformBar(bar)
    })

})
```

we can write:
```js
When(/^I click on the button&/, async () => {
  const foo = await getFoo()
  const bar = await transformFoo(foo)
  return transformBar(foo)
})
```

### Even simpler with Zucchini
Zucchini makes async interactions with the browser even simpler by maintaining an internal promise chain. This mains that you can write code like this:
```js
When(/^I Login$/, async () => {
  fill('#email', 'andreas@example.com')
  fill('#password', 'myPassword')
  click('#submit')
})
```
Zucchini will automatically wait for each step to finish before running the next and it wont run any other scenario step before all commands are completed.

### Automatic waiting Capybara style
The best feature in capybara is the automatic waiting. When interacting with an element or making a assertion capybara will automatically retry until a given timeout. This means that you don't have to worry about waiting for elements to appear on the page, or have the right text. Zucchini will handle all that.

Example:
```js
Then(/^the page title should be 'foo'$/, async () => {
  assertText('h1', 'foo')
})
```
If the h1 is not present on the page, or has the wrong text, Zucchini will keep trying until it times out. This means that you don't have to worry about race conditions between the pages javascript and zucchini.

## How to use

*More info when the framework is ready for use*
