import { readFileSync } from 'fs'
import { join } from 'path'
import { colors } from './theme'

/**
 * The brand palette is declared twice, and it has to be.
 *
 * `tailwind.config.css` declares `--color-primary-*`, which is what every
 * `bg-primary-600` / `text-primary-800` class in the components resolves
 * to. `theme.ts` declares the same values as a JS object, which is what
 * components reach for when they need a colour as a value rather than a
 * class — `Accordion`'s SVG `stroke`, `Select`'s inline custom properties.
 * Neither can be derived from the other at runtime: CSS variables are not
 * readable during SSR, and a JS object cannot produce Tailwind utilities.
 *
 * So they are duplicated, and nothing in the build makes them agree. Change
 * one and half the library moves while the other half stays put — with no
 * error, because both files are individually valid. This test is the thing
 * that makes changing the brand colour a single reviewable decision instead
 * of a hunt.
 *
 * If you are here because this failed: you changed one file. Change both.
 */
describe('brand palette', () => {
  const parseCssVariables = (): Record<string, string> => {
    const css = readFileSync(
      join(__dirname, '../../tailwind.config.css'),
      'utf8',
    )
    const matches = css.matchAll(
      /--color-primary-(\d+):\s*(#[0-9A-Fa-f]{6})/g,
    )

    return Object.fromEntries(
      [...matches].map(([, shade, hex]) => [shade, hex.toLowerCase()]),
    )
  }

  it('is identical in tailwind.config.css and theme.ts', () => {
    const fromCss = parseCssVariables()
    const fromTs = Object.fromEntries(
      Object.entries(colors.primary).map(([shade, hex]) => [
        shade,
        String(hex).toLowerCase(),
      ]),
    )

    expect(fromCss).toEqual(fromTs)
  })

  it('declares every shade the components can ask for', () => {
    // A missing shade is worse than a wrong one: `colors.primary[700]`
    // would be `undefined` and reach the DOM as an empty attribute rather
    // than failing.
    const expected = [
      '25',
      '50',
      '100',
      '200',
      '300',
      '400',
      '500',
      '600',
      '700',
      '800',
      '900',
    ]

    expect(Object.keys(parseCssVariables()).sort()).toEqual(expected.sort())
    expect(Object.keys(colors.primary).sort()).toEqual(expected.sort())
  })
})
