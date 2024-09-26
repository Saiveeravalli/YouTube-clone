import './App.css'

import {Component} from 'react'
import {Switch, Route} from 'react-router-dom'
import Login from './components/LoginForm'
import Home from './components/Home'
import SavedVideos from './components/SavedVideos'
// import Trending from './components/Trending'

import VideoItemDetails from './components/VideoItemDetails'

import ThemeChangeContext from './context/ThemeChange'

// Replace your code here

class App extends Component {
  state = {themeState: false}

  changeTheme = () => {
    const {themeState} = this.state
    this.setState({themeState: !themeState})
  }

  render() {
    const {themeState} = this.state

    return (
      <ThemeChangeContext.Provider
        value={{
          themeState,
          changeTheme: this.changeTheme,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/videos/:id" component={VideoItemDetails} />
          <Route exact path="/SavedVideos" component={SavedVideos} />
        </Switch>
      </ThemeChangeContext.Provider>
    )
  }
}

export default App
