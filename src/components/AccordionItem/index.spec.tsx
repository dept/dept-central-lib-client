import { render, fireEvent } from '@testing-library/react'
import { AccordionItem } from '.'
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

  it('applies custom width if provided', () => {
    const { getByText } = render(
      <AccordionItem title="Custom Width" content="Content" width="500px" />,
    )
    const container = getByText('Custom Width').parentElement?.parentElement
    expect(container).toHaveStyle('width: 500px')
  })

  it('renders custom className if provided', () => {
    const { getByText } = render(
      <AccordionItem
        title="Class Test"
        content="Content"
        className="my-class"
      />,
    )
    const container = getByText('Class Test').parentElement?.parentElement
    expect(container).toHaveClass('my-class')
  })
})
