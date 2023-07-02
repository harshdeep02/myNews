import React from 'react'

const Newsitem = (props)=>{

        let { tittle, discription, imgUrl, artiurl, author, publishedAt, source } = props;
        return (
            <div>
                <div className="card" style={{ width: '100%', marginBottom: '1.5rem' }}>
                        <div style={{display: 'flex',alignItems: 'flex-end',position: 'absolute',left: '2%'}}><span className="badge rounded-pill bg-danger">
                            {source}
                        </span>
                        </div>
                    <img src={imgUrl ? imgUrl : "https://imgeng.jagran.com/images/2023/jun/hp-victus-omen-laptops1687502120209.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{tittle}...</h5>
                        <p className="card-text">{discription}...</p>
                        <p className="text-danger">By {!author ? "Unknown" : author} on {new Date(publishedAt).toGMTString()}</p>
                        <a href={artiurl} target="_blank" rel="noreferrer" className="btn-sm  btn btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
    export default Newsitem