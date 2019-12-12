import React from 'react';
import {Link} from "react-router-dom";

export default function ({match, location}) {
    const {state = {}} = location;
    const {modal} = state;
    return (
        <div className={modal ? "mmodal" : undefined}>
            {modal && <Link to={'/'}>Close</Link>}
            <div>
                <img src="https://source.unsplash.com/random" alt={"sdf"}/>
            </div>
        </div>
    );
}