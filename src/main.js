import renderHeader from "./views/header";
import renderMoviesList from "./views/movies-list";
import {renderComponent} from "./utils";
import createPopup from "./components/popup";

const mainContainer = document.querySelector(`.main`);

renderHeader(mainContainer);
renderMoviesList(mainContainer);
renderComponent(document.body, createPopup());
