import React from 'react';

export default function (props) {
    return (
        <footer className="page-footer">
            <div className="container">
                <div className="row">
                    <div className="col l6 s12">
                        <h5 className="white-text">WEB ASSIGNMENT !</h5>
                        <p className="grey-text text-lighten-4">This is our product for the assignment in web class.</p>

                    </div>
                    <div className="col l4 offset-l2 s12">
                        <ul>
                            <li><a className="grey-text text-lighten-3" href="#!">About us</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Collections</a></li>
                            <li><a className="grey-text text-lighten-3" href="#!">Category</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer-copyright">
                <div className="container">
                    © 2019 Copyright
            <div className="social">
                        <a href="/" className="fa fa-facebook">.</a>
                        <a href="/" className="fa fa-twitter">.</a>
                        <a href="/" className="	fa fa-pinterest">.</a>
                        <i className="fa fa-github" aria-hidden="true">.</i>
                    </div>
                </div>
            </div>
        </footer>
    );
}