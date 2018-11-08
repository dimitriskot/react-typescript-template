import * as React from "react";
import * as ReactDOM from "react-dom";
import "./scss/style.scss";
import { App } from "./components/App";

const title: string = "My Minimal React Webpack Typescript Setup";
const ROOT: HTMLElement = document.getElementById("root");

ReactDOM.render(<App title={title} />, ROOT);
