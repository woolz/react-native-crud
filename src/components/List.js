import React, { Component } from 'react';

import * as api from '../shared/Api'

import ListScreen from '../screens/ListScreen'


import { AsyncStorage } from 'react-native';


export default class ListElement extends Component{
    constructor(props) {
    super(props);
    this.state = {
        list: [],
        searchBackup: '',
        loading: false,
        search: '',
      }
    }

    async componentDidMount() {
        return await fetch(api.getItem)
        .then((response) => response.json())
        .then((responseJson) => {
            this.setState({list: responseJson, loading: true})
            this.storeItem("listData", responseJson);
        }).catch((e) =>{
            console.log(e.message)
            AsyncStorage.getItem('listData').then((value) => {
            this.setState({list: JSON.parse(value), loading: true})
        }).done();

        });
    }


    showUpdateScreen = async (data) => {
        console.log('DATA', data);
        this.props.navigation.navigate('Update', {
            item: {
                id: data.id,
                title: data.title,
                userId: data.userId,
                completed: data.completed
            }
          });
    }

    storeItem = async (key, item)  => {
        try {
            await AsyncStorage.setItem(key, JSON.stringify(item));
        } catch (e) {
          console.log(e.message);
        }
      }


    searchItem = (key) => {
        if (!key) {
            this.setState({
                list: this.state.searchBackup,
                search: ''
            })
        } else {
            const newList = this.state.list.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const ListData = key.toUpperCase();
                return itemData.indexOf(ListData) > -1;
            });

            !this.state.searchBackup && this.setState({ searchBackup: this.state.list });
            this.setState({
                list: newList,
                search: key
            });
        }
    }


    handleToggle = async (item) => {
        let newItem = { ...item, completed: !item.completed }
        let response = await fetch(api.getItemObject(item.id), {
            method: 'PUT',
            body: JSON.stringify(newItem),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).catch(e=>{ 
        console.error(e)
        })
    
        if (response.status == 200) {
            let list = [...this.state.list];
            let index = list.findIndex(it => it.id === item.id);
            list[index] = {...list[index], completed: !item.completed};
            this.setState({ list });
        } else {
            this.componentDidMount();
        }
    
    
    }
    
    removeItem = async (id) => {
        let response = await fetch(api.getItemObject(id), {
            method: 'DELETE'
        });

        if (response.status === 200) {
            this.setState({
                list: this.state.list.filter(item => item.id !== id)
            });
        } 
    }


    getItemObject = async (title) => {
        return await fetch(api.getItemObject(title)).json().catch(e => {
        console.log(e)
        });
    }

    render() {
        return (
            <ListScreen search={this.state.search} searchItem={this.searchItem} handleToggle={this.handleToggle} showUpdateScreen = {this.showUpdateScreen} navigation={this.props.navigation} data={this.state.list} state={this.state.loading} removeItem={this.removeItem} />
        )
    }

}