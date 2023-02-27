/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ipcMain,
  IpcMainInvokeEvent,
  IpcMainEvent,
  BrowserWindow,
} from "electron";
import { instanceToPlain } from "class-transformer";
import { HandlesNamespace, HandlesKeys } from "../types/preload";
import { Handles } from "../types/api";
import { InferListenerParams } from "../types/preload-utils";
import type { Application } from "./app";

type HandlerCallback<T, Type extends "invoke" | "send"> = T extends (
  ...args: infer P
) => infer R
  ? Type extends "invoke"
    ? (evt: IpcMainInvokeEvent, ...args: P) => R | Promise<R>
    : (evt: IpcMainEvent, ...args: P) => void
  : never;

class Handler {
  static registerInvokeApi<T extends { new (app: Application): any }>(
    app: Application,
    ClassType: T
  ) {
    const instance = new ClassType(app);

    console.log(instance.login, instance.login.length);

    const plainObj = instanceToPlain(instance, {
      excludeExtraneousValues: true,
    });

    const { namespace } = instance;

    if (!namespace) throw new Error("Not an api class");

    Object.entries(plainObj).forEach(([key, handler]) => {
      console.log(key, handler, (handler as Function).length);
      ipcMain.handle(`${namespace}:${key}`, async (_evt, ...args) => {
        const res = await handler(...args);
        return res;
      });
    });
  }

  static registerInvokeHandle<
    Namespace extends HandlesNamespace,
    Key extends HandlesKeys<Namespace>
  >(
    namespace: Namespace,
    name: Key,
    handler: HandlerCallback<Handles[Namespace][Key], "invoke">
  ) {
    const handlerKey = `${namespace}:${name as string}`;
    if (typeof handler === "function") {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ipcMain.handle(handlerKey, handler);
    }
  }

  static registerSendHandle<
    Namespace extends HandlesNamespace,
    Key extends HandlesKeys<Namespace>
  >(
    namespace: Namespace,
    name: Key,
    handler: HandlerCallback<Handles[Namespace][Key], "send">
  ) {
    const handlerKey = `${namespace}:${name as string}`;
    if (typeof handler === "function")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ipcMain.on(handlerKey, handler);
  }

  static sendListenerEvent<
    Namespace extends HandlesNamespace,
    Key extends HandlesKeys<Namespace>
  >(
    browser: BrowserWindow,
    namespace: Namespace,
    name: Key,
    ...args: InferListenerParams<Handles[Namespace][Key]>
  ) {
    const handlerKey = `${namespace}:${name as string}`;
    browser.webContents.send(handlerKey, ...args);
  }
}

export default Handler;
