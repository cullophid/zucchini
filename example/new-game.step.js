import * as newGamePage from './new-game'
import './gameslist-page.step'
step(/^I am on the New Game page$/, newGamePage.visit )
step(/^I fill in "name" with "my game"$/, () => newGamePage.fill('name', 'my game'))
step(/^I fill in "name" with "my new game"$/,() => newGamePage.fill('name', 'my new game'))
step(/^I fill in "description" with "a game"$/, () => newGamePage.fill('description', 'a game'))
step(/^I fill in "description" with "a new game"$/, () => newGamePage.fill('description', 'a new game'))
step(/^I click Create Game$/, newGamePage.submit)
step(/^I sleep$/, newGamePage.sleep)
