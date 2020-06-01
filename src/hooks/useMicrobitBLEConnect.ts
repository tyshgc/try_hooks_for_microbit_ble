import { useState } from "react";

/**
 * hooks/ useMicrobitBLEConnect
 * Connecting to the micro:bit BLE(Bluetooth Low Energy).
 * @param service_uuid (string) Service UUID.
 * @param characteristic_uuid (string) Characterstic UUID.
 * @param listner (EventListenerOrEventListenerObject) Listner Event.
 */
export default function useMicrobitBLEConnect(
  service_uuid: string,
  characteristic_uuid: string,
  listner: EventListenerOrEventListenerObject
) {
  const [device, setDevice] = useState<BluetoothDevice>();
  const [status, changeStatus] = useState<IBLEStatus>("STANDBY");
  const [connectError, setConnectError] = useState<Error>();

  const onConnect = () => {
    changeStatus("CONNECTING");
    navigator.bluetooth
      .requestDevice({
        filters: [
          {
            namePrefix: "BBC micro:bit",
          },
        ],
        optionalServices: [service_uuid],
      })
      .then((responceDevice: BluetoothDevice) => {
        setDevice(responceDevice);
        return responceDevice!.gatt!.connect();
      })
      .then((server: BluetoothRemoteGATTServer) => {
        return server.getPrimaryService(service_uuid);
      })
      .then((service: BluetoothRemoteGATTService) => {
        return service.getCharacteristic(characteristic_uuid);
      })
      .then((chara: BluetoothRemoteGATTCharacteristic) => {
        changeStatus("CONNECTED");
        chara.startNotifications();
        chara.addEventListener("characteristicvaluechanged", listner);
      })
      .catch((error: Error) => {
        setConnectError(error);
      });
  };

  const onDisconnect = () => {
    if (!device || !device!.gatt!.connected) return;
    device!.gatt!.disconnect();
    changeStatus("DISCONNECTED");
    changeStatus("STANDBY");
  };

  return { device, status, onConnect, onDisconnect, connectError };
}

const BLE_STATUS_MESSAGES = {
  STANDBY: "standby.",
  CONNECTED: "connect complete!",
  DISCONNECTED: "disconnected.",
  CONNECTING: "connecting now...",
  FAIL: "connect failed.",
};
type IBLEStatus = keyof typeof BLE_STATUS_MESSAGES;
