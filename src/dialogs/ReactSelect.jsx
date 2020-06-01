import React from 'react';
import Select from 'react-select';
 
const options = [
  { value: 'fire', label: 'Fire' },
  { value: 'gun thread', label: 'Gun Thread' },
  { value: 'weather', label: 'Weather' },
  { value: 'hazard', label: 'Hazard' },

];
 
class ReactSelect extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState({ selectedOption });
    console.log(`Option selected:`, selectedOption);
  };
  render() {
    const { selectedOption } = this.state;
 
    return (
      <Select
        value={selectedOption}
        onChange={this.handleChange}
        options={options}
      />
    );
  }
}

export default ReactSelect;

// eof
