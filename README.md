# electron-wallpaper
Desktop app to change Windows wallpaper built with React + Electron

## About
#### Lerna
This project is organized as a *monorepo* using [Lerna](https://github.com/lerna/lerna). It contains multiple sub-projects with a common `package.json` on the root folder.
The electron and react projects can be found inside */packages* folder.

#### React
The react app is created using [Create React App](https://github.com/facebook/create-react-app) and it's developed with __Typescript__ and __SASS__.

#### Electron
The electron app is packaged into a Windows installer using [electron-builder](https://github.com/electron-userland/electron-builder).

## Commands
These commands must be executed from root folder.

* Install dependencies: `npm install`
* Run hot reload app: `npm run start`
* Package app into windows installer: `npm run package`. The installer will be placed at */packages/electron/release*.
