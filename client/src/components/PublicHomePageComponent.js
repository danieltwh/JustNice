import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Jumbotron, Button } from 'reactstrap';

class PublicHomePage extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Jumbotron>
                    <h2 className="display-3">Welcome to JustNice!</h2>
                    <p className="lead">Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Cras maximus eu justo sit amet facilisis.</p>
                    <hr className="my-2" />
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                    Cras maximus eu justo sit amet facilisis.</p>
                    <p className="lead">
                    <Link to="/aboutus"><Button id="publicpage-learnmore" color="primary">Learn More</Button></Link>
                    </p>
                </Jumbotron>
            </div>
        )
    }
}

export default PublicHomePage;