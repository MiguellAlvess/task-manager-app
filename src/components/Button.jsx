import PropTypes from 'prop-types'
import { tv } from 'tailwind-variants'

const Button = ({
  children,
  color = 'primary',
  size = 'small',
  className,
  ...rest
}) => {
  const button = tv({
    base: `flex items-center justify-center gap-2 rounded-md px-3 font-semibold transition hover:opacity-75`,
    variants: {
      color: {
        primary: 'bg-brand-primary text-white',
        secundary: 'bg-brand-light-gray text-brand-dark-blue',
        ghost: 'bg-transparent text-brand-dark-gray',
        danger: 'bg-brand-danger text-brand-white',
      },
      size: {
        small: 'py-1 text-xs',
        large: 'py-2 text-sm',
      },
      disabled: {
        true: 'opacity-50 cursor-not-allowed hover:opacaty-50',
      },
    },
    defaultVariants: {
      color: 'primary',
      size: 'small',
    },
  })

  return (
    <button
      className={button({ color, disabled: rest.disabled, size, className })}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  color: PropTypes.oneOf(['primary', 'secundary', 'ghost', 'danger']),
  size: PropTypes.oneOf(['small', 'large']),
  className: PropTypes.string,
}

export default Button
