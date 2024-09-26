import React from 'react'

const ThemeChangeContext = React.createContext({
  themeState: 'false',
  changeTheme: () => {},
})

export default ThemeChangeContext
