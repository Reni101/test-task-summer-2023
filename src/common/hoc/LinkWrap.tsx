import { FC, memo, ReactNode } from 'react'
import { NavLink } from 'react-router-dom'
interface PropsType {
  children: ReactNode
  href: string | null
  className: string
  vacancyId: number
}

export const LinkWrap: FC<PropsType> = memo(({ children, href, className, vacancyId }) => {
  if (href) {
    return (
      <NavLink data-elem={`vacancy-${vacancyId}`} className={className} to={href}>
        {children}
      </NavLink>
    )
  } else {
    return <div className={className}>{children}</div>
  }
})
