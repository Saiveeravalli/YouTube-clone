import './index.css'

import {Component} from 'react'

import {FaSearch} from 'react-icons/fa'

import {IoIosClose} from 'react-icons/io'

import {Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import Header from '../Header'

import SideControl from '../SideControls'

import ThemeChangeContext from '../../context/ThemeChange'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  fail: 'FAIL',
}

class Home extends Component {
  state = {
    theme: false,
    banner: true,
    videoDetails: [],
    apiVideoSatus: apiStatusConstants[0],
    searchVideos: '',
  }

  componentDidMount() {
    this.getHomeVideo()
  }

  onSearchVideo = event => {
    // const {searchVideos} = this.state
    this.setState({searchVideos: event.target.value})
  }

  getHomeVideo = async () => {
    const {searchVideos} = this.state
    this.setState({apiVideoSatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/videos/all?search=${searchVideos}`
    const jToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jToken}`,
      },
      method: 'GET',
    }
    const data = await fetch(url, options)
    console.log(data)
    if (data.ok === true) {
      const jData = await data.json()

      const updateData = jData.videos.map(eachItem => ({
        name: eachItem.channel.name,
        profileImageUrl: eachItem.channel.profile_image_url,
        id: eachItem.id,
        publishedAt: eachItem.published_at,
        thumbnailUrl: eachItem.thumbnail_url,
        title: eachItem.title,
        viewCount: eachItem.view_count,
      }))
      this.setState({
        videoDetails: updateData,
        apiVideoSatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiVideoSatus: apiStatusConstants.failure})
    }
  }

  onSearch = () => {
    this.getHomeVideo()
  }

  onThemeChange = () => {
    const {theme} = this.state
    this.setState({theme: !theme})
  }

  onClose = () => {
    const {banner} = this.state
    this.setState({banner: !banner})
  }

  // onSideMenu = () => (
  //   <div className="side-container">
  //     <ul type="none" className="list-items">
  //        <li className="li-1">
  //          <IoMdHome className="icon" />
  //          <p className="des">Home</p>
  //        </li>
  //       <li className="li-1">
  //         <FaFire className="icon" />
  //         <p className="des">Trending</p>
  //       </li>
  //       <li className="li-1">
  //         <FaGamepad className="icon" />
  //         <p className="des">Gaming</p>
  //       </li>
  //       <li className="li-1">
  //         <FaFolderPlus className="icon" />
  //         <p className="des">Saved videos</p>
  //       </li>
  //     </ul>
  //     <div className="botton-box">
  //       <h1 className="title">CONTACT US</h1>

  //       <div className="social-icons">
  //         <img
  //           src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
  //           alt="facebook logo"
  //           className="face"
  //         />
  //         <img
  //           src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
  //           alt="twitter logo"
  //           className="face"
  //         />
  //         <img
  //           src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
  //           alt="linked in logo"
  //           className="face"
  //         />
  //       </div>
  //       <p className="bio-des">
  //         Enjoy! Now to see your
  //         <br /> channels and
  //         <br /> recommendations!
  //       </p>
  //     </div>
  //   </div>
  // )

  renderSearchFailure = () => (
    // const {searchVideos} = this.state

    <div className="failure-box">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        className="fail-img"
      />
      <h1 className="fail-head">No Search results found</h1>
      <p className="fail-des">
        Try different key words or remove search filter
      </p>
      <button className="retry-bttn" type="button" onClick={this.reset}>
        Retry
      </button>
    </div>
  )

  onVideoBox = () => (
    <ThemeChangeContext.Consumer>
      {value => {
        const {themeState} = value

        const {videoDetails} = this.state
        const homeBg = themeState ? 'channel-page' : 'Container-bg-home'

        console.log(videoDetails)
        return (
          <div className="con-1">
            {videoDetails.length >= 1 ? (
              <ul type="none" className="list-box">
                {videoDetails.map(eachItem => (
                  <Link to={`/videos/${eachItem.id}`} className="videos-Link">
                    <li className="li-2" key={eachItem.id}>
                      <img
                        src={eachItem.thumbnailUrl}
                        alt="video thumbnail"
                        className="thumbImg"
                      />
                      <div className={homeBg}>
                        <img
                          src={eachItem.profileImageUrl}
                          alt="profilePage"
                          className="profile"
                        />
                        <p className="page-title">{eachItem.title}</p>
                      </div>
                    </li>
                  </Link>
                ))}
              </ul>
            ) : (
              <div>{this.renderSearchFailure()}</div>
            )}
          </div>
        )
      }}
    </ThemeChangeContext.Consumer>
  )

  onEnter = event => {
    if (event.key === 'Enter') {
      this.getHomeVideo()
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#4f46e5" height="50" width="50" />
    </div>
  )

  reset = () => {
    this.getHomeVideo()
  }

  renderFailure = () => {
    const {theme} = this.state
    const failuretheme = theme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'
    return (
      <div className="failure-box">
        <img src={failuretheme} alt="failure view" className="fail-img" />
        <h1 className="fail-head">Oops! Something Went Wrong</h1>
        <p className="fail-des">
          We are having some trouble to complete your request. Please try again.
        </p>
        <button className="retry-bttn" type="button" onClick={this.reset}>
          Retry
        </button>
      </div>
    )
  }

  renderJobItemSwitch = () => {
    const {apiVideoSatus} = this.state
    switch (apiVideoSatus) {
      case apiStatusConstants.success:
        return this.onVideoBox()
      case apiStatusConstants.failure:
        return this.renderFailure()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      default:
        return null
    }
  }

  renderHomeBox = () => (
    <ThemeChangeContext.Consumer>
      {value => {
        const {themeState} = value

        const {banner} = this.state

        const isBanner = banner ? 'banner' : 'banner-false'

        const themeColor = themeState ? 'Container' : 'darkTheme'

        return (
          <div className={themeColor} data-testid="home">
            <Header />

            <div className="banner-box">
              <SideControl />
              <div className="video-box">
                <div className={isBanner}>
                  <div className="box-1">
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="nxt watch logo"
                      className="logo"
                    />
                    <button
                      className="banner-close-bttn"
                      type="button"
                      aria-label="close"
                      onClick={this.onClose}
                      data-testid="close"
                    >
                      <IoIosClose className="close" />
                    </button>
                  </div>
                  <p className="banner-title">
                    Buy Nxt Watch Premium prepaid plans with UPI
                  </p>
                  <button className="get-bttn" type="button">
                    GET IT NOW
                  </button>
                </div>
                <div className="search-video-box">
                  <div className="search-box">
                    <input
                      type="search"
                      className="search"
                      placeholder="search"
                      onChange={this.onSearchVideo}
                      onKeyDown={this.onEnter}
                    />
                    <button
                      className="search-icon"
                      type="button"
                      aria-label="searchc"
                    >
                      <FaSearch
                        className="search-logo"
                        onClick={this.onSearch}
                      />
                    </button>
                  </div>
                  {this.renderJobItemSwitch()}
                </div>
              </div>
            </div>
          </div>
        )
      }}
    </ThemeChangeContext.Consumer>
  )

  render() {
    const {theme, banner, searchVideos} = this.state
    console.log(searchVideos)

    const themeColor = theme ? 'Container' : 'darkTheme'
    const searchIcon = theme ? 'dark-bg' : 'search-icon'
    const isBanner = banner ? 'banner' : 'banner-false'
    console.log(themeColor)
    console.log(searchIcon)
    console.log(isBanner)

    return <div className="b-1-1">{this.renderHomeBox()}</div>
  }
}

export default Home
