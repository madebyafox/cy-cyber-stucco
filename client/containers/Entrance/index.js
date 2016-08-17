import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {browserHistory} from 'react-router'
import * as networkSourceActions from '../../reducers/currentnetwork'
import * as currentVsActions from '../../reducers/currentvs'
import * as currentLsActions from '../../reducers/currentls'
import * as backgroundColorActions from '../../actions/background-color'
import * as vsActions from '../../reducers/visualstyles'
import * as lsActions from '../../reducers/layoutstyles'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import TopPage from '../../components/TopPage'

import style from './style.css'
import * as Colors from 'material-ui/styles/colors'

import presets_styles from '../../assets/preset-styles.json'
import presets_layouts from '../../assets/preset-layouts.json'

const PRESET_STYLES_LOCATION = '../../assets/preset-styles.json'
const PRESET_LAYOUTS_LOCATION = '../../assets/preset-layouts.json'

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: Colors.orange800,
    primary2Color: Colors.cyan700,
    primary3Color: Colors.lightBlack,
    accent1Color: Colors.pinkA200,
    accent2Color: Colors.grey100,
    accent3Color: Colors.grey500,
    textColor: Colors.fullWhite,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    pickerHeaderColor: Colors.cyan500,
  },
  appBar: {
    color: 'rgba(0,0,0,0.0)'
  }
});

class Entrance extends Component {

  componentWillMount() {
    // Extract query params
    const queryParams = this.props.location.query
    const networkId = queryParams.url
    const styleName = queryParams.style
    const layoutName = queryParams.layout
    const backgroundColor = queryParams.bgcolor
    let stylesource= queryParams.stylesource
    let layoutsource= queryParams.layoutsource

    if (networkId !== undefined) {

      if(backgroundColor !== undefined) {
        this.props.backgroundColorActions.setBackgroundColor(backgroundColor)
      }

      if(stylesource === undefined) {
        stylesource = PRESET_STYLES_LOCATION
        this.loadStyles()
      } else {
        // First, load style
        this.props.vsActions.fetchVisualStyles(stylesource)
      }

      if(layoutsource === undefined) {
        layoutsource = PRESET_LAYOUTS_LOCATION
        this.loadLayouts()
      } else {
        // First, load style
        this.props.lsActions.fetchLayoutStyles(layoutsource)
      }
      // Prepare params
      if(styleName !== undefined) {
        this.props.currentVsActions.setCurrentVs(styleName)
      }

      if(styleName !== undefined) {
        this.props.currentLsActions.setCurrentLs(layoutName)
      }
      // Redirect to network page
      const encodedId = encodeURIComponent(networkId)
      browserHistory.push('/networks/' + encodedId)
    } else {
      // Load preset styles
      this.loadStyles()
      this.loadLayouts()
    }
  }

  loadStyles() {
    const styleMap = {}
    presets_styles.map(vs => {
      styleMap[vs.title] = vs.style
    })
    this.props.vsActions.addStyles(styleMap)
  }

  loadLayouts() {
    const layoutMap = {}
    presets_layouts.map(ls => {
      layoutMap[ls.title] = ls.layout
    })
    this.props.lsActions.addLayouts(layoutMap)
  }

  render() {
    const {currentNetwork, networkSourceActions, datasourceActions, datasource} = this.props
    // console.log('ENTRANCE visualStyles: ', this.props.styles)
    // console.log('ENTRANCE layoutStyles: ', this.props.layouts)
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <TopPage
          className={style.main}
          currentNetwork={currentNetwork}
          networkSourceActions={networkSourceActions}
          datasourceActions={datasourceActions}
          datasource={datasource}
        />
      </MuiThemeProvider>
    )
  }
}

function mapStateToProps(state) {
  return {
    currentNetwork: state.app_manager.current_network,
    datasource: state.app_manager.datasource,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    networkSourceActions: bindActionCreators(networkSourceActions, dispatch),
    currentVsActions: bindActionCreators(currentVsActions, dispatch),
    currentLsActions: bindActionCreators(currentLsActions, dispatch),
    backgroundColorActions: bindActionCreators(backgroundColorActions, dispatch),
    vsActions: bindActionCreators(vsActions, dispatch),
    lsActions: bindActionCreators(lsActions, dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Entrance)
