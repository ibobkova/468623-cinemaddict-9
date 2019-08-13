import {createElement} from "../utils";

const markup = `
  <button class="films-list__show-more">Show more</button>
`;

const createButton = () => {
  return createElement(markup);
};

export default createButton;
