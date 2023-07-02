import React, { useState, useEffect } from 'react'
import Newsitem from './Newsitem'
import Spinner from './Spinner'
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component"
 
const News = (props)=>{

const [articles, setArticles]= useState([])
const [loading, setLoading]= useState(true)
const [page, setPage]= useState(1)
const [totalResults, setTotalResults] = useState(0)

  const forUpperCase = (element)=>{
    return element.charAt(0).toUpperCase()+ element.slice(1)
  }
    
          
        
    const updateNews = async()=>{
      props.setProgress(10)
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pagesize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30)
        let parshe = await data.json()
        props.setProgress(70)
       // console.log(parshe)
        setArticles(parshe.articles)
        setTotalResults(parshe.totalResults)
        setLoading(false)
        props.setProgress(100)
    }

    useEffect(()=>{
      updateNews()
      document.title =`${forUpperCase(props.category)} - News`
      //eslint-disable-next-line
    }, [])
    // const handleOnPrevious = async ()=>{
      // setPage(page-1)
    //   const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page -1}&pagesize=${props.pageSize}`
    //      setLoading(true)
    //     let data = await fetch(url);
    //     let parshe = await data.json()
    //     // console.log(parshe)
    //     setArticles(parshe.articles)
    //     setPage(page-1)
    //     setLoading(false)
        // setPage(page-1)
      // updateNews();

    // }
    // const handleOnNext = async()=>{
    //   if(!(page + 1  > Math.ceil(totalResults/props.pageSize))){
    //     const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${this.state.page + 1}&pagesize=${props.pageSize}`
    //     setLoading(true)
    //     let data = await fetch(url);
    //     let parshe = await data.json()
    //     // console.log(parshe)
    //     setPage(page+1)
    //     setArticles(parshe.articles)
    // }
    // setPage(page+1)
    // updateNews()
    // }
    const fetchMoreData = async() => {
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pagesize=${props.pageSize}`
        // setLoading(true)
        let data = await fetch(url);
        let parshe = await data.json()
        // console.log(parshe)
        setPage(page+1)
        setArticles(articles.concat(parshe.articles))
        setTotalResults(parshe.totalResults)
        // setLoading(false)
    }
    return (
      <>
        
        <h1 className='text-center' style={{margin:'2rem', marginTop:'5rem'}}>News - Top Headlines</h1>
        {loading && <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
          <div className="container">
        <div className="row">
         {articles.map((element)=>{
            return <div className="col-md-4" key={element.url}>
        <Newsitem tittle = {element.title?element.title:""} discription = {element.description?element.description:""} imgUrl = {element.urlToImage} artiurl = {element.url} author = {element.author} publishedAt = {element.publishedAt} source = {element.source.name}/>
        </div>
         })}
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button type="button" disabled = {page<=1} onClick={handleOnPrevious} className="btn btn-dark">&larr; Previous</button>
        <button type="button" disabled ={page + 1  > Math.ceil(totalResults/props.pageSize)}onClick={handleOnNext} className="btn btn-dark">Next &rarr;</button>
        </div> */}
        </>
    )
  }


News.defaultProps = {
  country:'in',
  pageSize:5,
  category:'general'
  
}

News.propTypes = {
  country:PropTypes.string,
  pageSize:PropTypes.number,
  category:PropTypes.string,
}
export default News