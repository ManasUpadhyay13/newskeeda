import React, { Component } from 'react'
import NewsItem from './NewsItem'

export class News extends Component {
    
    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false
        }
    }

    async componentDidMount(){
        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=dbf0674769fc4be5b7005db69bcf1e0a"
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log("The parsed data is : ")
        console.log(parsedData);
        this.setState({articles : parsedData.articles})
    }

    handlePrevBtn = async () =>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dbf0674769fc4be5b7005db69bcf1e0a&page=${this.state.page -1}`
        let data = await fetch(url)
        let parsedData = await data.json()
        this.setState({
            articles : parsedData.articles,
            page : this.state.page -1
        })
    }

    handleNextBtn = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=dbf0674769fc4be5b7005db69bcf1e0a&page=${this.state.page +1}`
        let data = await fetch(url)
        let parsedData = await data.json()
        console.log(parsedData)
        this.setState({
            articles : parsedData.articles,
            page : this.state.page + 1
        })
    }
    render() {

        return (
            <div className="container my-3">
                <h2>News Keeda Top Headlines</h2>
                <div className="row" >
                    {this.state.articles.map((element)=> {
                        return <div className="col md-4 my-3" key={element.url}>
                            <NewsItem title={element.title.slice(0,40)} description={element.description?.slice(0,80)} newsUrl = {element.url}  imageUrl={element.urlToImage} />
                        </div>
            })}
            </div>
            <div className="container d-flex justify-content-between my-4">
            <button disabled={this.state.page<=1} type="button" className="btn btn-dark " onClick = {this.handlePrevBtn}>Previous</button>
            <button type="button" className="btn btn-dark" onClick = {this.handleNextBtn}>Next</button>
            </div>
        </div>
        )
    }
}

export default News
