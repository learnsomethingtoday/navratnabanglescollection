# Navira Jewels catalogue

A static, catalogue-only Astro website for a growing Navratna bangle collection. It intentionally contains no cart, checkout, payments, user accounts, or order-creation flow.

## Prerequisites

This project requires Node.js and pnpm.

### macOS installation with Homebrew

Install Node.js:

```sh
brew install node
```

Verify the installation:

```sh
node --version
npm --version
```

Some Homebrew Node installations do not expose `corepack`. Install pnpm directly instead:

```sh
brew install pnpm
```

Verify pnpm:

```sh
pnpm --version
```

If Homebrew is not installed, install Node.js through the official Node.js installer and then install pnpm using the method recommended for that environment.

## Install and run the project

Open a terminal in the repository directory and install dependencies:

```sh
pnpm install
```

Start the development server:

```sh
pnpm dev
```

Astro will print a local address, normally `http://localhost:4321`. Open that address in a browser.

Stop the development server with `Control+C`.

## Development commands

```sh
# Start the local development server
pnpm dev

# Run Astro and TypeScript checks
pnpm check

# Run the automated tests
pnpm test

# Check the source and create the static production site in dist/
pnpm build

# Preview the completed production build
pnpm preview
```

## Troubleshooting

### `zsh: command not found: pnpm`

Install pnpm and open a new terminal:

```sh
brew install pnpm
pnpm --version
```

### `zsh: command not found: corepack`

Corepack is not required for this project. Install pnpm directly:

```sh
brew install pnpm
```

### Using the Codex bundled runtime

Codex may provide Node.js and pnpm internally without exposing them to a normal terminal. A local development server can be started directly from the repository with:

```sh
/Users/ruthwikkancharla/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node \
  node_modules/astro/astro.js dev
```

Installing Node.js and pnpm through Homebrew is preferred for ordinary development outside Codex.

## Add or update a product

1. Duplicate an entry in `src/content/products/`.
2. Give the file and `slug` a unique lowercase, hyphenated value.
3. Replace every placeholder field with verified product information.
4. Add product images under `public/images/products/<product-slug>/` and update `images` in the entry. Each image requires meaningful alt text. Mixed image sizes and orientations are supported.
5. Set `featured: true` only for products that should appear on the home page.
6. Run `pnpm build`. Invalid or incomplete product data will stop the build with a useful schema error.

Categories, collections, search terms, product routes, related products, and the sitemap are derived from product entries automatically.

## Before launch

- Replace the brand name if required and verify trademark/domain availability.
- Verify the production URL and base path in `astro.config.mjs`.
- Replace all preview product copy and placeholder artwork with verified content.
- Confirm the telephone and WhatsApp number.

No hosting provider or CMS is assumed. The generated `dist/` folder can be deployed to any static web host.

## GitHub Pages

Production URL: https://learnsomethingtoday.github.io/navratnabanglescollection/

The workflow in `.github/workflows/deploy.yml` tests, builds, and deploys changes pushed to `main`. In repository Settings → Pages, select GitHub Actions as the publishing source. GitHub Pages requires a public repository on the current account plan.

Internal links and public images use `siteUrl()` to include the repository base path. Keep this helper when adding new routes or images.
