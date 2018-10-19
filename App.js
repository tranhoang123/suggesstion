import Autocomplete from 'react-native-autocomplete-input';
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  View
} from 'react-native';

function urlForQueryAndPage(value) {
  const data = {
    key:'AIzaSyBIhGaLJ_2wWY0jeO6GXlq4IunT9oN6-nI',
    input: value,
  };
  const querystring = Object.keys(data).map(key => key + '=' + encodeURIComponent(data[key])).join('&');

  return 'https://maps.googleapis.com/maps/api/place/queryautocomplete/json?' + querystring;
}
class AutocompleteSimple extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      location: []
    }
  }


    _executeQuery = (query) =>{
      console.log(query);
    // this.setState({isLoading:true});
    fetch(query)
    .then(response => response.json())
    .then(json => this._handleResponse(json.status, json.predictions))
    .catch(error =>
      this.setState({
        //isLoading: false,
        message: 'Có gì đó sai sai ' + error
   }));
  }
  _onSearchPressed = () => {
    const query = urlForQueryAndPage(this.state.searchString);
    this._executeQuery(query);

  };
  _handleResponse(status, predictions){
    if(status === "OK"){
      this.setState({ location : predictions })
    }
    else {
      console.log("Co loi xay ra");
    }
  }
  _onSearchTextChanged = (event) =>{
    this.setState({searchString: event.nativeEvent.text});
    const query = urlForQueryAndPage(this.state.searchString);
    this._executeQuery(query);
  }
  _displayInfo(){
    const {location} = this.state;
    view = [];
    if(location.length === 0 ){
      return;
    }
    else {
      location.forEach(function(item, index){
        console.log(item);
      view.push(
        <TouchableOpacity onPress={()=> this.setState({searchString : item.structured_formatting.main_text })}>
          <Text>
            {item.structured_formatting.main_text}
          </Text>
        </TouchableOpacity>
      );
    })
      return view
    }
  }
  render() {

    return (
      <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        value={this.state.searchString}
        onChange={this._onSearchTextChanged}
        underlineColorAndroid={'transparent'}
        placeholder='Search'
        />
        <ScrollView>
            {this._displayInfo()}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 25
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  descriptionContainer: {
    // `backgroundColor` needs to be set otherwise the
    // autocomplete input will disappear on text input.
    backgroundColor: '#F5FCFF',
    marginTop: 25
  },
  infoText: {
    textAlign: 'center'
  },
  titleText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center'
  },
  directorText: {
    color: 'grey',
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center'
  },
  openingText: {
    textAlign: 'center'
  }
});

export default AutocompleteSimple;
