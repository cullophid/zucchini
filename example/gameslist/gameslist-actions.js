import { browser } from '../../src'

export const isCurrentPage = () =>
  browser.hasText('#page-title', 'Games')

export const hasGame = (title) =>
  browser.hasText('[data-test="game"]', title)

const stuff = () => {
  browser.assertText('#title', 'hello world')
  browser.sleep(3000)
}
