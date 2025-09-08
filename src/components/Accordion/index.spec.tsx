import { render, fireEvent } from '@testing-library/react'
import { AccordionItem, Accordion } from '.'
import '@testing-library/jest-dom/extend-expect'

describe('AccordionItem Component', () => {
  it('renders the AccordionItem with the correct title', () => {
    const { getByText } = render(
      <AccordionItem title="Test Title" content="Test Content" />,
    )
    expect(getByText('Test Title')).toBeInTheDocument()
  })

  it('does not show content initially', () => {
    const { getByText } = render(
      <AccordionItem title="Title" content="Hidden Content" />,
    )
    const contentContainer = getByText('Hidden Content').parentElement
    expect(contentContainer).toHaveClass('max-h-0', 'opacity-0')
  })

  it('toggles content visibility when button is clicked', () => {
    const { getByText, getByRole } = render(
      <AccordionItem title="Toggle Title" content="Toggle Content" />,
    )
    const button = getByRole('button')
    const contentContainer = getByText('Toggle Content').parentElement

    // Content initially hidden
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(contentContainer).toHaveClass('max-h-0', 'opacity-0')

    // Click to expand
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(contentContainer).toHaveClass('max-h-40', 'opacity-100')

    // Click to collapse
    fireEvent.click(button)
    expect(button).toHaveAttribute('aria-expanded', 'false')
    expect(contentContainer).toHaveClass('max-h-0', 'opacity-0')
  })
})

describe('Accordion Component', () => {
  it('renders multiple AccordionItem components', () => {
    const items = [
      { title: 'Item 1', content: 'Content 1' },
      { title: 'Item 2', content: 'Content 2' },
    ]
    const { getByText } = render(<Accordion items={items} />)

    expect(getByText('Item 1')).toBeInTheDocument()
    expect(getByText('Item 2')).toBeInTheDocument()
    expect(getByText('Content 1').parentElement).toHaveClass('max-h-0')
    expect(getByText('Content 2').parentElement).toHaveClass('max-h-0')
  })
})
