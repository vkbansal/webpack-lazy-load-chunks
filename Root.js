import React, { Component } from "react";
import { Link } from 'react-router';

export default class Root extends Component {
    render(){
         return (
            <div>
                <ul>
                    <li>
                        <Link to='/'>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link to='/page-a'>
                            Page A
                        </Link>
                    </li>
                    <li>
                        <Link to='/page-b'>
                            Page B
                        </Link>
                    </li>
                </ul>
                <hr />
                {this.props.children}
            </div>
        );
    }
}
