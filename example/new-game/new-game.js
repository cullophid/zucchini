
import { step } from '../../src'
import {visit, fill, submit, sleep} from './new-game-actions'
import gamelistSteps from '../gameslist/gameslist'

export default [
  [/^I am on the New Game page$/, visit],
  [/^I fill in "name" with "my game"$/, () => fill('name', 'my game')],
  [/^I fill in "name" with "my new game"$/,() => fill('name', 'my new game')],
  [/^I fill in "description" with "a game"$/, () => fill('description', 'a game')],
  [/^I fill in "description" with "a new game"$/, () => fill('description', 'a new game')],
  [/^I click Create Game$/, submit],
  [/^I sleep$/, sleep],
  ...gamelistSteps
]
