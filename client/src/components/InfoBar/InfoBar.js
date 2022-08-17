import React from 'react'
import { Button } from 'react-bootstrap';
import { useEffect, useState } from 'react/cjs/react.production.min';
import "./InfoBar.css";


function InfoBar(data) {


    return (
        <div className='infoBar' style={ data.style }>
            <div className='imgWrap'>
                <img className='InfoBarImg' height="100" width="100" src={ data?.img }></img>
            </div>
            <div className='ratingWrapper'>
                <span className='placeVotes'>
                    { data.rating ? data.rating.votes : 0 } votes
                </span>
                <div className='starsWrapper'>
                    { 
                        data?.rating && data.rating.stars.map((star, id) => {
                            return <img src={ star ? 'star.png' : 'starTemplate.png' } key={id}></img>
                        }) 
                    }
                </div>
            </div>
            <div className='infoBarInfo'>
                <div className='topPart'>
                    <h2 className='infoBarHeader'>{ data?.header }</h2>
                    <p className='infoBarBody' style={{whiteSpace: "pre-line"}}>
                        { data?.children ?? "Lorem ipsum..." }
                    </p>
                </div>
                { 
                    data?.user?.isAdmin ? (
                        <>
                            <Button>Approve</Button>
                            <Button>Decline</Button>
                        </>
                    ) : null
                }
                <div className='bottomPart pb-3'>
                    <small className="text-muted">
                        Created by { data?.created.by }
                    </small>
                    <br></br>
                    <small className="text-muted">
                        { data?.created.at }
                    </small>
                </div>
            </div>
            
            <div className='infoBarClose' onClick={() => data.onCloseClick()}></div>
        </div>
    )
}

export default InfoBar