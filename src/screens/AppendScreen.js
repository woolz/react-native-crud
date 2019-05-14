import React, { Component } from 'react';

import {
    Container,
    Content,
    Header,
    Body,
    Left,
    Right,
    Title,
    Item,
    Label,
    Input,
    Button,
    Icon,
    Form,
    Text,
    Picker,
    Card
} from 'native-base';

export default class AppendScreen extends Component {
    constructor(props) {
        super(props);
    }   

    render() {

        let { fieldError, completed } = this.props;
        return (
            <Container>
                <Header>
                    <Left>
                    <Button transparent onPress={() => this.props.navigation.navigate("List")}>
                        <Icon name="arrow-back" />
                    </Button>
                    </Left>
                    <Body>
                        <Title>Novo Registro</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                <Form>
                    {fieldError && <Card style={{padding: 10, backgroundColor: 'red', alignSelf: 'center', width: '100%'}}><Text style={{color: 'white', textAlign: 'center'}}>Não deixe o título em branco!</Text></Card>}
                    <Item>
                        <Label>Title</Label>
                        <Input onChangeText={(val) => this.props.handleInputChange(val, 'title')} />
                    </Item>
                    <Item>
                        <Label>Completed</Label>
                        <Picker
                            mode="dropdown"
                            iosHeader="Selecione..."
                            selectedValue={completed}
                            onValueChange={(val) => this.props.handleInputChange(val, 'completed')}
                            >
                        <Item label="True" value={true} />
                        <Item label="False" value={false} />
                    </Picker>
                    </Item>
                </Form>

                <Button block style={{ margin: 15, marginTop: 50 }} onPress={this.props.appendItem}>
                    <Text>APPEND</Text>
                </Button>
                    
                </Content>
            </Container>
        )
}
}