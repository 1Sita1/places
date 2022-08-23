import React from 'react'
import { Button } from 'react-bootstrap';
import {  useState } from 'react';
import "./InfoBar.css";
import { toast } from 'react-toastify';
import unixToDate from '../../helpers/unixToDate'
import Rating from '../Rating/Rating';


function InfoBar({ style, onCloseClick, user, ...data }) {

    const [_rarity, _setRarity] = useState(null)
    const [rating, setRating] = useState(data.rating)

    const sendDecision = (action) => {
        if (!_rarity && action === "approve") {
            toast.error("Pick marker rarity")
            return
        }

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
    
    const sendUserReview = (rate) => {
        if (!user) {
            toast.error("Please, log in before sending your review")
            return
        }
        console.log(data)
        fetch(`${ process.env.REACT_APP_HOST }/api/markers`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: data.id,
                vote: rate
            })
        })
        .then(data => data.json())
        .then(json => {
            console.log(json)
            setRating(json.newRating)
            toast.success("Your review has been successfully sent!")
        })
    } 

    return (
        <div className='infoBar' style={ style }>
            <div className='imgWrap'>
                <img className='InfoBarImg' height="100" width="100" src={ data?.img }></img>
            </div>
            <div className='ratingWrapper'>
                <span className='placeVotes'>
                    { rating ? rating.votes : 0 } votes
                </span>
                <Rating stars={ rating.stars } onRate={ sendUserReview }></Rating>
            </div>
            <div className='infoBarInfo'>
                <div className='topPart'>
                    <h2 className='infoBarHeader'>{ data?.header }</h2>
                    <p className='infoBarBody' style={{whiteSpace: "pre-line"}}>
                        { data.body }
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
                    user && user.isAdmin && data.approvedBy == null ? (
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
                                <Button variant='danger' onClick={ () => sendDecision("decline") }>Decline</Button>
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