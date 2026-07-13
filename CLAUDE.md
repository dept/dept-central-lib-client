# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`dept-central-lib-client` — a TypeScript React design-system component library, bundled with Webpack to a UMD package in `dist/`. Published via semantic-release. React is a peer dependency and is externalized from the bundle.

## Commands

- `npm test` — run Jest. Single file: `npm test -- src/components/Button/index.spec.tsx`. Single test: add `-t "test name"`.
- `npm run test:dev` — Jest watch mode. `npm run test:coverage` — coverage report.
- `npm run lint` / `npm run lint:fix` — ESLint. `npm run format` — Prettier.
- `npm run build` — clean + Webpack (dev). `npm run build:prod` — minified production build. `npm run dev` — Webpack watch.
- `npm run storybook` — Storybook dev server on port 6006. `npm run build-storybook` — static build.

Jest only matches `src/components/**/*.(spec|test).(ts|tsx)`; tests elsewhere won't run.

## Architecture

- **Public API** is `src/index.ts`: imports `globals.css`, re-exports every component from `src/components/index.ts`, and exports `theme` from `src/constants`. Adding a component means creating its folder AND adding it to `src/components/index.ts` — the barrel is not automatic.
- **Component folder convention**: each `src/components/<Name>/` has `index.tsx` (component, uses `forwardRef`), `index.spec.tsx` (tests), `index.stories.tsx` (Storybook), often `README.md`, and `index.module.css` for scoped styles.
- **Styling is dual**: component-scoped styles use CSS Modules (`*.module.css`, camelCase locals) compiled by Webpack; global tokens/utilities come from Tailwind v4 defined in `tailwind.config.css` (`@theme` block) and `globals.css`. The color palette is duplicated in three places that must stay in sync: `src/constants/theme.ts` (runtime JS object), `tailwind.config.css` (`--color-*` CSS vars), and consumed via `getColor` in components.
- **Color theming pattern**: components take `colorScheme` (palette key) + `colorShade` (numeric shade), resolve the hex via `getColor`, then derive contrast/hover/focus with `getContrastColor`/`getDarkenColor`/`getLightenColor` from `src/utils/colors.ts`, and pass them as CSS custom properties (`--button-*`) into the CSS-module styles. Follow this pattern for new themable components.
- **Types**: `src/types/colorPalette.ts` defines `ColorPalette`/`ColorShade` — the source of truth for scheme/shade props.
- **Utils** (`src/utils`): color math (`colors.ts`), date helpers (`dates.ts`), style helpers (`styles.ts`), client-only helpers (`client-functions.ts`).

## Commits & releases

Conventional Commits are enforced by commitlint (husky hook) and drive semantic-release on `main`: `fix:` → patch, `feat:` → minor, `BREAKING CHANGE:` footer → major. Commit messages are spell-checked (they appear in the changelog).

## Notes

- Three lockfiles exist (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`); scripts and README assume npm.
