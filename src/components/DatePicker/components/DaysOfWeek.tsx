import { useDatePicker } from '../use-datepicker'
import { getLocale } from '../../../utils/dates'

export const DaysOfWeek = () => {
  const { state } = useDatePicker()

  const getDaysOfWeekByLocale = (): string[] => {
    const locale = getLocale(state.language)
    const formatter = new Intl.DateTimeFormat(locale, { weekday: 'short' })

    // Monday-first, matching the day grid in DaySelector.
    // Anchor on a known Monday (2024-01-01) in local time to avoid a
    // UTC-construct + local-format day shift in negative-offset timezones.
    return Array.from({ length: 7 }, (_, i) =>
      formatter.format(new Date(2024, 0, 1 + i)),
    )
  }

  const daysOfWeek = getDaysOfWeekByLocale()

  return (
    <div className="grid grid-cols-7 gap-x-1.5 gap-y-1 place-items-center mb-2">
      {daysOfWeek.map((day) => (
        <span
          key={day}
          className="w-10 h-10 flex justify-center items-center text-center text-grayscale-900"
        >
          {day}
        </span>
      ))}
    </div>
  )
}
