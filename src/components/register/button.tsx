import { Slot } from '@radix-ui/react-slot'
import { type VariantProps, cva } from 'class-variance-authority'
import * as React from 'react'

import { cn } from '@/lib/cn'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        filled:
          'bg-[#076855] text-white hover:opacity-80 focus-visible:ring-[#064E41]',
        outline: '',
        disabled: 'bg-disabled text-white',
        ghost: 'hover:bg-[#064E41]',
      },
      size: {
        default: 'h-9 px-9 py-6',
        sm: 'h-8 px-3 text-xs',
        lg: 'h-10 px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  inClassName?: string
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      asChild = false,
      inClassName,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    return variant === 'outline' ? (
      <button className='rounded-full p-1' type='button' {...props}>
        <div
          className={cn(
            'h-full w-full cursor-pointer rounded-full bg-white px-4',
            inClassName
          )}
        >
          {children}
        </div>
      </button>
    ) : (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            size,
            className,
          })
        )}
        {...props}
      >
        {children}
      </Comp>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }
