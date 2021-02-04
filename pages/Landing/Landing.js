import React, { Component } from 'react'
import Button from "../../components/button";


export default class Landing extends Component {
    render() {
        return (
            <div>
                <div className="landing__left">
                    <div className="landing__header">
                        Keep memories of  <br/>
                        loved ones alive.
                    </div>
                    <div className="landing__subheader">
                        Connect and share stories with your community.

                    </div>
                    <div className="landing__header__button">
                        <Button variant="filled"> Learn more</Button>
                    </div>
                </div>

                <div className="landing__right">
                    <img className="gramps" />
                </div>

            </div>
        )
    }
}
