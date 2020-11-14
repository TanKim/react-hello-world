import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import ReactAutocomplete from '../node_modules/react-autocomplete'
// import express from 'express';

// const corsOptions = {
//   origin: 'http://localhost:3000', // 허락하고자 하는 요청 주소
//   credentials: true, // true로 하면 설정한 내용을 response 헤더에 추가 해줍니다.
// };
// const app = express();
// var cors = require('cors');
// app.use(cors(corsOptions));

class Bpp extends Component {
    state = {
        value: '',
        search_str: '',
        keywords: []
      }
      componentDidMount() {
        console.log('componentDidMount');
      }
      handleChange = (e) => {
        let input = e.target.value
        this.setState({ search_str: input });
        console.log(input);
        if(input){
          axios.get(`/autocomplete/${input.toLowerCase()}`)
          .then(res => {
            const result = res.data;
            console.log(result);
            this.setState({ keywords: result });
          })
        }
      }
    render() {
        return (
            <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Let's have a Chilling!
          </p>
          <form>
            <input
              placeholder="와인, 판매처, 종류"
              value={this.state.search_str}
              onChange={this.handleChange}
              />
            <div>{this.state.search_str}</div>
          </form>
          <p>
          { this.state.keywords.map(elem => 
            <li>
              {elem.keyword}<br></br>
            </li>)
          }
          </p>
          <ReactAutocomplete
            items={[
              { id: 'foo', label: 'foo' },
              { id: 'bar', label: 'bar' },
              { id: 'baz', label: 'baz' },
            ]}
            shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
            getItemValue={item => item.label}
            renderItem={(item, highlighted) =>
              <div
                key={item.id}
                style={{ backgroundColor: highlighted ? '#1111' : 'transparent'}}
              >
                {item.label}
              </div>
            }
            value={this.state.value}
            onChange={e => this.setState({ value: e.target.value })}
            onSelect={value => this.setState({ value })}
        />
        </header>
      </div>
        );
    }
}

export default Bpp;