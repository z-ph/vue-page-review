# Proposal: Improve Overlay Z-Index and Make Panels Resizable/Draggable

## Change ID

`improve-overlay-and-resizable-panels`

## Why

The review activation overlay currently sits above the review dialog, which can intercept clicks and make the form hard to use. The review form and toolbar also need better ergonomics: users want to drag the form to see content behind it, resize it for longer suggestions, and resize the toolbar if it grows with new buttons.

## What Changes

1. Lower the review overlay's z-index so it is below the review form, review list drawer, component tree drawer, and confirmation modal.
2. Make the review form dialog draggable by its header.
3. Make the review form dialog resizable by dragging its bottom-right corner.
4. Make the review toolbar resizable by dragging its bottom-right corner (while keeping draggable title behavior).
5. Ensure drag/resize events do not leak to the page selection logic underneath.

## Impact

- **UI/UX**: Reviewers can position and size the form and toolbar freely.
- **CSS**: New drag/resize handle styles and z-index layering.
- **Backward compatibility**: No data model changes.

## Out of Scope

- Docking/snapping panels to edges.
- Persisting panel positions across sessions.
- Touch gestures for mobile.
