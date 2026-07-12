# Spec Delta: Overlay Z-Index and Resizable Panels

## ADDED Requirements

### Requirement: Overlay Below Dialogs
WHEN the review form, list drawer, component tree drawer, or confirmation modal is open,
系统 SHALL render those panels above the semi-transparent review overlay.

#### Scenario: Open form
GIVEN the review overlay is active
WHEN the review form opens
THEN the form is clickable and not obscured by the overlay.

### Requirement: Draggable Review Form
WHEN the reviewer drags the review form header,
系统 SHALL move the form with the mouse.

#### Scenario: Reposition form
GIVEN the review form is open
WHEN the reviewer drags the form title bar
THEN the form moves to the new position.

### Requirement: Resizable Review Form
WHEN the reviewer drags the resize handle at the form's bottom-right corner,
系统 SHALL resize the form's width and height.

#### Scenario: Enlarge form
GIVEN the review form is open
WHEN the reviewer drags the bottom-right handle down and right
THEN the form becomes larger.

### Requirement: Resizable Toolbar
WHEN the reviewer drags the resize handle at the toolbar's bottom-right corner,
系统 SHALL resize the toolbar.

#### Scenario: Widen toolbar
GIVEN the review toolbar is visible
WHEN the reviewer drags the bottom-right handle to the right
THEN the toolbar becomes wider.

### Requirement: Drag/Resize Events Do Not Trigger Selection
WHEN the reviewer drags or resizes a panel,
系统 SHALL NOT treat the action as an element selection or box drag.

## MODIFIED Requirements

None.

## REMOVED Requirements

None.
