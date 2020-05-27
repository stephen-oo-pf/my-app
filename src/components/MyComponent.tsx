import React from "react";
interface IMyComponentProps extends React.HTMLAttributes<Element> {
  alice?: string;
  ate?: number;
  cake?: any;
}
type MyComponentState = {
  allen?: string,
  drink?: number,
  milk?: any
};
class MyComponent extends React.Component<IMyComponentProps, MyComponentState> {
  ref: any;
  constructor(props: any) {
    super(props);
    this.ref = React.createRef();
    this.state = { allen: "" };
  }
  onClick() {
    this.setState({ drink: 3 });
  }
  render() {
  	let alice = "Alice";
  	let ate = 650599;
    const { cake } = this.props;
    const { milk } = this.state;
    return (
      <div ref={this.ref}>	
        MyComponentJS2TS:HOME
        <p>{alice}</p>
        <p>{ate}</p>
        <hr />
      </div>
    );
  }
}

export default MyComponent;
