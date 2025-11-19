import { Fragment, HTMLAttributes, forwardRef, useState } from 'react'
import cn from 'classnames'
import {
  ArrowDownIcon,
  ArrowsUpDownIcon,
  ArrowUpIcon,
} from '@heroicons/react/24/outline'

interface TableOwnProps {
  head: HeadProps
  body: BodyProps
}

interface HeadProps {
  headers?: Array<string>
  className?: string
  headersComponent?: Array<JSX.Element>
  sortableHeaders?: Array<boolean>
  onSortChange?: (columnIndex: number, direction: 'asc' | 'desc') => void
}

interface BodyProps {
  bodyComponent: Array<RowProps>
  className?: string
}

interface RowProps {
  data: Array<JSX.Element | string | (JSX.Element & string)>
  onClick?: () => void
  className?: string
}

type TablePropsRootAttributes = Pick<
  HTMLAttributes<HTMLTableElement>,
  'className' | 'style' | 'id'
>

type TableProps = TablePropsRootAttributes & TableOwnProps

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className = '', body, head, ...rest }, ref) => {
    const [sortConfig, setSortConfig] = useState<{
      column: number
      direction: 'asc' | 'desc'
    } | null>(null)

    const handleSort = (index: number) => {
      if (!head.sortableHeaders?.[index]) return

      let direction: 'asc' | 'desc' = 'desc'
      if (sortConfig?.column === index) {
        direction = sortConfig.direction === 'desc' ? 'asc' : 'desc'
      }

      setSortConfig({ column: index, direction })
      head.onSortChange?.(index, direction)
    }

    return (
      <table className={`table-auto ${className}`} ref={ref} {...rest}>
        <thead>
          <tr>
            {head.headers &&
              head.headers.map((header, index) => {
                const isSortable = head.sortableHeaders?.[index]
                const isActive = sortConfig?.column === index

                return (
                  <th
                    key={`header-${index}`}
                    className="px-4 py-3 border-b border-b-grayscale-200 text-left whitespace-nowrap select-none"
                    onClick={() => handleSort(index)}
                  >
                    <span
                      className={cn(
                        'flex text-grayscale-500 font-normal gap-4',
                        isSortable &&
                          'cursor-pointer hover:text-grayscale-800 hover:stroke-grayscale-800',
                      )}
                    >
                      {header}
                      {isSortable && (
                        <>
                          {isActive ? (
                            sortConfig.direction === 'asc' ? (
                              <ArrowUpIcon
                                className="w-4 h-4"
                                strokeWidth={2}
                              />
                            ) : (
                              <ArrowDownIcon
                                className="w-4 h-4"
                                strokeWidth={2}
                              />
                            )
                          ) : (
                            <ArrowsUpDownIcon
                              className="w-4 h-4"
                              strokeWidth={1}
                            />
                          )}
                        </>
                      )}
                    </span>
                  </th>
                )
              })}
            {head.headersComponent &&
              head.headersComponent.map((header, index) => {
                return <Fragment key={`header-${index}`}>{header}</Fragment>
              })}
          </tr>
        </thead>
        <tbody>
          {body.bodyComponent.map(({ data, onClick, className }, index) => {
            return (
              <tr
                key={`tr-item-${index}`}
                {...(onClick && { onClick })}
                className={cn(
                  'border-b border-b-grayscale-200 transition-colors',
                  onClick && 'cursor-pointer hover:bg-primary-50',
                  className,
                )}
              >
                {data.map((item, subIndex) => {
                  return (
                    <td
                      className="px-4 py-5 text-left"
                      key={`item-${subIndex}`}
                    >
                      {item}
                    </td>
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  },
)

Table.displayName = 'Table'
