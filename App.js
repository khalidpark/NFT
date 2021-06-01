// 참조 : https://codesandbox.io/s/9lzmzykjkr?file=/src/index.js:49-58

import React, {useState} from "react";
import logo from "./logo.svg";
import QRCode from "qrcode.react";
import {getBalance, readCount, setCount} from "./api/UseCaver";
import * as KlipAPI from "./api/UseKlip";
import "./App.css";
import ReactDOM from "react-dom";

function onPressButton(balance) {
    console.log("hi H I");
}

// horizon line 넣는 코드
const HorizonLine = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        textAlign: "center",
        borderBottom: "1px solid #aaa",
        lineHeight: "0.1em",
        margin: "10px 0 20px",
      }}>
      <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
    </div>
  );
};

const onPressButton2 = (_balance, _setBalance) => {
    _setBalance(_balance);
};

const onPressBalance = async (_setBalance) => {
  let address = '0x45027a90d77d400701c18bc7c7d1ff5ef939abc7';
  _setBalance(await getBalance(address));
}

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

                <img
                    src="https://previews.123rf.com/images/phoebeyu/phoebeyu1709/phoebeyu170901007/87063262-cartoon-character-design-female-lovely-cute-girl-wearing-straw-hat-making-selfie-collection.jpg"
                    width="500"/>

                <HorizonLine text="STEP 1" />

                <ol
                    className="mw400 center"
                    style={{
                        textAlign: "center"
                    }}>
                    <h5>
                        Upload Your selfie
                        <br/>
                        <br/>
                          <UploadPreview/>
                    </h5>
                </ol>

                <HorizonLine text="STEP 2" />

                <h5>Check balance
                </h5>

                <button
                    onClick={() => {
                        onPressBalance(setBalance)
                    }}>Check my Balance</button>

                <h1>{balance}
                    KLAY</h1>
                <HorizonLine text="STEP 3" />


                <h5>Get NFT Market address</h5>
                <button
                    onClick={() => {
                        onClickGetAddress();
                    }}>
                    QRCODE Load
                </button>

                <br/>

                <QRCode value={qrvalue}/>
                <p>{balance}</p>

                <button
                    onClick={() => {
                        onClickSetCount();
                    }}>
                    SET COUNT
                </button>

                <br/>
                <br/>

                <a
                    className="App-link"
                    href="https://www.youtube.com/watch?v=mEOYinDTeqE"
                    target="_blank"
                    rel="noopener noreferrer">
                    "The value of NFT"
                </a>
            </header>
        </div>
    );
}


// Upload image and preview 
class UploadPreview extends React
    .Component {
        constructor(props) {
            super(props);
            this.state = {
                file: null
            };
            this.onChange = this
                .onChange
                .bind(this);
            this.resetFile = this
                .resetFile
                .bind(this);
        }
        onChange(event) {
            this.setState({
                file: URL.createObjectURL(event.target.files[0])
            });
        }

        resetFile(event) {
            event.preventDefault();
            this.setState({file: null});
        }
        render() {
            return (
                <div>
                    <input type="file" onChange={this.onChange}/> {
                        this.state.file && (
                            <div
                                style={{
                                    textAlign: "center"
                                }}>
                                <button onClick={this.resetFile}>Remove File</button>
                            </div>
                        )
                    }
                    <img
                        style={{
                            width: "100%"
                        }}
                        src={this.state.file}/>
                </div>
            );
        }
    }

    ReactDOM
    .render(<App/>, document.getElementById("root"));

export default App;