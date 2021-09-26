import React, { Component } from 'react';
import TextEllipsis from 'react-text-ellipsis';
import moment from 'moment';

class NewsItem extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    let { news } = this.props;
    let imgURL = news.media.length > 0 ? news.media[0].url : require('../assets/img/no-img.jpg').default;
    return (
      <div>
        <div className="tab-pane fade show tab-column-content" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <div className="flex-row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

              <div className="whats-news-single mb-40 mb-40 flex-row">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-4">
                  <div className="whates-img">
                    <img src={imgURL} alt="" />
                  </div>
                </div>
                <div className="col-xl-8 col-lg-8 col-md-8 col-sm-8 col-8">
                  <div className="whates-caption whates-caption2">
                    <h4><a href={news.links.permalink} target="_blank">{news.title}</a></h4>
                    <span>by {news.author.name == '' ? 'Unknown' : news.author.name}   -   {moment(news.published_at).format("MMM Do, YYYY")}</span>
                    <TextEllipsis
                      lines={3}
                      tag={'p'}
                      ellipsisChars={'...'}>
                      {news.body}
                    </TextEllipsis>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile View */}
        <div className="tab-pane fade show active tab-column-mobile-content" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          <div className="flex-row">
            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">

              <div className="whats-news-single mb-40 mb-40">
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="whates-img">
                  <img src={imgURL} alt="" />
                  </div>
                </div>
                <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                <div className="whates-caption whates-caption2">
                    <h4><a href={news.links.permalink} target="_blank">{news.title}</a></h4>
                    <span>by {news.author.name == '' ? 'Unknown' : news.author.name}   -   {moment(news.published_at).format("MMM Do, YYYY")}</span>
                    <TextEllipsis
                      lines={3}
                      tag={'p'}
                      ellipsisChars={'...'}
                      tagClass={'className'}
                      debounceTimeoutOnResize={200}
                      useJsOnly={true}>
                      {news.body}
                    </TextEllipsis>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsItem;