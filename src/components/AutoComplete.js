import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest'
import axios from 'axios'
import { debounce } from 'throttle-debounce'
import '../styles.css'

class AutoComplete extends Component {
  state = {
    value: '',
    suggestions: []
  }

  componentWillMount() {
    // Notice!!
    // debounce는 성능과 관련있음, 검색 자동완성 너무 빈번히 호출시 ES부하가 걸릴수 있으므로 
    // 아래 delay값을 조정 하도록 구현
    this.onSuggestionsFetchRequested = debounce(
      100, // delay
      this.onSuggestionsFetchRequested
    )
  }

  renderSuggestion = suggestion => {
    return (
      <div className="result">
        <div>{suggestion.keyword}</div>
      </div>
    )
  }

  onChange = (event, { newValue }) => {
    this.setState({ value: newValue })
  }

  onSuggestionsFetchRequested = ({ value }) => {
    axios
      .post('/keyword_test/_search', {
        query: {
          multi_match: {
            query: value,
            fields: ['keyword']
          }
        },
        sort: [{'_score': 'desc'}]
      })
      .then(res => {
        console.log(res.data)
        const results = res.data.hits.hits.map(h => h._source)
        this.setState({ suggestions: results })
      })
  }

  onSuggestionsClearRequested = () => {
    this.setState({ suggestions: [] })
  }

  handleSearch = (e) => {
      e.preventDefault();
      this.props.onCreate(this.state);
  }

  render() {
    const { value, suggestions } = this.state

    const inputProps = {
      placeholder: '와인, 판매점, 종류',
      value,
      onChange: this.onChange
    }

    return (
      <div className="App">
        <h1>AutoComplete and Search Demo</h1>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={suggestion => suggestion.keyword}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps}
        />
        <button className="btnSearch" onClick={this.handleSearch}>검색</button>
      </div>
    )
  }
}

export default AutoComplete;