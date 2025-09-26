import { Meta, StoryObj } from '@storybook/react'
import { Accordion } from '.'

export default {
  title: 'Components/Accordion',
  component: Accordion,
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
    items: {
      control: 'object',
      description:
        'Array of accordion items with title and content (string | ReactNode)',
      table: {
        type: { summary: '{ title: string; content: React.ReactNode }[]' },
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
} as Meta<typeof Accordion>

type Story = StoryObj<typeof Accordion>

export const Default: Story = {
  parameters: {
    docs: {
      source: {
        code: `<Accordion items={[{ title: 'Item 1', content: 'Content 1' }, { title: 'Item 2', content: 'Content 2' }]} />`,
      },
    },
  },
  args: {
    items: [
      { title: 'Accordion Item 1', content: 'This is the content of item 1.' },
      { title: 'Accordion Item 2', content: 'This is the content of item 2.' },
      { title: 'Accordion Item 3', content: 'This is the content of item 3.' },
    ],
  },
}

export const WithLongContent: Story = {
  args: {
    items: [
      {
        title: 'Accordion with long content',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet.',
      },
      {
        title: 'Another Item',
        content: 'Short content here.',
      },
    ],
  },
  parameters: {
    docs: {
      source: {
        code: `<Accordion items={[{ title: 'Accordion with long content', content: 'Lorem ipsum...' }, { title: 'Another Item', content: 'Short content' }]} />`,
      },
    },
  },
}

export const WithRichContent: Story = {
  args: {
    items: [
      {
        title: 'With bullet points',
        content: (
          <ul className="list-disc pl-5 text-grayscale-800">
            <li>First point</li>
            <li>Second point</li>
            <li>
              <strong>Highlighted</strong> point
            </li>
          </ul>
        ),
      },
      {
        title: 'With link',
        content: (
          <p>
            Go to{' '}
            <a href="https://example.com" className="text-blue-600 underline">
              this page
            </a>
            .
          </p>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      source: {
        code: `
          <Accordion
            items={[
              {
                title: 'With bullet points',
                content: (
                  <ul className="list-disc pl-5">
                    <li>First point</li>
                    <li>Second point</li>
                    <li><strong>Highlighted</strong> point</li>
                  </ul>
                )
              },
              {
                title: 'With link',
                content: (
                  <p>
                    Go to <a href="https://example.com">this page</a>.
                  </p>
                )
              }
            ]}
          />`,
      },
    },
  },
}
