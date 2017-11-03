import React, { Component } from 'react';
import { Row, Button, Form, FormGroup, FormControl } from 'react-bootstrap';
import PropTypes from 'prop-types';

class SearchForm extends Component {
  static propTypes = {
    handleSubmit: PropTypes.func
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if (!this.input.value) {
      alert('Please enter user name!');
      return;
    }
    this.props.onSubmitForm(this.input.value);
  }

  render() {
    return (
      <Row>
        <Form onSubmit={this.handleSubmit} inline>
          <FormGroup bsSize='large'>
            <FormControl
              type='text'
              inputRef={ref => { this.input = ref; }}
              bsSize='large'
              placeholder='Enter GitHub username'
              style={{ minWidth: 320 }}
            />
          </FormGroup>
          {' '}
          <Button
            type='submit'
            bsStyle='primary'
            bsSize='large'>
            Search
          </Button>
        </Form>
      </Row>
    )
  }
}

export default SearchForm;