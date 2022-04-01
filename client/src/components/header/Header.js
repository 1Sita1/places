import React from 'react'

function Header() {
    return(
        <>
            <div className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark bg-transparent'>
                <div className='container-fluid'>
                    <span className='navbar-brand h2'>MP</span>
                    <button type='button' className='btn btn-primary' data-toggle="modal" data-target="#exampleModalCenter">
                        Add spot
                    </button>
                </div>
            </div>
            <div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLongTitle">Log in</h5>
                        <small class="text-muted">Dont have an account?</small>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                        </div>
                        <div class="modal-body text-left">
                            <form>
                                <div class="form-group">
                                    <label for="exampleInputEmail1">Username</label>
                                    <input class="form-control" type="text" placeholder="Your fancy username"></input>
                                </div>
                                <div class="form-group">
                                    <label for="exampleInputPassword1">Password</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Your super secret password"></input>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                        <button type="button" class="btn btn-primary">Log in</button>
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header