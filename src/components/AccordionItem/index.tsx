// RestrictedSection.tsx
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import classNames from 'classnames'
import React, { useState } from 'react'

type AccordionItemProps = {
  title?: string
  content?: string
  className?: string
  width?: string
}

export const AccordionItem: React.FC<AccordionItemProps> = ({
  title,
  content,
  className = '',
  width = '700px',
}) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const toggleExpand = () => setIsExpanded(!isExpanded)

  return (
    <div
      className={classNames(
        className,
        'max-w-full p-6 border border-gray-300 rounded-lg mb-8',
      )}
      style={{ width }}
    >
      <div
        className={classNames(
          `flex justify-between items-center w-full`,
          isExpanded && 'mb-4',
        )}
      >
        <span className="font-semibold text-slate-700">{title}</span>

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
          'overflow-hidden transition-all duration-300 border-gray-300 border-t',
          isExpanded ? 'max-h-40 opacity-100 mt-3 pt-4' : 'max-h-0 opacity-0',
        )}
      >
        <p className="text-slate-700 leading-6">{content}</p>
      </div>
    </div>
  )
}
