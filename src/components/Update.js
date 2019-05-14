import React, { Component } from 'react';

import UpdateScreen from '../screens/UpdateScreen'

import * as api from '../shared/Api'



class Update extends Component{
    constructor(props){
        super(props);
        const { id, userId } = this.props.navigation.state.params.item;
        let { title, completed } = this.props.navigation.state.params.item;

        this.state = {
            id: id,
            title: title,
            completed: completed,
            fieldError: false,
            userId: userId
        }
    }

    handleInputChange = (val, title) => {
        this.setState({[title]: val});
      }     


    updateItem = async () => {

        if (!this.state.title) {

            this.setState({
                fieldError: true
            })

        } else {
            let newItem = {
                id: this.state.id,
                title: this.state.title,
                completed: this.state.completed,
                userId: this.state.userId
            };
            let response = await fetch(api.getItemObject(this.state.id), {
                method: 'PUT',
                body: JSON.stringify(newItem),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).catch(e=>{ 
                console.error(e)
            })

            console.log(response);

            if (response.status == 200) {
                this.props.navigation.navigate("List");
            }
        }

    }
    render(){
        return (
                <UpdateScreen id={this.state.id} title={this.state.title} completed={this.state.completed} navigation={this.props.navigation} handleInputChange={this.handleInputChange} updateItem={this.updateItem} />
        )
    }
}


export default Update;