import React from 'react'
import { useEffect, useState } from 'react/cjs/react.production.min';
import "./InfoBar.css";


const dragStart = (props) => {
  alert()
}

function InfoBar({ img, rating,  header, children, created, onCloseClick, style }) {

  return (
    <div className='infoBar' style={style ?? null}>
        <div className='imgWrap'><img className='InfoBarImg' height="100" width="100" src={img}></img></div>
        <div className='ratingWrapper'>
          <span className='placeVotes'>{ rating.votes } votes</span>
          <div className='starsWrapper'>
            { rating.stars.map((star, id) => {
              return <img src={ star ? 'star.png' : 'starTemplate.png' } key={id}></img>
            }) }
          </div>
        </div>
        <div className='infoBarInfo'>
          <div className='topPart'>
            <h2 className='infoBarHeader'>{ header }</h2>
            <p className='infoBarBody' style={{whiteSpace: "pre-line"}}>{children ?? "Lorem ipsum..."}</p>
          </div>
          <div className='bottomPart'>
            <small className="text-muted">Created by { created.by }</small>
            <br></br>
            <small className="text-muted">{ created.date }</small>
          </div>
        </div>
        <div className='infoBarClose' onClick={() => onCloseClick()}></div>
    </div>
  )
}

export default InfoBar