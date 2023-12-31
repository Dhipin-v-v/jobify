import links from '../utils/links'
import { NavLink } from 'react-router-dom'
const NavLinks = ({toggleSidebar}) => {
  return (
    <div className='nav-links'>
      {links.map((item) => {
        const { text, path, id, icon } = item
        return (
          <NavLink
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            to={path}
            key={id}
            onClick={toggleSidebar}
          >
            <span className='icon'>{icon}</span>
            {text}
          </NavLink>
        )
      })}
    </div>
  )
}

export default NavLinks
