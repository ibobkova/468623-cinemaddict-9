import {movies} from "../data";
import createCard from "../components/card";
import {createElement, renderComponent} from "../utils";
import createButton from "../components/button";

const renderMoviesSection = (container, title, data, extra = false) => {
  const moviesSection = document.createElement(`section`);

  if (extra) {
    moviesSection.classList.add(`films-list--extra`);
  } else {
    moviesSection.classList.add(`films-list`);
  }
  container.append(moviesSection);

  const markupTitle = `
    <h2 class="${extra ? `films-list__title` : `films-list__title visually-hidden`}">${title}</h2>
  `;

  renderComponent(moviesSection, createElement(markupTitle));

  const moviesListContainer = document.createElement(`section`);
  moviesListContainer.classList.add(`films-list__container`);
  moviesSection.append(moviesListContainer);

  const movieStorage = data.map((movie) => createCard(movie));
  renderComponent(moviesListContainer, ...movieStorage);

  if (!extra) {
    renderComponent(moviesSection, createButton());
  }
};

const renderMoviesList = (container) => {
  const moviesContainer = document.createElement(`section`);
  moviesContainer.classList.add(`films`);
  container.append(moviesContainer);

  renderMoviesSection(moviesContainer, `All movies. Upcoming`, movies);
  renderMoviesSection(moviesContainer, `Top rated`, movies.slice(3), true);
  renderMoviesSection(moviesContainer, `Most commented`, movies.slice(3), true);
};

export default renderMoviesList;
