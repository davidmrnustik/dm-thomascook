import React, { Component } from 'react';
import { Row, Col, Table, Glyphicon, Panel } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import { colors } from './colors';
import _ from 'lodash';

const options = {
  legend: {
    display: true,
    position: 'right',
    labels: {
      boxWidth: 15,
      fontSize: 13,
      padding: 20,
      usePointStyle: true
    }
  },
  ticks: {
    reverse: false
  }
}

class Repository extends Component {
  static propTypes = {
    repos: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired
  }

  getLanguages(data) {
    const repos = data.reduce((repo, current) => {
      const language = current.language;

      if (!repo.hasOwnProperty(language) && language !== null) repo[language] = 0;

      Object.keys(repo).forEach(key => {
        if (key === language) {
          repo[language] += 1;
        }
      })
      return repo;
    }, {});
    return repos;
  }

  getLanguageValues(data) {
    return Object.keys(data).map(key => {
      return data[key];
    })
  }

  getLanguageColor(data) {
    return Object.keys(data).map(key => {
      return colors[key];
    })
  }

  getFavouriteLanguage(data) {
    let favourite = Object.keys(data).reduce((prev, current) => {
      return data[current] > prev ? data[current] : prev
    }, 0);
    
    return _.findKey(data, _.partial(_.isEqual, favourite));
    // https://github.com/lodash/lodash/issues/528#issuecomment-40609860
  }


  render() {
    const { repos, user } = this.props;

    const languages = this.getLanguages(repos);
    const data = {
      labels: Object.keys(languages),
      datasets: [
        {
          backgroundColor: this.getLanguageColor(languages),
          data: this.getLanguageValues(languages)
        }
      ]
    };

    return (
      <Row>
        <Col md={6}>
          <Table bordered condensed hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Repository name</th>
                <th>URL</th>
                <th>Language</th>
              </tr>
            </thead>
            <tbody>
              {repos.map((repo, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{repo.name}</td>
                    <td><a href={repo.html_url} target='_blank'>URL</a></td>
                    <td>{repo.language}</td>
                  </tr>
                )
              })}
            </tbody>
          </Table>
        </Col>
        <Col md={6}>
          <Panel>
            <h4 style={{ textAlign: 'center' }}>
              {user.name !== null ? user.name : user.login} 
              <Glyphicon glyph='heart' style={{ color: 'red', margin: '0 5px' }} />
              <strong>{this.getFavouriteLanguage(languages)}</strong>
            </h4>
          </Panel>
          <Doughnut
            data={data}
            options={options}
          />
        </Col>
      </Row>
    );
  }
}

export default Repository;