import { step } from '../../src'
import {isCurrentPage, hasGame} from './gameslist-actions'

export default [
  [/^I should be on the games list page$/, isCurrentPage],
  [/I should see the game "my game"$/, () => hasGame('my game')],
  [/I should see the game "my new game"$/, () => hasGame('my new game')]
]
