import { useState } from 'react';
import { TUICallKit, TUICallKitServer, TUICallType } from "@tencentcloud/call-uikit-react";
import * as GenerateTestUserSig from "./debug/GenerateTestUserSig-es"; // Refer to Step 2.2

function Video() {
  const SDKAppID = 20015683;        // TODO: Replace with your SDKAppID (Notice: SDKAppID is of type number）
  const SDKSecretKey = 'd37a75f433f7503cd73f28e517ce1f523dae6e720d4af817a7e82e45ad23e53b';   // TODO: Replace with your SDKSecretKey
  
  const [callerUserID, setCallerUserID] = useState('');
  const [calleeUserID, setCalleeUserID] = useState('');
  //【3】Make a 1v1 video call
const call = async () => {
  await TUICallKitServer.call({
    userID: calleeUserID,
    type: TUICallType.VIDEO_CALL,
  });
};
  //【2】Initialize the TUICallKit component
  const init = async () => {
    const { userSig } = GenerateTestUserSig.genTestUserSig({ 
      userID: callerUserID,
      SDKAppID,
      SecretKey: SDKSecretKey,
    });
    await TUICallKitServer.init({
      userID: callerUserID,
      userSig,
      SDKAppID,
    });
    alert('TUICallKit init succeed');
  }
  return (
    <>
      <span> caller's ID: </span>
      <input type="text" placeholder='input caller userID' onChange={(event) => setCallerUserID(event.target.value)} />
      <button onClick={init}> step1. init </button> <br />
      <span> callee's ID: </span>
      <input type="text" placeholder='input callee userID' onChange={(event) => setCalleeUserID(event.target.value)} />
      <button onClick={call}> step2. call </button>
      
      {/* 【1】Import the TUICallKit component: Call interface UI */}
      <TUICallKit />
    </>
  );
}

export default Video
