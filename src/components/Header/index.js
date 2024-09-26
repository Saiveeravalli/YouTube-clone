import './index.css'

import Cookies from 'js-cookie'

import {withRouter} from 'react-router-dom'

import {FaBars, FaMoon, FaRegSun} from 'react-icons/fa'

import {FiLogOut} from 'react-icons/fi'

import ThemeChangeContext from '../../context/ThemeChange'

const Header = props => (
  <ThemeChangeContext.Consumer>
    {value => {
      const {themeState, changeTheme} = value

      console.log(themeState)

      const onThemeChange = () => {
        changeTheme()
      }

      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const logo = themeState
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

      const bg = themeState ? 'lightBg' : 'main-con'

      return (
        <div className={bg}>
          <nav className="Nav-bar">
            <img src={logo} alt="nxt watch logo" className="logo-img" />
            <div className="icons-tabs">
              <button
                className="theme-bttn"
                data-testid="theme"
                type="button"
                onClick={onThemeChange}
              >
                {themeState ? (
                  <FaMoon className="light-icon" />
                ) : (
                  <FaRegSun className="light-icon" />
                )}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
                className="profile"
              />
              <button className="bttn" type="button" onClick={onLogout}>
                Logout
              </button>
              <FaBars className="logout" />
              <FiLogOut className="logout" />
            </div>
          </nav>
        </div>
      )
    }}
  </ThemeChangeContext.Consumer>
)

export default withRouter(Header)
