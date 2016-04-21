import { step } from '../../src'
import {isCurrentPage, hasGame} from './gameslist-actions'

export default [
  [/^I should be on the games list page$/, isCurrentPage],
  [/I should see the game "(.*)"$/, hasGame],
]
