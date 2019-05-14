import React, { Component } from 'react';
import { FlatList, View } from 'react-native';


import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Icon,
    List,
    ListItem,
    Text,
    Left,
    Right,
    Body,
    Spinner,
    Item,
    Input,
    Footer,
    FooterTab,
    CheckBox
  } from "native-base";

const ListScreen = (props) => {
    const { data, state } = props;

    renderWordSearch = (title) => {

        if (search) {
            return title.split(props.search).join('>' + props.search + '<')
            title.split(props.search).map((word) => {
                        return (
                        <Text>{word}<Text style={{color: 'red'}}>{props.search}</Text></Text>
                        )
                    })
        } else {
            return title;
        }
    }

    return (
        <Container>
            <Header>
                <Body>
                <Title style={{alignSelf: 'center'}}>todoNative</Title>
                </Body>
            </Header>
            <Header searchBar rounded>
                <Item>
                    <Icon active name="search" />
                    <Input placeholder="Search" onChangeText={(key) => props.searchItem(key)} />
                </Item>
                <Button transparent>
                    <Text>Search</Text>
                </Button>
            </Header>
            <Content>
                { (!state && <Spinner color="blue" style={{alignSelf: 'center'}} />)}
                {state && Object.keys(data).length == 0 && <Text style={{padding: 10, alignSelf: 'center'}}>Nenhum objeto encontrado.</Text>}
                <List
                    dataArray={data}
                    renderRow={data =>
                    <ListItem>
                        <CheckBox
                                color="#000"
                                checked={data.completed}
                                onPress={() => props.handleToggle(data)} 
                        />
                        <Body>
                        {data.completed ? <Text style={{textDecorationLine: 'line-through', textDecorationStyle: 'solid'}}>{data.title}</Text> : <Text> {data.title} </Text> }
                        </Body>
                        <Right>
                            <View style={{flexDirection: 'row'}}>
                                <Button light onPress={()=>{props.showUpdateScreen(data)}}>
                                    <Icon name="edit" type="FontAwesome" />
                                </Button>
                                <Button danger onPress={()=>{props.removeItem(data.id)}}>
                                    <Icon name="trash" type="FontAwesome" />
                                </Button>
                            </View>
                        </Right>
                    </ListItem>}
                />
                
            </Content>

            <Footer>
                <FooterTab>
                    <Button 
                    active 
                    full
                    onPress={() => props.navigation.navigate("Append")}
                    >

                        <Text style={{color: 'white'}}>
                        Adicionar novo registro <Icon name="angle-double-right" type="FontAwesome" style={{fontSize: 15, paddingTop: 5, color: 'white'}} />
                        </Text>
                    </Button>
                </FooterTab>
            </Footer>
            </Container>

    )
}
export default ListScreen; 