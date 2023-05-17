import React, { FC } from 'react'
interface PropsType {
  className?: string
}

export const CancelIcon: FC<PropsType> = ({ className }) => {
  return (
    <svg
      className={className}
      width='16'
      height='16'
      viewBox='0 0 16 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <line
        x1='11.7425'
        y1='4.44219'
        x2='4.44197'
        y2='11.7427'
        stroke='currentColor'
        strokeWidth='1.25'
      />
      <line
        x1='11.9013'
        y1='11.7425'
        x2='4.60082'
        y2='4.44197'
        stroke='currentColor'
        strokeWidth='1.25'
      />
    </svg>
  )
}
