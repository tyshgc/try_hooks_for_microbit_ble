import { useState } from "react";
import useMicrobitBLEConnect from "./useMicrobitBLEConnect";

/**
 * hooks/ useMicrobitBLEAcceler
 * Getting acceleration value from the micro:bit BLE(Bluetooth Low Energy).
 */
export default function useMicrobitBLEAcceler() {
  const SERVICE_UUID = "e95d0753-251d-470a-a062-fa1922dfa9a8";
  const CHARACTERSTIC_UUID = "e95dca4b-251d-470a-a062-fa1922dfa9a8";

  const [acceler, setAcceler] = useState<IAccelerValues>();
  const listner = (event: IListnerEventHandler) => {
    const values = {
      x: event.target.value.getInt16(0, true),
      y: event.target.value.getInt16(2, true),
      z: event.target.value.getInt16(4, true),
    };
    setAcceler(values);
  };

  const connectHooks = useMicrobitBLEConnect(
    SERVICE_UUID,
    CHARACTERSTIC_UUID,
    listner
  );

  return { ...connectHooks, acceler };
}

interface IAccelerValues {
  x: number;
  y: number;
  z: number;
}
type IListnerEventHandler = any;
