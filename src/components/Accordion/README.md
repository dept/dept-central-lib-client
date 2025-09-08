# Accordion Component

The `Accordion` component is used to show and hide additional content inside a collapsible card.

## Usage

```jsx
// Import component
import { Accordion } from 'dept-central-lib-client'
```

```jsx
// Example usage
const items = [
  { title: 'Accordion Title 1', content: 'This is the content for item 1.' },
  { title: 'Accordion Title 2', content: 'This is the content for item 2.' },
]

<Accordion items={items} />
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

| Prop      | Type                                 | Description                                        | Default Value |
| --------- | ------------------------------------ | -------------------------------------------------- | ------------- |
| items     | { title: string; content: string }[] | Array of objects representing each accordion item. | -             |
| className | string                               | Custom CSS className.                              | ""            |
| width     | string                               | Specifies the card width.                          | "700px"       |

## Examples

```jsx
// Simple accordion
<Accordion
  items={[
    { title: 'Item 1', content: 'Content for item 1' },
    { title: 'Item 2', content: 'Content for item 2' },
  ]}
/>

// Accordion with long text
<Accordion
  items={[
    {
      title: 'Details',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.',
    },
  ]}
/>

// Accordion with custom styles
<Accordion
  className="border border-blue-500 rounded-xl p-4"
  items={[
    { title: 'Styled Item', content: 'This item has custom container styles.' },
  ]}
/>

// Accordion with custom width
<Accordion
  width="100%"
  items={[
    { title: 'Wide Item', content: 'This accordion takes the full width.' },
  ]}
/>
```

## Go main README

[Main README](../../../README.md#components)
