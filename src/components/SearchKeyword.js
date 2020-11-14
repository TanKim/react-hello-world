import React, { Component } from 'react';
import axios from 'axios'
import { debounce } from 'throttle-debounce'

class SearchKeyword extends Component {
    state = {
        keyword: '',
        data: []
      }
    render() {
        return(
            <div>
            </div>
        )
    }
}

export default SearchKeyword;