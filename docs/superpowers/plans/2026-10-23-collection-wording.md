# Collection Wording Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace every customer-facing use of “Catalogue” with “Collection” while preserving the existing `/catalogue/` routes and internal implementation names.

**Architecture:** This is a copy-only change across existing Astro layouts, shared components, page templates, and metadata. Public strings change in place; route paths, component directories, CSS classes, content filenames, and JavaScript identifiers remain unchanged.

**Tech Stack:** Astro 5, TypeScript, Vitest, Astro Content Collections

**Spec:** `docs/superpowers/specs/2026-10-23-collection-wording-design.md`

## Global Constraints

- All visitor-facing “Catalogue” wording becomes “Collection”, preserving sentence case.
- Existing `/catalogue/` and `/catalogue/[slug]/` URLs remain unchanged.
- Internal names containing `catalogue` remain unchanged unless rendered to visitors.
- No layout, product-data, enquiry-flow, or online-ordering behavior changes.
- Update `PROJECT_CONTEXT.md` after the approved website change.

## Review Focus

- Navigation and footer labels must say “Collection” but still link to `/catalogue/`.
- Page metadata and accessible-only text must use “Collection”, not only visible headings.
- WhatsApp prefilled messages must use “collection” without changing the configured phone number or enquiry purpose.
- No-online-ordering notices must retain their meaning after the terminology change.
- Search, filters, generated product routes, and related-product links must continue using the existing route structure.

---

### Task 1: Public terminology and route preservation

**Files:**
- Modify: `tests/catalogue.test.ts`
- Modify: `src/components/layout/Header.astro`
- Modify: `src/components/layout/Footer.astro`
- Modify: `src/components/shared/ContactBand.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/data/site-config.ts`
- Modify: `src/pages/index.astro`
- Modify: `src/pages/catalogue/index.astro`
- Modify: `src/pages/catalogue/[slug].astro`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/contact.astro`
- Modify: `src/pages/404.astro`

**Interfaces:**
- Consumes: existing `siteUrl('/catalogue/')` route generation and `whatsappUrl(message)` helper.
- Produces: customer-facing “Collection” terminology with unchanged `/catalogue/` links.

- [ ] **Step 1: Write the failing terminology regression test**

Add a Vitest case named `uses Collection in public copy while preserving catalogue routes` that reads the public Astro templates and `site-config.ts`, asserts the approved “Collection” strings in navigation, notices, metadata, buttons, breadcrumbs, search label, empty state, contact copy, About copy, 404 copy, and WhatsApp messages, and asserts that representative links still contain `siteUrl('/catalogue/')` and ``siteUrl(`/catalogue/${data.slug}/`)``.

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `/Users/ruthwikkancharla/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm test -- tests/catalogue.test.ts`

Expected: FAIL because the public templates still contain “Catalogue” strings.

- [ ] **Step 3: Replace customer-facing terminology**

Change public copy to the corresponding “Collection” wording in the files listed above. Preserve imports, `/catalogue/` paths, `catalogue-*` CSS classes, `data-*` hooks, component directories, and all other internal identifiers.

- [ ] **Step 4: Run the focused test and verify it passes**

Run: `/Users/ruthwikkancharla/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm test -- tests/catalogue.test.ts`

Expected: all focused tests pass with zero failures.

- [ ] **Step 5: Commit the public terminology change**

```bash
git add tests/catalogue.test.ts src/components/layout/Header.astro src/components/layout/Footer.astro src/components/shared/ContactBand.astro src/layouts/BaseLayout.astro src/data/site-config.ts src/pages/index.astro src/pages/catalogue/index.astro 'src/pages/catalogue/[slug].astro' src/pages/about.astro src/pages/contact.astro src/pages/404.astro
git commit -m "feat: present catalogue as collection"
```

### Task 2: Project context and end-to-end verification

**Files:**
- Modify: `PROJECT_CONTEXT.md`
- Modify: `tests/catalogue.test.ts`

**Interfaces:**
- Consumes: the public terminology established in Task 1.
- Produces: a durable project rule distinguishing customer-facing “Collection” from internal `/catalogue/` routes.

- [ ] **Step 1: Add a failing context-policy assertion**

Extend the terminology regression test to assert that `PROJECT_CONTEXT.md` states that public wording is **Collection** while `/catalogue/` routes and internal identifiers remain unchanged.

- [ ] **Step 2: Run the focused test and verify it fails**

Run: `/Users/ruthwikkancharla/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm test -- tests/catalogue.test.ts`

Expected: FAIL because the terminology policy is not yet recorded in the project context.

- [ ] **Step 3: Update the project context**

Add the approved terminology rule to `PROJECT_CONTEXT.md` and update customer-facing examples there where needed, without renaming historical filenames, image directories, code paths, or the documented route URLs.

- [ ] **Step 4: Verify rendered desktop and mobile pages**

Inspect Home, Collection, one product-detail page, About, Contact, and 404 at desktop and mobile widths. Confirm “Collection” is visible, `/catalogue/` navigation still resolves, responsive layouts have no horizontal overflow, and search/filter controls remain functional.

- [ ] **Step 5: Run complete verification**

Run:

```bash
/Users/ruthwikkancharla/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm test
/Users/ruthwikkancharla/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm check
/Users/ruthwikkancharla/.cache/codex-runtimes/codex-primary-runtime/dependencies/bin/fallback/pnpm build
```

Expected: all tests pass, Astro reports zero diagnostics, and the static build generates all existing routes including `/catalogue/` and the eight product-detail pages.

- [ ] **Step 6: Commit documentation and verification coverage**

```bash
git add PROJECT_CONTEXT.md tests/catalogue.test.ts
git commit -m "docs: record collection terminology"
```
