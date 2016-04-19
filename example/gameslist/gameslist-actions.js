import { browser } from '../../src'

export const isCurrentPage = () =>
  browser.hasText('#page-title', 'Games')

export const hasGame = (title) =>
  browser.hasText('[data-test="game"]', title)
