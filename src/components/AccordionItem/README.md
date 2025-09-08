# AccordionItem Component

The `AccordionItem` component is used to show and hide additional content inside a collapsible card.

## Usage

```jsx
// Import component
import { AccordionItem } from 'dept-central-lib-client'
```

```jsx
// Example usage
<AccordionItem
  title="Accordion Title"
  content="This is the content displayed inside the accordion."
/>
```

User prop implements the following interface:
```tsx
interface User {
  name: string
  email?: string
  image?: string
}
```

## Props

| Prop        | Type                                                                    | Description                                          | Default Value |
| ----------- | ----------------------------------------------------------------------- | ---------------------------------------------------- | ------------- |
| title       | string                                                                  | The text displayed in the accordion header.          | -             |
| content     | string                                                                  | The content revealed when the accordion is expanded. | -             |
| className   | string                                                                  | Custom CSS className.                                | ""            |
| width       | string                                                                  | Specifies the card width.                            | "700px"       |


## Examples

```jsx
// Simple accordion
<AccordionItem
  title="Accordion Title"
  content="This is the content displayed inside the accordion."
/>

// Accordion with long text
<AccordionItem
  title="Details"
  content="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet."
/>

// Accordion with custom styles
<AccordionItem
  title="Custom Styled Accordion"
  content="This accordion has extra Tailwind classes."
  className="border border-blue-500 rounded-xl p-4"
/>

// Accordion with custom width
<AccordionItem
  title="Wide Accordion"
  content="This accordion takes more space."
  width="w-full"
/>
```

## Go main README

[Main README](../../../README.md#components)

