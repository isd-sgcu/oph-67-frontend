import { type SVGAttributes } from 'react'

const Bookmark: React.FC<SVGAttributes<SVGSVGElement>> = ({
  className,
  ...props
}) => (
  <svg
    className={className}
    fill='currentColor'
    height={16}
    width={11}
    xmlns='http://www.w3.org/2000/svg'
    {...props}
  >
    <path d='M.25 14.25v-12c0-.413.147-.766.44-1.06.294-.293.647-.44 1.06-.44h7.5c.412 0 .766.147 1.06.44.293.294.44.647.44 1.06v12L5.5 12 .25 14.25Zm1.5-2.287L5.5 10.35l3.75 1.613V2.25h-7.5v9.713Z' />
  </svg>
)

export default Bookmark
