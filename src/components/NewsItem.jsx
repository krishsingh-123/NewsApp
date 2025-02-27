import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date , source } = this.props;
    return (
     <div className='container mx-5 mx-collapse-true'>
     <div className="card" style={{ width: "22rem" }}>
      <div style={{display:'flex', justifyContent:'flex-end', position:'absolute', right:'0'}}> 
         <span className="badge rounded-pill bg-danger my-2" style={{left:'85%' , zIndex:'1'}}>  {source}  </span>
      </div>
          <img src={imageUrl ? imageUrl : "https://via.placeholder.com/150"} className="card-img-top" alt="News"/>
          <div className="card-body my-2">
            <h5 className="card-title">{title ? title : "No Title Available"}-{source}</h5>
            <p className="card-text">{description ? description : "No Description Available"}</p>
            <p className='card-text'><small className='text-muted'>By {author ? author : "Unknown Author"} on {new Date(date).toGMTString()} </small></p>
            <a href={newsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Read More</a>
          </div>
        </div>
      </div>
    )    
  }
}

export default NewsItem