import { BrowserWindow, app } from "electron";
import { join } from "path";
import dotenv from "dotenv";
import { registerDataHandlers } from "./data";

dotenv.config({
  path: join(__dirname, "..", ".env"),
});

export class Application {
  win: BrowserWindow | undefined;

  init() {
    // Initialize DB & etc...
    return this;
  }

  makeWindow() {
    // Change to the view's path/url
    const urlOrPath = "http://localhost:3000";
    this.win = new BrowserWindow({
      width: 1080,
      height: 810,
      webPreferences: {
        preload: join(__dirname, "preload.js"),
      },
    });

    const isUrl = urlOrPath.startsWith("http");
    if (isUrl) this.win.loadURL(urlOrPath);
    if (!isUrl) this.win.loadFile(urlOrPath);
    this.win.webContents.openDevTools();

    return this;
  }

  startEvents() {
    if (!this.win) return this;

    app.on("window-all-closed", () => {
      console.log("window-all-closed");
      if (process.platform !== "darwin") {
        // Quit process if all windows are closed
        app.quit();
      }
    });

    return this;
  }

  attachHandlers() {
    // Attach handlers to the window
    registerDataHandlers(this);
    return this;
  }

  static async boot() {
    // eslint-disable-next-line global-require
    if (require("electron-squirrel-startup")) return;

    await app.whenReady();

    // eslint-disable-next-line prettier/prettier
    new Application().init().makeWindow().startEvents().attachHandlers();
  }
}
