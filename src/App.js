import React, { Component } from 'react';
import AutoComplete from './components/AutoComplete.js';
import WineInfoList from './components/WineInfoList.js';
import axios from 'axios'
import { debounce } from 'throttle-debounce'

class App extends Component {
  state = {
    keyword: '',
    info: []
  }

  handleCreate = (data) => {
    let input = data.value
    let page = 1
    let size = 10
    console.log('keyword for search : '+input);
    // this.setState({ keyword : searchString });
    if(input){
      axios.get(`/chilling/v1.0/search/search/${input}/${page}/${size}`)
      .then(res => {
        const result = res.data;
        console.log(result);
        this.setState({ info: result.body.contents });
      })
    }
  }

  render() {
    const {info} = this.state;
    console.log(info);
    return (
      <div>
        <AutoComplete onCreate={this.handleCreate}/>
        <WineInfoList info={info}/>
      </div>
    );
  }
}

export default App;
