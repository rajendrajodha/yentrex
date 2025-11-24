import React from 'react';
import loading from "./loader.gif";
import './Loading.css'

class Loading extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaderState: false,
    };
  }

  updateStatus = (status) => {
    this.setState({ loaderState: status });
  };

  render() {
    const { loaderState } = this.state;
    return (
      loaderState &&
      <div className="centerbox">
        <img src={loading} alt="Loading" />
      </div>
    )
  }
}

export default Loading;