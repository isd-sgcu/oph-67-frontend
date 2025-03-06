'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import * as React from 'react'
import { DayPicker } from 'react-day-picker'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/cn'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

const Calendar: React.FC<CalendarProps> = ({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}) => {
  const [selectedYear, setSelectedYear] = React.useState(
    new Date().getFullYear()
  )
  const [selectedMonth, setSelectedMonth] = React.useState(
    new Date().getMonth()
  )

  const handleYearChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedYear(Number(event.target.value))
  }

  const handleMonthChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setSelectedMonth(Number(event.target.value))
  }

  const years = Array.from({ length: 101 }, (_, i) => 2025 - 100 + i)
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return (
    <div className='space-y-4'>
      <div className='rounded-md border border-[#064E41] bg-white p-3 text-[#064E41]'>
        <div className='mb-3 flex items-center justify-center gap-2 text-sm'>
          <select
            className='w-2/3 rounded-md border p-2'
            value={selectedMonth}
            onChange={handleMonthChange}
          >
            {months.map((month, index) => (
              <option key={month} value={index}>
                {month}
              </option>
            ))}
          </select>
          <select
            className='w-1/3 rounded-md border p-2'
            value={selectedYear}
            onChange={handleYearChange}
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <DayPicker
          className={cn('bg-white p-3', className)}
          month={new Date(selectedYear, selectedMonth)}
          showOutsideDays={showOutsideDays}
          classNames={{
            months:
              'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
            month: 'space-y-4',
            caption: 'flex justify-center pt-1 relative items-center',
            caption_label: 'text-sm font-medium',
            nav: 'space-x-1 flex items-center',
            nav_button: cn(
              buttonVariants({ variant: 'outline' }),
              'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
            ),
            nav_button_previous: 'absolute left-1',
            nav_button_next: 'absolute right-1',
            table: 'w-full border-collapse space-y-1',
            head_row: 'flex',
            head_cell:
              'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
            row: 'flex w-full mt-2',
            cell: cn(
              'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
              props.mode === 'range'
                ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
                : '[&:has([aria-selected])]:rounded-md'
            ),
            day: cn(
              buttonVariants({ variant: 'ghost' }),
              'h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-white hover:border hover:border-[#064E41]'
            ),
            day_range_start: 'day-range-start',
            day_range_end: 'day-range-end',
            day_selected:
              'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
            day_today: 'bg-accent text-accent-foreground',
            day_outside:
              'day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground',
            day_disabled: 'text-muted-foreground opacity-50',
            day_range_middle:
              'aria-selected:bg-accent aria-selected:text-accent-foreground',
            day_hidden: 'invisible',
            ...classNames,
          }}
          components={{
            IconLeft,
            IconRight,
          }}
          onMonthChange={(date) => {
            setSelectedYear(date.getFullYear())
            setSelectedMonth(date.getMonth())
          }}
          {...props}
        />
      </div>
    </div>
  )
}

const IconLeft: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => <ChevronLeft className={cn('h-4 w-4', className)} {...props} />

const IconRight: React.FC<React.SVGProps<SVGSVGElement>> = ({
  className,
  ...props
}) => <ChevronRight className={cn('h-4 w-4', className)} {...props} />

Calendar.displayName = 'Calendar'

export { Calendar }
