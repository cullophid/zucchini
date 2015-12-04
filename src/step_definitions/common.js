
When(/^I visit 'https\:\/\/angularjs.org'$/, async () => {
  visit('https://angularjs.org')
})

When(/^I type in the name 'Andreas'$/, async () => {
  fill('input[ng-model=yourName]', 'TEMP')
  console.log('before sleep');
  await sleep(1000)
  console.log('ater sleep');
  fill('input[ng-model=yourName]', 'Andreas')
})

Then(/^I should see the text 'Hello Andreas!'$/, async () => {
  assertText('h1.ng-binding', 'Hello Andreas!')
  sleep(1000)
})
