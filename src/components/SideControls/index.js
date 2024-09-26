import './index.css'
import {Link} from 'react-router-dom'

import {FaFire, FaGamepad, FaFolderPlus} from 'react-icons/fa'
import {IoMdHome} from 'react-icons/io'

import ThemeChangeContext from '../../context/ThemeChange'

const SideControl = () => (
  <ThemeChangeContext.Consumer>
    {value => {
      const {themeState} = value
      console.log(themeState)

      const sideBg = themeState ? 'side-container' : 'light-side-bg'
      const bottBg = themeState ? 'dark-font' : 'c-light-color'

      return (
        <div className={sideBg}>
          <ul type="none" className="list-items">
            <Link to="/" className="link-home">
              <li className="li-1">
                <IoMdHome className="icon" />
                <p className="des">Home</p>
              </li>
            </Link>
            <li className="li-1">
              <FaFire className="icon" />
              <p className="des">Trending</p>
            </li>
            <li className="li-1">
              <FaGamepad className="icon" />
              <p className="des">Gaming</p>
            </li>
            <Link to="/SavedVideos" className="link-home">
              <li className="li-1">
                <FaFolderPlus className="icon" />
                <p className="des">Saved videos</p>
              </li>
            </Link>
          </ul>
          <div className="botton-box">
            <h1 className={bottBg}>CONTACT US</h1>

            <div className="social-icons">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
                className="face"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
                className="face"
              />
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
                className="face"
              />
            </div>
            <p className="bio-des">
              Enjoy! Now to see your
              <br /> channels and
              <br /> recommendations!
            </p>
          </div>
        </div>
      )
    }}
  </ThemeChangeContext.Consumer>
)

export default SideControl
