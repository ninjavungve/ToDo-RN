import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Card from './Card';
import Colors from '../Utils/Colors';


class ToDoListItem extends Component {
	constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            contentText: this.props.contentText
        }
    }
    
    onPressEdit = () => {
        this.setState({
            isOpen: !this.state.isOpen
        }, () => {
            if (!this.state.isOpen) {
                this.props.onEditDone(this.state.contentText)
            }
        })
    }

    componentWillReceiveProps(newProps){
        if (this.props !== newProps){
            this.setState({ contentText: newProps.contentText })
        }
    }

    changeContentText = (contentText) => {
        this.setState({ contentText })
    }

    renderContentText = () => {

        if (this.state.isOpen){
            return (
                <TextInput
                    style={[styles.contentTextInputStyle]}
                    value={this.state.contentText}
                    onChangeText={this.changeContentText}
                    underlineColorAndroid={'transparent'}
                    multiline
                    autoFocus
                    maxHeight={100}
                    numberOfLine={5}
                />
            )
        }
        return (
          <Text
            style={styles.contentTextStyle}
            numberOfLines={5}
          >
            {this.state.contentText}
          </Text>
        )
    }

	render (){
        return (
          <Card>
            <View style={[styles.cardContainerStyle, {backgroundColor: Colors.white}]}>
              <View style={styles.contentContainerStyle}>
                {this.renderContentText()}
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                  <Text>
                    Ends at:  {this.props.endAt}
                  </Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderTopWidth: 1, borderColor: Colors.tintColor}}>
                <Entypo name="edit" size={24} color={Colors.tintColor} onPress={this.onPressEdit} style={{ paddingTop: 15 }}/>
                <Entypo name="attachment" size={24} color={Colors.tintColor} onPress={this.props.onAttachMedia} style={{ paddingTop: 15 }}/>
                <Entypo name="check" size={24} color={Colors.tintColor} onPress={this.props.onComplete} style={{ paddingTop: 15 }}/>
              </View>
            </View>
          </Card>
		);
	}
};

const styles = StyleSheet.create({
    cardContainerStyle: {
        flex: 1,
        justifyContent: 'space-around',
        height: 250,
        width: "100%",
        backgroundColor: 'rgba(230, 230, 230, 1)'
    },
    contentContainerStyle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: 150,
        margin: 5,
    },
    contentTextInputStyle: {
        fontWeight: '500',
        fontSize: 16,
        color: Colors.black,
        width: '100%',
        height: '100%',
        backgroundColor: 'transparent'
    },
    contentTextStyle: {
        fontWeight: '500',
        fontSize: 16,
        color: Colors.black
    },
    attachMediaStyle: {
        borderRadius: 5,
        borderWidth: 2,
        paddingVertical: 10,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: Colors.tintColor
    }
});


ToDoListItem.defaultProps = {
    contentText: "",
    endAt: "Never",
    onEditDone: () => {},
    onComplete: () => {},
    onAttachMedia: () => {}
}

ToDoListItem.propTypes = {
    contentText: PropTypes.string,
    endAt: PropTypes.string,
    onEditDone: PropTypes.func,
    onComplete: PropTypes.func,
    onAttachMedia: PropTypes.func
}

export default ToDoListItem;