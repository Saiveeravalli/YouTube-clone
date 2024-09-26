import {Component} from 'react'
import './index.css'

import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    showPassword: false,
    username: '',
    password: '',
    errorMsg: '',
    errbool: false,
  }

  onSuccess = token => {
    Cookies.set('jwt_token', token, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onCheck = () => {
    const {showPassword} = this.state
    this.setState({showPassword: !showPassword})
  }

  onInputName = event => {
    this.setState({username: event.target.value})
  }

  onInputpassword = event => {
    this.setState({password: event.target.value})
  }

  onFailure = errMsg => {
    const {errbool} = this.state
    this.setState({errorMsg: errMsg, errbool: !errbool})
  }

  onSubmitLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state

    console.log(username)
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const data = await fetch(url, options)
    console.log(data)
    const dta = await data.json()
    if (data.ok === true) {
      console.log(dta)
      this.onSuccess(dta.jwt_token)
    } else {
      this.onFailure(dta.error_msg)
    }
  }

  render() {
    const {showPassword, password, errorMsg, errbool} = this.state
    console.log(password)
    const loginToken = Cookies.get('jwt_token')
    if (loginToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="container-login-form">
          <div className="img-box">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
              alt="logo"
              className="logo"
            />
          </div>
          <form className="form-box" onSubmit={this.onSubmitLogin}>
            <div className="box-1-login">
              <label htmlFor="username" className="name">
                USERNAME
              </label>
              <input
                type="text"
                id="username"
                className="input-1"
                placeholder="UserName"
                onChange={this.onInputName}
                aria-hidden="true"
                required=""
              />
            </div>
            <div className="box-1-login">
              <label htmlFor="password" className="name">
                PASSWORD
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                className="input-1"
                placeholder="Password"
                onChange={this.onInputpassword}
              />
            </div>
            <div className="box-2">
              <input
                type="checkbox"
                id="checkbox"
                className="input-1"
                onChange={this.onCheck}
              />
              <label htmlFor="checkbox" className="passwordName">
                Show Password
              </label>
            </div>
            <button className="loginButton" type="submit">
              Login
            </button>
            {errbool && <p className="errMsg">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
