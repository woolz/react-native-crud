import React, { Component } from 'react';

import AppendScreen from '../screens/AppendScreen'

import * as api from '../shared/Api'

export default class Append extends Component{
    
    constructor(props) {
        super(props);
       
        this.state = {
            title: null,
            completed: false,
            fieldError: false
        };
    }


      handleInputChange = (val, title) => {
        this.setState({[title]: val});
      }     



    appendItem = async () => {

        if (!this.state.title) {

            this.setState({
                fieldError: true
            })

        } else {
            let newItem = {
                title: this.state.title,
                completed: this.state.completed
            
            };
            let response = await fetch(api.getItem, {
                method: 'POST',
                body: JSON.stringify(newItem),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).catch(e=>{ 
            console.error(e)
            })

            if (response.status == 200) {

                this.props.navigation.navigate("List");
            }
        }

    }




    render() {
        return (
            <AppendScreen fieldError={this.state.fieldError} navigation={this.props.navigation} handleInputChange={this.handleInputChange} appendItem={this.appendItem} />
        )
    }
}