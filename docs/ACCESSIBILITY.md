# Accessibility Baseline

Emerald Legacy Systems is designed and audited against WCAG 2.2 AA baseline requirements. This is a target and operating standard, not a formal certification claim.

## Scope

The foundation accessibility baseline covers:

- header and navigation
- mobile navigation
- footer
- page shell and page headers
- buttons and link buttons
- text links
- inputs, textareas, and labels
- cards, badges, and status indicators
- error and recovery states
- 404 handling
- design-system QA route

## Landmarks

Public site pages use the expected landmark structure:

- `header`
- `nav`
- one primary `main`
- `footer`

Avoid adding duplicate `main` landmarks inside page content. Global error handling is allowed to provide its own minimal `main` because it replaces the root layout.

## Skip Link

The public site shell includes a keyboard-accessible "Skip to main content" link.

Requirements:

- first meaningful keyboard focus target in the site shell
- visually hidden until focused
- points to `#main-content`
- does not reserve visible layout space while hidden

The site layout exposes:

```text
id="main-content"
```

## Heading Policy

Each route should have one clear page-level `h1`. Section headings should descend logically from the page heading. Decorative labels should use non-heading text elements.

Placeholder pages can remain simple while the production page work is still pending.

## Keyboard Navigation

All navigation and recovery controls should be reachable by keyboard:

- desktop navigation links
- mobile menu trigger
- mobile menu links
- header CTA links
- footer links
- error retry buttons
- 404 recovery links

Do not add keyboard traps or automatic redirects from error states.

## Focus Visibility

Interactive primitives use visible focus styling through the shared focus tokens and global `:focus-visible` rule. Do not remove outlines without an equivalent replacement.

## Mobile Navigation

The mobile menu trigger is a semantic button with:

- `aria-expanded`
- `aria-controls`
- an accessible label

Escape closes the menu and returns focus to the trigger. Menu links remain normal links, and destination CTAs use link semantics.

## Forms

Form primitives are label-compatible. Labels should use `htmlFor` and controls should use matching `id` values. Placeholder text must not be treated as the only label.

## Icons And Images

Decorative icons should use `aria-hidden="true"`. Icon-only controls must have an accessible name.

Meaningful images need suitable alt text. Decorative images should use empty alt text when adjacent visible text already communicates the same information. Brand marks next to visible brand text should avoid repeating the brand name for screen readers.

## Color And Status

Do not rely on color alone for production status communication. If a status dot is decorative, mark it as hidden from assistive technology and provide nearby text for the actual status.

Token contrast should be reviewed when production content replaces placeholders, especially muted text on dark surfaces, disabled states, gold accents, and warning/error colors.

## Reduced Motion

Global CSS respects `prefers-reduced-motion: reduce`. Motion-heavy interactions should continue to provide reduced-motion behavior before launch.

Do not add global smooth scrolling unless reduced-motion behavior is handled.

## Error States

Error and not-found states provide clear headings, concise explanations, keyboard-focusable recovery controls, and no raw error details in the DOM.

## Audit Limitations

`pnpm accessibility:audit` performs static source checks only. Static audits do not replace browser testing, assistive technology testing, or manual keyboard review.

Before production launch, run manual browser testing and ideally Lighthouse or equivalent accessibility tooling without claiming certification unless formal review has occurred.
