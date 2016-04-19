import * as gameslistPage from './gameslist-page'

step(/^I should be on the games list page$/, gameslistPage.isCurrentPage)
step(/I should see the game "my new game"$/, () => gameslistPage.hasGame('my new game'))
