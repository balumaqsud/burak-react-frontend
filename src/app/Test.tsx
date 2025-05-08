// @ts-nocheck
import React from "react";

type State = {
  brand: string;
  model: string;
  color: string;
  year: number;
};
class Test extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      brand: "Ford",
      model: "Mustang",
      color: "red",
      year: 1964,
    };
  }
  changeColor = () => {
    this.setState({
      color: "blue",
      model: "S class",
      brand: "Mercedes-benz",
      year: 2022,
    });
  };

  //is invoked immediately after a component is mounted  (retrieve data from backend)
  componentDidMount() {
    console.log("component did mount");
  }

  // is invoked immediately before a component is unmounted and destroyed.
  componentWillUnmount() {
    console.log("component will Unmount");
  }
  //s invoked immediately after updating occurs. This method is not called for the initial render.
  componentWillUpdate() {
    console.log("component will Update");
  }

  render() {
    return (
      <div>
        <h1>My {this.state.brand}</h1>
        <p>
          It is a {this.state.color}, {this.state.model}, from {this.state.year}
          .
        </p>
        <button type="button" onClick={this.changeColor}>
          Change color
        </button>
      </div>
    );
  }
}

export default Test;
