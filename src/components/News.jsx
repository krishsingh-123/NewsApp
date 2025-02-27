import React, { Component } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';
import NewsItem from './NewsItem'
import Spinner from './Spinner'
import PropTypes, { string } from 'prop-types'


export class News extends Component {

    static defaultProps = {
        category : "general" ,
        pageSize : 6 ,
        country : "us"
      }
    
      static propTypes = {
        category : PropTypes.string ,
        pageSize : PropTypes.number ,
        country : PropTypes.string
      }
    
      capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1) ;
      }

      constructor(props) {
        super(props);
        this.state = {
          articles: [],
          loading: true,
          page:1,
          totalResults:0
        };
        document.title = `${this.capitalize(this.props.category)} - NewsMpnkey` ;
      }
    
      async updateNews(){
        this.props.setProgress(10) ;
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=415430ffd1dd4c1fa9bde354504cd05f&page=${this.state.page}&pageSize=${this.props.pageSize}` ;
        this.setState({
          loading : true 
        }) ;
        let data = await fetch(url);
        this.props.setProgress(30) ;
        let parsedata = await data.json();
        this.props.setProgress(50) ;
        console.log(parsedata) ;
        this.setState({ 
          articles: parsedata.articles , 
          totalResults: parsedata.totalResults ,
          loading : false 
          });
          this.props.setProgress(100) ;
      }

      async componentDidMount() {
       this.updateNews() ;
      }

     fetchData = async() => {
        const url = `https://newsapi.org/v2/top-headlines?country=us&category=${this.props.category}&apiKey=415430ffd1dd4c1fa9bde354504cd05f&page=${this.state.page+1}&pageSize=${this.props.pageSize}` ;
        this.setState({page : this.state.page + 1}) ;
        let data = await fetch(url);
        let parsedata = await data.json();
        console.log(parsedata) ;
        this.setState({ 
          articles: this.state.articles.concat(parsedata.articles) , 
          totalResults: parsedata.totalResults ,
          loading : false
          });
      }
    
       render() {
         return (
            <>
            <h2 className='text-center my-3' style={{marginTop:'80px'}}>NewsMonkey - Top {this.capitalize(this.props.category)} Headlines</h2>
            {this.state.loading && <Spinner /> }
            <InfiniteScroll dataLength={this.state.articles.length} next={this.fetchData} hasMore={this.state.articles.length < this.state.totalResults} loader={(this.state.articles.length > this.state.totalResults) ? <Spinner/> : null} >
            <div className='container' style={{maxWidth:'100%'}}>
            <div className='row'>
              {this.state.articles.map((element) => {
                return (
                  <div className='col-md-4 center' key={element.url}>
                    <NewsItem 
                      title={element.title ? element.title.slice(0, 32) : "No Title"} 
                      description={element.description ? element.description.slice(0, 64) : "No Description"} 
                      imageUrl={element.urlToImage ? element.urlToImage : "https://via.placeholder.com/300x200"} 
                      newsUrl={element.url} 
                      author = {element.author}
                      date = {element.publishedAt}
                      source = {element.source.name}
                    />
                  </div>
                );
              })}
            </div>
            </div>
            </InfiniteScroll>
          </>    
       )
     }
  }

export default News