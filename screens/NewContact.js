import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Hideo,Kaede,Kohana,Fumi } from 'react-native-textinput-effects';

import Expo, { SQLite } from 'expo';
import React from 'react';
import { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,TextInput,
  TouchableOpacity,
  View,
  FlatList,Button,
  ActivityIndicator,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { List, ListItem, SearchBar } from 'react-native-elements';
import { MaterialIcons } from '@expo/vector-icons';

const db = SQLite.openDatabase({ name: 'dbContact.db' });


export default class NewContact extends React.Component {

  static navigationOptions=({navigation})=>({
    title:"Add new contact"
  })


constructor(props) {
    super(props);

    this.state = {
       email: '',
       password: '',
    };
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />;
  };

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View
        style={{
          paddingVertical: 20,
          borderTopWidth: 1,
          borderColor: "#CED0CE"
        }}
      >
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  add(text) {
    db.transaction(
      tx => {
        tx.executeSql('insert into items  value values  ?', [text]);
        tx.executeSql('select * from items', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      },
      null,
      this.update
    );
  };
    update = () => {};






  // handleLoadMore = () => {
  //   this.setState(
  //     {
  //       page: this.state.page + 1
  //     },
  //     () => {
  //       this.makeRemoteRequest();
  //     }
  //   );
  // };
  _handleSendButtonPress = () => {
    // if (!this.state.inputValue) {
    //   return;
    // }
      this.add(this.state.email);
      this.add(this.state.password);
      var a=this.state.email
      return this.props.navigation.navigate("detailsScreen",{title:`${a} miss??`})

  };
  handleEmail = (text) => {
     this.setState({ email: text })
  }
  handlePassword = (text) => {
     this.setState({ password: text })
  }
  login = (email, pass) => {
        alert('email: ' + email + ' password: ' + pass)
     }

  render() {
    // return null

    return (
      <View style={styles.formView}>

        <TextInput style = {styles.input}
           underlineColorAndroid = "transparent"
           placeholder = "Email"
           placeholderTextColor = "#9a73ef"
           autoCapitalize = "none"
           onChangeText = {this.handleEmail}
           value="test email"/>

        <TextInput style = {styles.input}
           underlineColorAndroid = "transparent"
           placeholder = "Password"
           placeholderTextColor = "#9a73ef"
           autoCapitalize = "none"
           onChangeText = {this.handlePassword}
           value="ttest value"/>


        <TouchableOpacity
           style = {styles.submitButton}
           onPress = {this._handleSendButtonPress}>
           <Text style = {styles.submitButtonText}> Submit </Text>
        </TouchableOpacity>



      </View>

    );

    return (
      <View style={{ margin: 5 }}>
        {items.map(({ id, done, value }) => (
          <TouchableOpacity
            key={id}
            onPress={() => this.props.onPressItem && this.props.onPressItem(id)}
            style={{
              padding: 5,
              backgroundColor: done ? '#aaffaa' : 'white',
              borderColor: 'black',
              borderWidth: 1,
            }}>
            <Text>{value}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );

  }



}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 10,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  barContainer: {
    marginTop: 10,
    marginBottom: 0,
    backgroundColor:'#009688',
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 35,
    color: 'white',
    lineHeight: 60,
    textAlign:'left',
    marginLeft: 10,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  title: {
  paddingBottom: 16,
  textAlign: 'center',
  color: '#404d5b',
  fontSize: 20,
  fontWeight: 'bold',
  opacity: 0.8,
  },
  card1: {
    paddingVertical: 16,
  },
  card2: {
    padding: 16,
  },
  input: {
     margin: 15,
     height: 40,
     borderColor: '#7a42f4',
     borderWidth: 1
  },
  submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText:{
      color: 'white'
   },

});
