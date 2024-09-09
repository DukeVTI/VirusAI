import React from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/context";

const Main = () => {
  const { showResult, loading, result, onSent, recentPrompt} = React.useContext(Context);
  const [tempInput, setTempInput] = React.useState(""); // Local state for input

  const handleSend = () => {
    if (tempInput.trim()) {
      onSent(tempInput); // Send input directly to onSent
      setTempInput(""); // Clear input field after sending
    }
  };

  return (
    <div className="main">
      <div className="nav">
        <p>Virus AI</p>
        <img src={assets.profile} alt="" />
      </div>
      <div className="main-container">
        {!showResult ? (
          <>
            <div className="greet">
              <p>
                <span>Hello, Duke.</span>
              </p>
              <p>How can I help you today?</p>
            </div>
            <div className="cards">
              {/* Example cards */}
              <div className="card">
                <p>
                  Democracy has come too soon for African countries. Debate
                  this.
                </p>
                <img src={assets.message_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Improve the readability of the following code attached below.
                </p>
                <img src={assets.code_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  Brainstorm a few ideas that my group can present for our Group
                  Project
                </p>
                <img src={assets.bulb_icon} alt="" />
              </div>
              <div className="card">
                <p>
                  The Virusia Academy and the various courses they offer as a
                  top-tier Tech Academy
                </p>
                <img src={assets.compass_icon} alt="" />
              </div>
            </div>
          </>
        ) : (
          <div className="result">
            <div className="result-title">
                <img src={assets.profile} alt="" />
                <p>{recentPrompt}</p>
            </div>
            <div className="result-data">
                <img src={assets.gemini_icon} alt="" />
                {loading
                ?<div className="loader">
                    <hr />
                    <hr />
                    <hr />
                </div>
                :<p dangerouslySetInnerHTML={{__html:result}}></p>
            }
                
            </div>
          </div>
        )}
        <div className="main-bottom">
          <div className="search-box">
            <input
              onChange={(e) => setTempInput(e.target.value)}
              value={tempInput}
              type="text"
              placeholder="Enter a prompt here"
            />
            <div>
              <img src={assets.gallery_icon} alt="" />
              <img src={assets.mic_icon} alt="" />
              {tempInput? <img onClick={handleSend} src={assets.send_icon} alt="" />:null}
            </div>
          </div>
          <p className="bottom-info">
            Virus AI may display inaccurate information, including about people.
            Always try to double-check its responses. Developed by Virusia Inc.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Main;
