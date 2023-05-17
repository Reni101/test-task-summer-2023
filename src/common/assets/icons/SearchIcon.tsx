import React, { FC } from 'react'

interface PropsType {
  className?: string
}

export const SearchIcon: FC<PropsType> = ({ className }) => {
  return (
    <svg
      className={className}
      width='15'
      height='15'
      viewBox='0 0 15 15'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M10.468 10.468L13.5714 13.5714M12.0924 6.54622C12.0924 9.60931 9.60931 12.0924 6.54622 12.0924C3.48313 12.0924 1 9.60931 1 6.54622C1 3.48313 3.48313 1 6.54622 1C9.60931 1 12.0924 3.48313 12.0924 6.54622Z'
        stroke='#ACADB9'
        strokeWidth='1.5'
        strokeLinecap='round'
      />
    </svg>
  )
}
