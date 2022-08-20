import React from 'react'
import { Button } from 'react-bootstrap';
import {  useState } from 'react';
import "./InfoBar.css";
import { toast } from 'react-toastify';

function unixToDate(unix) {
    const date = new Date(unix * 1000).toLocaleDateString("fi")
    return  date
}


function InfoBar({ style, onCloseClick, user, ...data }) {

    const [a, b] = useState("c")
    const [_rarity, _setRarity] = useState(null)

    const sendDecision = (action) => {
        if (!_rarity) {
            toast.error("Pick marker rarity")
            return
        }
        console.log(data)
        fetch(`${ process.env.REACT_APP_HOST }/api/admin/suggestedplaces/${ action }`, {
            method: action === "approve" ? "POST" : "DELETE",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ...data,
                rarity: _rarity
            })
        })
        .then(res => res.json())
        .then(json => {
            console.log(json)
            if (!json.success) throw new Error("Failed to make a desicion")
            toast.success("You desicion has been successfully applied")
            onCloseClick()
        })
        .catch(err => toast.error(err.message))
    }

    return (
        <div className='infoBar' style={ style }>
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
                <div className='bottomPart pb-3'>
                    <small className="text-muted">
                        Created by { data?.created.by }
                    </small>
                    <br></br>
                    <small className="text-muted">
                        { unixToDate(data.created.at) }
                    </small>
                </div>
                { 
                    user && user.isAdmin ? (
                        <>
                            <div className='d-flex justify-content-around'>
                                <span className={ _rarity == "bronze" ? "infoBar-rarityIcon infoBar-rarityIcon-selected" : "infoBar-rarityIcon" } onClick={ () => _setRarity("bronze") }> 
                                    <img src='markers/bronzeMarker.svg'></img>
                                </span>
                                <span className={ _rarity == "silver" ? "infoBar-rarityIcon infoBar-rarityIcon-selected" : "infoBar-rarityIcon" } onClick={ () => _setRarity("silver") }>
                                    <img src='markers/silverMarker.svg'></img>
                                </span>
                                <span className={ _rarity == "gold" ? "infoBar-rarityIcon infoBar-rarityIcon-selected" : "infoBar-rarityIcon" } onClick={ () => _setRarity("gold") }>
                                    <img src='markers/goldMarker.svg'></img>
                                </span>
                            </div>
                            <div className='d-flex justify-content-between p-5'>
                                <Button variant='success' onClick={ () => sendDecision("approve") }>Approve</Button>
                                <Button variant='danger' onClick={ () => sendDecision("approve") }>Decline</Button>
                            </div>
                        </>
                    ) : null
                }
            </div>
            
            <div className='infoBarClose' onClick={ onCloseClick }></div>
        </div>
    )
}

export default InfoBar