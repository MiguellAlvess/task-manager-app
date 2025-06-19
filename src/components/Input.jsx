import { forwardRef } from 'react'

import InputLabel from './InputLabel'

const Input = forwardRef(({ label, errorMessage, ...rest }, ref) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 text-[#9A9C9F] outline-[#00ADB5] placeholder:text-sm"
        ref={ref}
        {...rest}
      />
      {errorMessage && (
        <span className="text-left text-xs text-red-500">{errorMessage}</span>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
