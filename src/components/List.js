import React, { Component } from 'react';
import { FlatList, View } from 'react-native';
import { CheckBox, Text, ListItem, Left, Right, Body, Button, Icon } from 'native-base';

export default class List extends Component{
    render() {
        const { list } = this.props; 
        return (
            <View>
                <FlatList
                    data={list}
                    renderItem={({item}) => (
                        <ListItem>
                                <CheckBox
                                color="#000"
                                checked={item.completed}
                                onPress={() => this.props.handleToggle(item)} />
                                <Body>
                                {item.completed ? <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{item.title}</Text> : <Text>{item.title}</Text>}
                                </Body>
                            <Right>
                                <Button danger rounded>
                                    <Icon name="trash" onPress={()=>{this.props.removeItem(item.id)}} />
                                </Button>
                            </Right>
                    </ListItem>

                    )}
                    keyExtractor={(item, index) => index.toString()}
                    />
            </View>
        )
    }

} 