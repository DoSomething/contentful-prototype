import React from 'react';
import PropTypes from 'prop-types';

class SelectLocationDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      prefix: '',
    };

    if (this.props.locationList === 'domestic') {
      this.addDomesticOptions();
    }
  }

  addDomesticOptions = (config = {}) => {
    import('usa-states').then(({ UsaStates }) => {
      const states = new UsaStates(config).format({
        key: 'abbr',
        value: 'name',
      });

      this.setState({
        locations: states,
        prefix: 'US-',
      });
    });
  };

  render() {
    return (
      <div className="select">
        <select
          value={this.props.selectedOption}
          onChange={this.props.onSelect}
        >
          <option key="default" value="">
            Select a state
          </option>
          {this.state.locations.map(location => (
            <option
              key={location.value}
              value={`${this.state.prefix}${location.key}`}
            >
              {location.value}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

SelectLocationDropdown.propTypes = {
  locationList: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.string,
};

SelectLocationDropdown.defaultProps = {
  locationList: null,
  selectedOption: '',
};

export default SelectLocationDropdown;
