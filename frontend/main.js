import "bootstrap/dist/css/bootstrap.min.css";
import * as bootstrap from "bootstrap";
import "./styles.css";
import { MainPage } from "./pages/main/index.js";

window.bootstrap = bootstrap;

const root = document.getElementById("root");
const mainPage = new MainPage(root);

mainPage.render();
