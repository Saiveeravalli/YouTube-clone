import './index.css'

import ReactPlayer from 'react-player'

// import {formatDistanceToNow} from 'date-fns'
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

// import {
//   FaBars,
//   FaMoon,
//   FaRegSun,
//   FaFire,
//   FaGamepad,
//   FaFolderPlus,
//   FaRegWindowClose,
//   FaSearch,
// } from 'react-icons/fa'

// import {IoMdHome, IoIosClose} from 'react-icons/io'

import {AiOutlineLike, AiOutlineDislike} from 'react-icons/ai'

import {RiMenuAddFill} from 'react-icons/ri'
import SideControls from '../SideControls'
import Header from '../Header'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoItemDetails extends Component {
  state = {
    videoItems: '',
    videoApi: apiStatusConstants[0],
    channalDetails: '',
    like: false,
    // dislike: false,
  }

  componentDidMount() {
    this.getVideodetails()
  }

  onChangeLike = () => {
    const {like} = this.state
    this.setState({like: !like})
  }

  onChangeDisLike = () => {
    const {like} = this.state
    this.setState({like: !like})
  }

  getVideodetails = async () => {
    this.setState({videoApi: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/videos/${id}`
    const videoToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${videoToken}`,
      },
      method: 'GET',
    }
    const videoDetail = await fetch(url, options)
    if (videoDetail.ok === true) {
      const videoData = await videoDetail.json()
      const updateV = {
        description: videoData.video_details.description,
        id: videoData.video_details.id,
        publishedAt: videoData.video_details.published_at,
        thumbnailUrl: videoData.video_details.thumbnail_url,
        title: videoData.video_details.title,
        videoUrl: videoData.video_details.video_url,
        viewCount: videoData.video_details.view_count,
      }
      const channal = {
        name: videoData.video_details.channel.name,
        profileImgUrl: videoData.video_details.channel.profile_image_url,
        subscriberCount: videoData.video_details.channel.subscriber_count,
      }
      this.setState({
        videoItems: updateV,
        channalDetails: channal,
        videoApi: apiStatusConstants.success,
      })
    } else {
      this.setState({videoApi: apiStatusConstants.failure})
    }
  }

  renderLoaderS = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#6366f1" height="50" width="50" />
    </div>
  )

  renderFailureDetails = () => {
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

  renderVideo = () => {
    const {videoItems, channalDetails, like} = this.state
    console.log(videoItems)
    const urlV = videoItems.videoUrl

    const likeBg = like ? 'g-like' : 'like'
    const dislikeBg = like ? 'dis-like' : 'd-g-like'

    return (
      <div className="video-1" data-testid="videoItemDetails">
        <div className="video-2">
          <ReactPlayer url={urlV} width="90%" controls />
          <p className="video-title">{videoItems.title}</p>
          <div className="detail-1">
            <div className="b-1">
              <div className="view-box">
                <p className="views">{videoItems.viewCount} views</p>
                <p className="views">{videoItems.publishedAt}</p>
              </div>
              <div className="like-box">
                <p className={likeBg} onClick={this.onChangeLike}>
                  <AiOutlineLike /> Like
                </p>
                <p className={dislikeBg} onClick={this.onChangeDisLike}>
                  <AiOutlineDislike />
                  Dislike
                </p>
                <p className="like">
                  <RiMenuAddFill /> Save
                </p>
              </div>
            </div>
            <hr className="line" width="90%" />
          </div>
          <div className="channel-box">
            <div className="channel-icon">
              <img
                src={channalDetails.profileImgUrl}
                alt="website logo"
                className="chanel-logo"
              />
            </div>
            <div className="chanel-title">
              <p className="Ch-name">{channalDetails.name}</p>
              <p className="ch_count">
                {channalDetails.subscriberCount} subscribers
              </p>
            </div>
          </div>
          <p className="ch-des">{videoItems.description}</p>
        </div>
      </div>
    )
  }

  renderVideoItemSwitch = () => {
    const {videoApi} = this.state
    switch (videoApi) {
      case apiStatusConstants.success:
        return this.renderVideo()
      case apiStatusConstants.failure:
        return this.renderFailureDetails()
      case apiStatusConstants.inProgress:
        return this.renderLoaderS()
      default:
        return null
    }
  }

  render() {
    const {like} = this.state
    console.log(like)
    return (
      <div className="video-container">
        <Header />
        <div className="v-b-1">
          <SideControls />
          <div className="video-box">{this.renderVideoItemSwitch()}</div>
        </div>
      </div>
    )
  }
}

export default VideoItemDetails
