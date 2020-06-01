import * as React from "react";
import useMicrobitBLEAcceler from "./hooks/useMicrobitBLEAcceler";
import styled from "@emotion/styled";

function App() {
  const { acceler, onConnect, onDisconnect } = useMicrobitBLEAcceler();

  function AccelerValues() {
    if (!acceler)
      return (
        <SValueWrapper>
          <SValue>0</SValue>
          <SValue>0</SValue>
          <SValue>0</SValue>
        </SValueWrapper>
      );
    const { x, y, z } = acceler;
    return (
      <SValueWrapper>
        <SValue>{x}</SValue>
        <SValue>{y}</SValue>
        <SValue>{z}</SValue>
      </SValueWrapper>
    );
  }

  return (
    <SWrapper>
      <div>
        {AccelerValues()}
        <div>
          <SButton onClick={() => onConnect()}>Connect</SButton>
          <SButton onClick={() => onDisconnect()}>Disconnect</SButton>
        </div>
      </div>
    </SWrapper>
  );
}

const SWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #000;
`;
const SValueWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const SValue = styled.strong`
  color: #fff;
  display: block;
  font-size: 4em;
  font-weight: bold;
  margin-right: 12px;
  min-width: 160px;
  &:last-child {
    margin-right: 0;
  }
`;
const SButton = styled.button`
  background: #fff;
  border: none;
  border-radius: 999px;
  height: 32px;
  margin-right: 12px;
  padding: 0 12px;
  text-align: center;
  outline: none;
  &:last-child {
    margin-right: 0;
  }
`;

export default App;
