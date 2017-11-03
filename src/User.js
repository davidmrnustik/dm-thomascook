import React from 'react';
import { Row, Col, Media } from 'react-bootstrap';
import PropTypes from 'prop-types';

export const User = (props) => {
  return (
    <Row>
      <Col md={6}>
        <Media>
          <Media.Left>
            <a href={props.data.html_url} target='_blank'>
              <img
                src={props.data.avatar_url}
                width={64}
                height={64}
                alt='props.data.name'
              />
            </a>
          </Media.Left>
          <Media.Body>
            <h3 style={{ marginTop: 0 }}>{props.data.name !== null ? props.data.name : 'User has no name set up.'}</h3>
            <h5>
              {props.data.login}
              {' '}
              <a href={`mailto:${props.data.email}`}>email</a>
            </h5>
          </Media.Body>
        </Media>
      </Col>
      <Col md={6}>
        Followers: {props.data.followers}<br/>
        Following: {props.data.following}<br/>
        Public repos: {props.data.public_repos}
      </Col>
    </Row>
  );
}

User.propTypes = {
  data: PropTypes.object.isRequired
}