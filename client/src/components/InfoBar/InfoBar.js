import React from 'react'
import { useEffect, useState } from 'react/cjs/react.production.min';
import "./InfoBar.css";
import interact from 'https://cdn.interactjs.io/v1.10.11/interactjs/index.js'


const dragStart = (props) => {
  alert()
}

function InfoBar(props) {


  return (
    <div className='infoBar'>
        <div className='imgWrap'><img className='InfoBarImg' src={props.img}></img></div>
        <div className='infoBarInfo'>
          <h2 className='infoBarHeader'>{props.header}</h2>
          <p className='infoBarBody'>{props.children}</p>
        </div>
        <div className='infoBarClose' onClick={() => props.onCloseClick()}></div>
    </div>
  )
}

export default InfoBar