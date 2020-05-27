import React from 'react';
import PropTypes from 'prop-types';
import 'bulma'

class MyComponent extends React.Component {
    static propTypes = {
        alice: PropTypes.string,
        ate: PropTypes.number,
    };
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = { allen: '' };
    }
 
    onClick() {
        this.setState({ drink: 3 });
    }
 
    render() {
        const { cake } = this.props;
        const { milk } = this.state;
        return (
          <div ref={this.ref} className="hero is-primary">
            MyComponent-JS2TS:HOME
            <p>{this.props.alice}</p>
            <p>{this.props.ate}</p>
            <hr />
        </div>
      )
    }
}

MyComponent.defaultProps = {
  alice: "Alice",
  ate: 506874
};

export default MyComponent;

