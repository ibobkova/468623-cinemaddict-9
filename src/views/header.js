import {renderComponent} from "../utils";
import createSearch from "../components/search";
import createUser from "../components/user";
import createMenu from "../components/menu";
import createSort from "../components/sort";

const headerContainer = document.querySelector(`.header`);

const renderHeader = (container) => {
  renderComponent(headerContainer, createSearch(), createUser());
  renderComponent(container, createMenu(), createSort());
};

export default renderHeader;
