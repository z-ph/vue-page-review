# Spec Delta: Multi-Target Review Interaction

## ADDED Requirements

### Requirement: No Auto-Open Review Form
WHEN a reviewer selects an element or finishes a box drag,
系统 SHALL NOT open the review form automatically.

#### Scenario: Click element
GIVEN the tool is in element selection mode
WHEN the reviewer clicks an element
THEN the element is highlighted as selected
AND the review form remains closed.

#### Scenario: Finish box drag
GIVEN the tool is in box selection mode
WHEN the reviewer finishes dragging a box
THEN the box stays visible on the page
AND the review form remains closed.

### Requirement: Multi-Select Elements with Ctrl/Cmd
WHEN the reviewer holds Ctrl (or Cmd on macOS) and clicks elements,
系统 SHALL add or remove each clicked element from the current selection.

#### Scenario: Add second element
GIVEN one element is already selected
WHEN the reviewer Ctrl-clicks a second element
THEN both elements are highlighted as selected.

#### Scenario: Remove selected element
GIVEN two elements are selected
WHEN the reviewer Ctrl-clicks one of them
THEN only the other element remains selected.

### Requirement: Click Without Modifier Replaces Selection
WHEN the reviewer clicks an element without holding Ctrl/Cmd,
系统 SHALL clear any previous element and box selections
AND select only the clicked element.

### Requirement: Multi-Box Selection
WHEN the reviewer drags a box while holding Ctrl/Cmd,
系统 SHALL add the new box to the existing selection.

#### Scenario: Add second box
GIVEN one box is already selected
WHEN the reviewer Ctrl-drags a second box
THEN both boxes remain visible and selected.

### Requirement: Box Resize
WHEN the reviewer drags a resize handle on a selected box,
系统 SHALL update that box's position and size in real time.

#### Scenario: Enlarge box
GIVEN a box is selected
WHEN the reviewer drags its south-east handle down and right
THEN the box becomes larger and stays at the new size after mouse up.

### Requirement: Review Button
WHEN at least one target is selected,
系统 SHALL enable a "评审(N)" toolbar button that opens the review form.

#### Scenario: Open form for two elements
GIVEN two elements are selected
WHEN the reviewer clicks "评审(2)"
THEN the review form opens
AND the form shows both elements as targets.

### Requirement: Clear Selection Button
WHEN the reviewer clicks a "取消选择" toolbar button,
系统 SHALL clear all selected elements and boxes
AND remove their highlights from the page.

### Requirement: Multi-Target Data Model
WHEN a review is saved,
系统 SHALL store a `targets` array containing all selected targets.

#### Scenario: Mixed targets
GIVEN the reviewer selected one element and one box
WHEN the review is saved
THEN the record contains `targets: [{ type: 'element', ... }, { type: 'viewport', ... }]`.

### Requirement: Backward Compatibility
WHEN existing single-target records are loaded from storage,
系统 SHALL migrate them to the new `targets` array format.

## MODIFIED Requirements

- Screenshot options in the review form change from per-type options to:
  - 选中目标 (captures one screenshot per selected target)
  - 当前视口
  - 完整页面

## REMOVED Requirements

- Immediate form open on element click or box mouse-up.
- Single-target fields (`type`, `selector`, `elementRect`, `viewportRect`) as primary storage; they are now kept only inside `targets[0]` for migrated old records.
