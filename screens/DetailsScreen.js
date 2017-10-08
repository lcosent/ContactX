import Expo, { SQLite } from 'expo';
import React from 'react';
import { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';

import { List, ListItem, SearchBar } from 'react-native-elements';

const db = SQLite.openDatabase({ name: 'dbContact.db' });

const sampleContact=[
    {
      name: 'Amy Farha',
      picture:{
        thumbnail:'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
      },
      email: 'amy@gmail.com',
      rating:3,
      performan:3.5,
    },
    {
      name: 'Chris Jackson',
      picture:{
        thumbnail: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
      },
      email: 'chris@gmail.com',
      rating:5,
      performan:4,
    },
];

export default class DetailsScreen extends React.Component {
static navigationOptions=({navigation})=>({
  title:navigation.state.params.title
})

constructor(props) {
    super(props);
    this.state = {};

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
  componentDidMount() {
    this.makeRemoteRequest();
  }


  makeRemoteRequest = () => {
    const {state}=this.props.navigation ;
    // console.log(state);
    // name='Amy Farha';
    name=state.params.title;
    // console.log(name);

   displaydata = 0;
   wrapDisplaydata=new Array();
    for(i=0;i<sampleContact.length;i++){
      if(name==sampleContact[i]['name']){
        displaydata=sampleContact[i];
      }
    }
    wrapDisplaydata.push(displaydata);
    console.log("wrapDisplaydata is ",wrapDisplaydata);
    console.log(displaydata['name']);
    console.log(displaydata['picture']);

    this.setState({data:wrapDisplaydata});
      console.log(`${this.state}`)
  };






// this.props.navigation.params.email;

  render() {



    return (

      <View style={styles.container}>
      <Image
        style={{width: 50, height: 50}}
        source={{uri: `${this.state.data}`}}
        // source={{uri: 'http://shanghaitech.me/makeapp/static/image/SO.png'}}
      />
      </View>

    );
  }

  _maybeRenderDevelopmentModeWarning() {
    if (__DEV__) {
      const learnMoreButton = (
        <Text onPress={this._handleLearnMorePress} style={styles.helpLinkText}>
          Learn more
        </Text>
      );

      return (
        <Text style={styles.developmentModeText}>
          Development mode is enabled, your app will be slower but you can use
          useful development tools. {learnMoreButton}
        </Text>
      );
    } else {
      return (
        <Text style={styles.developmentModeText}>
          You are not in development mode, your app will run at full speed.
        </Text>
      );
    }
  }

  _handleLearnMorePress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/development-mode'
    );
  };

  _handleHelpPress = () => {
    WebBrowser.openBrowserAsync(
      'https://docs.expo.io/versions/latest/guides/up-and-running.html#can-t-see-your-changes'
    );
  };
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
});
