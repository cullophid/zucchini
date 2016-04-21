
import {visit, fill, submit, sleep} from './new-game-actions'
import gamelistSteps from '../gameslist/gameslist'

export default [
  [/^I am on the New Game page$/, visit],
  [/^I fill in "(.*)" with "(.*)"$/, fill],
  [/^I click Create Game$/, submit],
  [/^I sleep$/, sleep],
  ...gamelistSteps
]
