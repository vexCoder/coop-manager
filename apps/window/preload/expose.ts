/* eslint-disable @typescript-eslint/no-explicit-any */
import { contextBridge, ipcRenderer } from "electron";
import { Handles } from "../types/api";
import { HandlesNamespace } from "../types/preload";

type ActionFn<T extends HandlesNamespace> = (key: keyof Handles[T]) => void;

const Sym = Symbol("Handler");

const expose = <T extends HandlesNamespace>(
  context: T,
  setter: <Z>(_: {
    [Sym]: Z;
    invoker: ActionFn<T>;
    send: ActionFn<T>;
    listener: ActionFn<T>;
  }) => any
) => {
  type Keys = keyof Handles[T];

  function invoker(key: Keys) {
    // @ts-ignore
    this[Sym][key] = async (...args: any[]) =>
      ipcRenderer.invoke(`${context}:${key as string}`, ...args);
  }

  function send(key: Keys) {
    // @ts-ignore
    this[Sym][key] = (...args: any[]) =>
      ipcRenderer.send(`${context}:${key as string}`, ...args);
  }

  function listener(key: Keys) {
    // @ts-ignore
    this[Sym][key] = (callback: (evt: any, data: any) => void) =>
      ipcRenderer.on(`${context}:${key as string}`, callback);
  }

  const bind = {
    [Sym]: {},
    invoker,
    send,
    listener,
  };

  setter(bind);

  contextBridge.exposeInMainWorld(context, bind[Sym]);

  return bind;
};

export default expose;
