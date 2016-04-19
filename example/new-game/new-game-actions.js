import { browser } from '../../src'

export const visit = async () => {
  await browser.visit('http://localhost:3000')
  await browser.visit('http://localhost:3000/#/games/new')
}
export const fill = (name, value) => browser.fill(`[name="${name}"]`, value)

export const submit = () => browser.click('[name="submit"]')

export const sleep = () => browser.sleep(3000)
