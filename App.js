// 참조 : https://codesandbox.io/s/9lzmzykjkr?file=/src/index.js:49-58

import React, { useState } from "react";
import logo from "./logo.svg";
import QRCode from "qrcode.react";
import { getBalance, readCount, setCount } from "./api/UseCaver";
import * as KlipAPI from "./api/UseKlip";
import "./App.css";
import ReactDOM from "react-dom";

function onPressButton(balance) {
  console.log("hi H I");
}


const onPressButton2 = (_balance, _setBalance) => {
  _setBalance(_balance);
};

const DEFAULT_QR_CODE = "DEFAULT";

function App() {
  const [balance, setBalance] = useState("0");
  const [qrvalue, setQrvalue] = useState(DEFAULT_QR_CODE);

  const onClickGetAddress = () => {
    KlipAPI.getAddress(setQrvalue);
  };
  const onClickSetCount = () => {
    KlipAPI.setCount(2000, setQrvalue);
  };
  return (
    <div className="App">
      <header className="App-header">

        <h1>Selfie NFT</h1>

        <h5>Keep your special day with your selfies.</h5>

        <img src="https://previews.123rf.com/images/phoebeyu/phoebeyu1709/phoebeyu170901007/87063262-cartoon-character-design-female-lovely-cute-girl-wearing-straw-hat-making-selfie-collection.jpg" width="500" />


        <ol className="mw400 center" style={{ textAlign: "center" }}>
        <h5>
          STEP 1) Upload Your selfie - <UploadPreview />
        </h5>
      </ol>
      <h5>STEP 2) Get NFT Market address </h5>
        <button
          onClick={() => {
            onClickGetAddress();
          }}
        >
        QRCODE Load
        </button>

        <br />
        

        <QRCode value={qrvalue} />
        <p>{balance}</p>

        <button
          onClick={() => {
            onClickSetCount();
          }}
        >
          SET COUNT
        </button>

        <br />
        <br />



        <a
          className="App-link"
          href="https://www.youtube.com/watch?v=mEOYinDTeqE"
          target="_blank"
          rel="noopener noreferrer"
        >
          "The value of NFT"
        </a>
      </header>
    </div>
  );
}


class UploadPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = { file: null };
    this.onChange = this.onChange.bind(this);
    this.resetFile = this.resetFile.bind(this);
  }
  onChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  resetFile(event) {
    event.preventDefault();
    this.setState({ file: null });
  }
  render() {
    return (
      <div>
        <input type="file" onChange={this.onChange} />
        {this.state.file && (
          <div style={{ textAlign: "center" }}>
            <button onClick={this.resetFile}>Remove File</button>
          </div>
        )}
        <img style={{ width: "100%" }} src={this.state.file} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));




export default App;