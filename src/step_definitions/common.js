
When(/^I visit 'angularjs'$/, async () => {
  visit('https://angularjs.org')
})

When(/^I type in the name 'Andreas'$/, async () => {
  fill('input[ng-model=yourName]', 'TEMP')
  fill('input[ng-model=yourName]', 'Andreas')
})

Then(/^I should see the text 'Hello Andreas!'$/, async () => {
  assertText('h1.ng-binding', 'Hello Andreas!')
  sleep(1000)
})

When(/I visit 'reactjs'$/, async () => {
  visit('https://facebook.github.io/react/')
})

When(/^I add todo task 'Hello World!'$/, async () => {
  fill('.playgroundPreview input', 'Hello World!')
  click('.playgroundPreview button')
})

Then(/^I should see the task 'Hello World!'$/, async () => {
  assertText('.playgroundPreview li', 'Hello World!')
  sleep(1000)
})
