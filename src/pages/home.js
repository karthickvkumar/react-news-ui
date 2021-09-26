import React, { Component } from 'react';
import { Input, AutoComplete } from 'antd';
import NewsItem from '../components/news-item';
import { debounce } from "debounce";
import { LoadingOutlined } from '@ant-design/icons';
import axios from 'axios';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      autoComplete: [],
      newsList: [],
      isLoading: false,
      isSearching : false,
      selection : 'Trending'
    }
  }

  componentDidMount() {
    this.loadNews();
  }

  loadNews(searchText = "Nikola Tesla"){
    axios.get('/news/stories', {
      params: {
        "language": 'en',
        "perPage": 25,
        "cursor": '*',
        "entities.surface_forms.text": searchText
      }
    })
      .then((response) => {
        console.log(response.data.stories);
        this.setState({
          newsList: response.data.stories,
          isLoading: true,
          isSearching : false
        })
      })
      .catch((error) => { console.log(error) })
  }

  onchangeNews(searchText){
    this.setState({
      selection : searchText,
      isSearching : true
    })
    this.loadNews(searchText);
  }

  onSelect = (searchText) => {
    this.setState({
      isSearching : true
    })
    this.loadNews(searchText);
  }

  onSearch = (keyword) => {
    axios.get('/news/autocompletes', {
      params: {
        type: 'dbpedia_resources',
        term: keyword,
        language: 'en',
        perPage: 3,
      }
    })
      .then((response) => {
        console.log('response', response);
        let result = response.data.autocompletes;
        let options = result.map((search, index) => {
          return {
            value : search.text
          }
        });
        this.setState({
          autoComplete : options
        })
      })
      .catch((error) => { console.log(error) })
  }

  render() {
    let newsContent = this.state.newsList.map((value, index) => {
      return (
        <NewsItem key={index} news={value}></NewsItem>
      )
    })

    return (
      <div>
        {!this.state.isLoading ?
          <div id="preloader-active">
            <div className="preloader d-flex align-items-center justify-content-center">
              <div className="preloader-inner position-relative">
                <div className="preloader-circle"></div>
                <div className="preloader-img pere-text">
                  <img src={require("../assets/img/logo/logo.png").default} alt="" />
                </div>
              </div>
            </div>
          </div>
          :
          <div>
            <header className="header-height">
              <div className="header-area">
                <div className="main-header ">

                  <div className="header-bottom header-sticky">
                    <div className="container">
                      <div className="row align-items-center">
                        <div className="col-xl-8 col-lg-8 col-md-12 header-flex">

                          <div className="main-menu d-md-block">
                            <nav>
                              <ul id="navigation">
                                <li>
                                  <a href="index.html">
                                    <img src={require("../assets/img/logo/logo.png").default} alt="" />
                                  </a>
                                </li>
                                <li>
                                  <div className="search-wrapper">
                                    <AutoComplete
                                      options={this.state.autoComplete}
                                      className="search-input"
                                      onSelect={this.onSelect}
                                      onSearch={debounce(this.onSearch, 350)}
                                    >
                                      <Input.Search size="large" placeholder="Search" />
                                    </AutoComplete>
                                  </div>
                                </li>
                              </ul>
                            </nav>
                          </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-4">
                          <div className="header-right f-right d-none d-lg-block">

                          </div>
                        </div>
                        <div className="col-12">
                          <div className="mobile_menu d-block d-md-none"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </header>

            {/* MAIN PAGE */}

            <main>
              <div className="about-area2 gray-bg pt-30 pb-60 content-height">
                <div className="container">
                  <div className="row">
                    <div className="col-lg-12">
                      <div className="whats-news-wrapper">
                        <div className="row justify-content-between align-items-end mb-15">
                          <div className="col-xl-4">
                            <div className="section-tittle mb-30">
                              <h3>Whats New</h3>
                            </div>
                          </div>
                          <div className="col-xl-8 col-md-9">
                            <div className="properties__button">
                              <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                  <a className={this.state.selection == 'Trending' ?  'nav-item nav-link active' : 'nav-item nav-link'} id="nav-home-tab" data-toggle="tab" role="tab" aria-controls="nav-home" aria-selected="true" onClick={() => this.onchangeNews('Trending')}>Trending</a>
                                  <a  id="nav-profile-tab" data-toggle="tab" role="tab" aria-controls="nav-profile" aria-selected="false" className={this.state.selection == 'Travel' ?  'nav-item nav-link active' : 'nav-item nav-link'} onClick={() => this.onchangeNews('Travel')}>Travel</a>
                                  <a  id="nav-contact-tab" data-toggle="tab" role="tab" aria-controls="nav-contact" aria-selected="false" className={this.state.selection == 'Fashion' ?  'nav-item nav-link active' : 'nav-item nav-link'} onClick={() => this.onchangeNews('Fashion')}>Fashion</a>
                                  <a  id="nav-last-tab" data-toggle="tab"  role="tab" aria-controls="nav-contact" aria-selected="false" className={this.state.selection == 'Sports' ?  'nav-item nav-link active' : 'nav-item nav-link'} onClick={() => this.onchangeNews('Sports')}>Sports</a>
                                  <a  id="nav-Sports" data-toggle="tab"  role="tab" aria-controls="nav-contact" aria-selected="false" className={this.state.selection == 'Technology' ?  'nav-item nav-link active' : 'nav-item nav-link'} onClick={() => this.onchangeNews('Technology')}>Technology</a>
                                </div>
                              </nav>
                            </div>
                          </div>
                        </div>
                        <div className="flex-row">
                          <div className="col-12">
                            <div className="tab-content" id="nav-tabContent">
                              {/* NEWS Content */}
                              {this.state.isSearching ? 
                                <div className="d-flex align-items-center justify-content-center">
                                  <LoadingOutlined style={{ fontSize: 24, color : 'red' }} spin />  
                                </div>
                              : newsContent }
                              {/* NEWS Content */}
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>

              </div>
            </main>
          </div>

        }
      </div>
    );
  }
}

export default Home;