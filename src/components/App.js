import React, { Component } from 'react';

import List from './List'
import { Content, Container } from 'native-base';

import * as api from '../shared/Api'
export default class App extends Component {

  constructor(props) {
    super(props);
  this.state = {
    list: []
  }
}



  componentDidMount() {
    this.handleInitialData()
  }

  handleInitialData = async () => {
    let response = await fetch(api.getItem).catch(e => {
      console.log(e)
    });
    let data = await response.json();
    this.setState({ list: data })
    console.log(data)
  }

  handleToggle = async (item) => {
    let newItem = { ...item, completed: !item.completed }
    let response = await fetch(api.itemById(item.id), {
        method: 'PUT',
        body: JSON.stringify(newItem),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).catch(e=>{ 
      console.error(e)
    })

    if (response.status == 200) {
      this.setState((prevState) => {
          return {
              list: prevState.list.map(it => {
  
                  if (it.id === item.id) {
                      it.completed = !it.completed;
                      return it;
                  }
                  return it;
              })
          }
      });

  }


  }

  removeItem = async (id) => {
    let response = await fetch(api.itemById(id), {
        method: 'DELETE'
    });

    if (response.status === 200) {
        this.setState((prevState) => {
            return { list: prevState.list.filter(item => item.id !== id) }
        });
    } 
}


  render() {
    return (
        <Container>
          <Content>
            <List list={this.state.list} handleToggle={this.handleToggle} removeItem={this.removeItem}/>
          </Content>
        </Container>

    )
}
}