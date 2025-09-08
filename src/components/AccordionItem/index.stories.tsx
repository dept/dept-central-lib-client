import { Meta, StoryObj } from '@storybook/react'
import { AccordionItem } from '.'

export default {
  title: 'Components/AccordionItem',
  component: AccordionItem,
  parameters: {
    docs: {
      toc: {
        title: 'On this page',
        disable: false,
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    title: {
      control: 'text',
      description: 'Accordion item title',
      table: {
        type: { summary: 'string' },
      },
    },
    content: {
      control: 'text',
      description: 'Content displayed inside the accordion item',
      table: {
        type: { summary: 'string' },
      },
    },
    className: {
      control: 'text',
      description: 'Additional classes for customization',
      table: {
        type: { summary: 'string' },
      },
    },
  },
} as Meta<typeof AccordionItem>

type Story = StoryObj<typeof AccordionItem>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<AccordionItem title="Title" content="Accordion content" />`,
      },
    },
  },
  args: {
    title: 'Accordion Item Title',
    content: 'This is the content displayed inside the accordion item.',
  },
}

export const WithLongContent: Story = {
  parameters: {
    docs: {
      source: {
        code: `<AccordionItem title="Accordion with long text" content="Lorem ipsum dolor sit amet..." />`,
      },
    },
  },
  args: {
    title: 'Accordion with long text',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.',
  },
}
