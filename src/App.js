import React, { Component } from 'react';
import './App.css';
import { Grid } from 'react-bootstrap';
import LoadingScreen from './LoadingScreen';
import Repository from './Repository';
import { User } from './User';
import { Header } from './Header';

class CiklumApp extends Component {

  state = {
    repos: [],
    user: '',
    value: '',
    loading: false
  }

  fetchData(user, repos = false){
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const uri = `https://api.github.com/users/${user}`;
      xhr.open('GET', repos ? `${uri}/${repos}` : uri, true);
      xhr.setRequestHeader('Authorization', `token ${process.env.REACT_APP_GITHUB_TOKEN}`);
      xhr.addEventListener('load', (() => resolve(JSON.parse(xhr.responseText))));
      xhr.addEventListener('error', (() => reject(new Error('There was an error during API call!') )));
      xhr.send();
    })
  }

  submitForm = (user) => {
    this.setState({ loading:true });

    this.fetchData(user)
      .then(data => {
        if (data.hasOwnProperty('message')) {
          alert(`User ${data.message}`);
          this.setState({ loading: false});
        } else {
          this.fetchData(user, 'repos')
            .then(repos => {
              this.setState(state => ({
                value: user,
                user: data,
                repos,
                loading: false
              }));
            })
            .catch(err => {
              console.log(err);
            })
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const { user, repos, loading } = this.state;
    let userName;
    let userRepos;

    if (loading) return <LoadingScreen text='Loading, please wait...'/>;

    if (user) {
      userName = (
        <div>
          <User data={user} />
          <hr/>
        </div>
      );

      if (repos.length !== 0) {
        userRepos = <Repository user={user} repos={repos} />;
      } else {
        userRepos = 'User has no public repository.';
      }
    }

    return (
      <div className='CiklumApp'>
        <Grid>
          <Header onSubmitForm={this.submitForm} />
          {userName}
          {userRepos}
        </Grid>
      </div>
    );
  }
}

export default CiklumApp;
