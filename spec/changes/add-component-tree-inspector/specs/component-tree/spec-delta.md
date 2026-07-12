# Spec Delta: Component Tree Inspector

## ADDED Requirements

### Requirement: DOM Tree Inspection
WHEN a reviewer selects an element for review,
系统 SHALL provide a DOM tree view showing the ancestor chain from `document.body` to the selected element.

#### Scenario: Show ancestor chain
GIVEN the reviewer has selected an element
WHEN the component tree panel is opened
THEN the system displays a tree where each node represents an ancestor DOM element
AND each node shows the element's tag name, id, and classes.

### Requirement: Framework Component Tree Inspection
WHEN a reviewer selects an element for review,
系统 SHALL attempt to display the Vue or React component hierarchy that rendered the selected element.

#### Scenario: Vue component detected
GIVEN the page is a Vue application and the selected element has a detectable Vue component owner
WHEN the component tree panel is opened
THEN the framework tree shows component names (e.g., `App > Layout > DashboardCard`).

#### Scenario: React component detected
GIVEN the page is a React application and the selected element has a detectable React Fiber owner
WHEN the component tree panel is opened
THEN the framework tree shows component names (e.g., `App > Layout > DashboardCard`).

#### Scenario: Framework internals unavailable
GIVEN the framework internals cannot be detected (production build, no devtools, minified names)
WHEN the component tree panel is opened
THEN the system shows only the DOM tree
AND does not throw an error.

### Requirement: Node Metadata Display
FOR each node in the component tree,
系统 SHALL display:
- the CSS selector path,
- the bounding rectangle (`x`, `y`, `width`, `height`),
- the ARIA role,
- the accessible name.

#### Scenario: Element with aria-label
GIVEN a tree node corresponds to a button with `aria-label="Submit"`
WHEN the node is rendered
THEN it shows `role=button` and `accessibleName=Submit`.

### Requirement: Tree Node Highlight
WHEN the reviewer hovers over a tree node,
系统 SHALL highlight the corresponding element on the page with the same hover style used in element selection mode.

#### Scenario: Hover node highlights element
GIVEN the component tree panel is open
WHEN the reviewer hovers a node
THEN the corresponding page element receives a blue highlight overlay.

### Requirement: Tree Node Selection
WHEN the reviewer clicks a tree node,
系统 SHALL select that element as the active review target
AND update the review form with the node's selector and metadata.

#### Scenario: Select ancestor from tree
GIVEN the component tree panel is open
WHEN the reviewer clicks a parent node
THEN the review form updates to target that parent element
AND its highlight changes to the selected-element style.

### Requirement: Persist Component Tree in Review Record
WHEN a review is saved,
系统 SHALL store a snapshot of the component tree for the selected element.

#### Scenario: Saved review includes tree
GIVEN the reviewer saves an element review
WHEN the review record is stored
THEN it contains `componentTree.dom` and `componentTree.framework` fields.

## MODIFIED Requirements

None.

## REMOVED Requirements

None.
