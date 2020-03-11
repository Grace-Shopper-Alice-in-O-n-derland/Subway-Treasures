import React from 'react'

import {Navbar} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
      <div className="footer">
        <img
          className="footer-image"
          src="https://static01.nyt.com/images/2019/12/02/autossell/mta-promo-image/mta-crop-videoSixteenByNineJumbo1600.jpg"
        />
      </div>
    </div>
  )
}

export default App
