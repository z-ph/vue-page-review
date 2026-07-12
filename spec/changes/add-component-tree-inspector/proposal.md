# Proposal: Add Component Tree Inspector

## Change ID

`add-component-tree-inspector`

## Why

When a reviewer clicks an element, the current selector path (`div#app > section > main > div > ...`) is useful but often too low-level. Developers need to know the component context: which Vue or React component owns this element, what its ARIA role is, and where it sits in the render tree. A component tree inspector makes this context visible and navigable.

## What Changes

1. Add a new "组件树" (Component Tree) panel inside the review toolbar/drawer.

2. Display two optional tree views:
   - **DOM Tree**: the ancestor chain from `document.body` to the selected element, with tag name, id, classes, and bounding rect.
   - **Framework Tree**: best-effort Vue/React component hierarchy that rendered the selected element, including component names when detectable.

3. For each tree node, show:
   - Selector path
   - Bounding rect (`x`, `y`, `width`, `height`)
   - ARIA role
   - Accessible name (from `aria-label`, label element, or text content)
   - Component name (framework tree only, when available)

4. Allow the reviewer to:
   - Click a tree node to highlight the corresponding element on the page
   - Hover a tree node to preview its highlight
   - Select a node to use it as the review target (updating the form)

5. Store the component tree snapshot in the review record so it can be exported.

6. Implement framework detection as best-effort:
   - Vue: inspect internal properties such as `__vueParentComponent` on DOM nodes.
   - React: inspect internal Fiber properties such as `__reactFiber$...`.
   - If framework internals are unavailable (production build without devtools, minified names), fall back to DOM tree only.

## Impact

- **API/Props**: New optional prop `enableComponentTree` (default `true`).
- **Data model**: Review records gain `componentTree` and `aria` fields.
- **Bundle size**: Small increase for tree rendering and ARIA computation.
- **Backward compatibility**: Existing records without `componentTree` continue to work.
- **Browser support**: Uses standard DOM APIs plus framework internals; graceful degradation when internals are absent.

## Out of Scope

- Full Vue/React DevTools integration
- Editing component props/state
- Source-map based component name resolution
