import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select } from 'semantic-ui-react';
import { stades } from './stades.data';

export default class StadeField extends React.Component {
  render() {
    return (
      <Form.Field
        required
        control={Select}
        options={stades}
        label="Stade"
        placeholder="Stade"
        search
        onChange={this.props.onChange}
      />
    );
  }
}

StadeField.propTypes = {
  onChange: PropTypes.func.isRequired
};
