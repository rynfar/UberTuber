import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

import SearchBar from './components/search-bar';
import VideoList from './components/video-list';
import VideoDetail from './components/video-detail';

const YOUTUBE_API_KEY = 'AIzaSyD6v0HZCSkAqwmVtGgmO2USP2ZPYOxc-Eo';

class App extends Component {
    constructor(props) {
        super(props);

        this.state =  {
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('bit mining');

    }

    videoSearch(term) {
        YTSearch({key: YOUTUBE_API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this. videoSearch(term)}, 300);

        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                    videos={this.state.videos}/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container') );
