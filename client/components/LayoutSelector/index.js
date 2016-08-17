import React, {Component} from 'react'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


const style = {
  color: '#555555',
  fontWeight: 600
}

class LayoutSelector extends Component {

  handleChange = (event, index, value) => {
    this.props.currentLsActions.setCurrentLs(value)
  }

  render() {
    let currentLsName = this.props.currentLs.get('lsName')
    // console.log('layoutselector props', this.props.layouts)
    if(this.props.layouts.get(currentLsName) === undefined) {
      currentLsName = 'preset'
    }
    // const layoutNames = ['preset','null','random','grid','circle','concentric','breadthfirst','cose']
    const layoutNames = this.props.layouts.keys()
    const items = []

    let count = 1
    for (let layoutName of layoutNames) {
      items.push(<MenuItem key={count} value={layoutName} primaryText={layoutName}/>)
      count++
    }

    return (
      <SelectField
        style={{paddingLeft: '1.2em'}}
        labelStyle={style}
        value={currentLsName}
        onChange={this.handleChange}
        floatingLabelText="Current Layout Style"
        floatingLabelStyle={{color: '#666666', fontWeight: 300}}
      >
        {items}
      </SelectField>
    )
  }
}

export default LayoutSelector
