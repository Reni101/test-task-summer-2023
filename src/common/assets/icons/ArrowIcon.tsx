import React, { FC } from 'react'

interface PropsType {
  className?: string
  width?: string
  height?: string
  clickHandler?: () => void
}

export const ArrowIcon: FC<PropsType> = ({ className, width, height, clickHandler }) => {
  return (
    <svg
      onClick={clickHandler}
      className={className}
      width={width}
      height={height}
      viewBox='0 0 16 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M1 0.999999L7.21905 6.33061C7.66844 6.7158 8.33156 6.7158 8.78095 6.33061L15 1'
        stroke='#ACADB9'
        strokeWidth={2}
        strokeLinecap='round'
      />
    </svg>
  )
}
