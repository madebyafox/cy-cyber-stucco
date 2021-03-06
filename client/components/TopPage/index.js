import React, {Component} from 'react'
import AppBar from 'material-ui/AppBar'

import Title from './Title'
import Footer from './Footer'
import TopMenu from '../TopMenu'

import style from './style.css'


export default class TopPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
  }

  handleTouchTap = (event) => {
    event.preventDefault();
    this.setState({
      open: true,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    })
  }

  render() {
    const {
      currentNetwork, networkSourceActions,
      datasourceActions
    } = this.props
    return (
      <div>
        <AppBar
          style={{boxShadow: 'none'}}
          onLeftIconButtonTouchTap={this.handleTouchTap}
        >
        </AppBar>
        <TopMenu
          open={this.state.open}
          closeAction={this.handleRequestClose}
        />

        <div className={style.top}>
          <Title
            currentNetwork={currentNetwork}
            networkSourceActions={networkSourceActions}
            datasourceActions={datasourceActions}
          />
        </div>

        <Footer/>
      </div>
    )
  }
}
