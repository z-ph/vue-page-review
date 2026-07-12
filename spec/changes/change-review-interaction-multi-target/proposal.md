# Proposal: Change Review Interaction to Multi-Target Selection

## Change ID

`change-review-interaction-multi-target`

## Why

The current interaction immediately opens the review form after a single element click or box drag. This is disruptive when a reviewer wants to collect multiple related targets (several elements or several boxed regions) under one review comment. Users need a calmer workflow: select freely, adjust selections, and only open the form when ready.

## What Changes

1. Remove auto-open of the review form on element selection or box drag completion.
2. Keep selected elements and boxes visible on the page until explicitly cleared or submitted.
3. Support multi-selection:
   - Hold `Ctrl` (Windows/Linux) or `Cmd` (macOS) and click elements to add/remove them from the selection.
   - Hold `Ctrl`/`Cmd` while dragging a box to add a new boxed region without clearing existing ones.
4. Allow resizing any existing box by dragging its 8 resize handles.
5. Add a toolbar "评审(N)" button that opens the review form for all currently selected targets.
6. Add a toolbar "取消选择" button that clears all selected elements and boxes.
7. Update the review record data model from a single target to a `targets` array, while keeping backward compatibility with old records.
8. Update JSON/Markdown/ZIP exports to list multiple targets per review.
9. Update screenshot capture so "选中目标" captures one image per selected target.

## Impact

- **Data model**: Review records now use `targets: [{ type, selector?, elementText?, elementRect?, viewportRect?, ... }]`.
- **Backward compatibility**: Old records with single `type`/`selector`/`elementRect`/`viewportRect` are migrated to `targets` on load.
- **UI/UX**: Reviewers can collect multiple elements/regions before writing feedback.
- **Bundle size**: Negligible change; mostly logic reorganisation.

## Out of Scope

- Lasso/freehand selection.
- Grouped selection by dragging a marquee over elements.
- Persistent selection across review sessions.
