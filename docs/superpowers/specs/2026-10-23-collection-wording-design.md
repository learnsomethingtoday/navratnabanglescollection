# Collection Wording Design

## Intent

Replace the customer-facing word **Catalogue** with **Collection** throughout the Navira website so the language feels more suitable for the jewellery presentation.

## Scope

- Update visible navigation labels, headings, buttons, notices, descriptions, enquiry copy, breadcrumbs, accessibility labels, and page metadata from “catalogue” to “collection”.
- Preserve the meaning and current no-online-ordering guidance.
- Update automated tests and `PROJECT_CONTEXT.md` to reflect the approved terminology.

## Constraints and non-goals

- Keep the existing `/catalogue/` and `/catalogue/[slug]/` URLs unchanged so bookmarks, links, and generated product routes continue working.
- Keep internal component folders, CSS classes, JavaScript identifiers, content filenames, package metadata, and implementation terminology unchanged unless they are rendered to visitors.
- Do not redesign layouts, change product information, or alter ordering and enquiry behavior.

## Approaches considered

1. **Customer-facing wording only — selected.** Changes what visitors read without creating a route migration or breaking existing links.
2. **Rename wording and routes.** Would change `/catalogue/` to `/collection/`, requiring redirects and broader migration work with no current user benefit.

## Validation

- Add regression coverage ensuring public page templates use “Collection” while route paths remain `/catalogue/`.
- Check Home, Collection, product-detail, About, Contact, 404, header, and footer content.
- Verify desktop and mobile rendering, then run the full test suite, Astro check, and production build.
