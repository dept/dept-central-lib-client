import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import React, { useState } from 'react'

type AccordionItemProps = {
  title: string
  content: React.ReactNode
}

type AccordionProps = {
  items: AccordionItemProps[]
  className?: string
  width?: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div className="max-w-full py-4 border-b border-grayscale-300">
      <div className={classNames(`flex justify-between items-center w-full`)}>
        <span className="font-semibold text-grayscale-800 cursor-pointer" onClick={toggleExpand}>
          {title}
        </span>

        <button
          onClick={toggleExpand}
          aria-expanded={isExpanded}
          className="ml-3"
        >
          {isExpanded ? (
            <ChevronUpIcon
              className="w-6 h-6 cursor-pointer"
              strokeWidth={2}
              stroke={'#704FFB'}
            />
          ) : (
            <ChevronDownIcon
              className="w-6 h-6 cursor-pointer"
              strokeWidth={2}
              stroke={'#704FFB'}
            />
          )}
        </button>
      </div>

      <div
        className={classNames(
          'overflow-hidden transition-all duration-300',
          isExpanded ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0',
        )}
      >
        <div className="text-grayscale-800 leading-6">{content}</div>
      </div>
    </div>
  )
}

export const Accordion: React.FC<AccordionProps> = ({
  items,
  className = '',
  width = '700px',
}) => {
  return (
    <div className={className} style={{ width }}>
      {items.map((item, index) => (
        <AccordionItem key={index} title={item.title} content={item.content} />
      ))}
    </div>
  )
}
