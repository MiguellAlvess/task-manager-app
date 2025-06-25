import PropTypes from 'prop-types'
import { forwardRef } from 'react'

import InputErrorMessage from './InputErrorMessage'
import InputLabel from './InputLabel'

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-brand-border px-4 py-3 text-brand-text-gray outline-brand-primary placeholder:text-sm"
        ref={ref}
        {...rest}
      />
      {errorMessage && <InputErrorMessage>{errorMessage}</InputErrorMessage>}
    </div>
  )
})

Input.displayName = 'Input'
Input.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  placeHolder: PropTypes.string,
  id: PropTypes.string.isRequired,
}

export default Input
