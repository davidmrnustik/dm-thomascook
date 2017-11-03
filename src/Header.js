import React from 'react';
import PropTypes from 'prop-types';
import { Navbar } from 'react-bootstrap';
import SearchForm from './SearchForm';

export const Header = (props) => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <a href='./'>
            <img
              src='./thomascook.png'
              alt='Thomas Cook'
              style={{
                width: 'auto',
                height: 25,
                marginTop: 4
              }}
            />
          </a>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Navbar.Form pullRight>
         <SearchForm onSubmitForm={props.onSubmitForm} />
        </Navbar.Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

Header.propTypes = {
  onSubmitForm: PropTypes.func.isRequired
}