
export const isCurrentPage = () =>
  browser.hasText('#page-title', 'Games')

export const hasGame = () =>
  browser.hasText('[data-test="game"]', 'my new game')
