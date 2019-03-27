import React from 'react';
import PropTypes from 'prop-types';

class SelectLocationDropdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locations: [],
      prefix: '',
      defaultText: this.props.defaultText,
    };

    if (this.props.locationList === 'domestic') {
      this.addDomesticOptions({ includeTerritories: true });
    }
  }

  addDomesticOptions = (config = {}) => {
    import('usa-states').then(({ UsaStates }) => {
      const states = new UsaStates(config).format({
        key: 'abbr',
        value: 'name',
      });

      this.setState({
        defaultText: 'Select a state',
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
            {this.state.defaultText}
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
  defaultText: PropTypes.string,
  locationList: PropTypes.string,
  onSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.string,
};

SelectLocationDropdown.defaultProps = {
  defaultText: 'All Locations',
  locationList: null,
  selectedOption: '',
};

export default SelectLocationDropdown;
