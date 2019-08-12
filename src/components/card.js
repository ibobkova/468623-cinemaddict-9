import {createElement} from "../utils";

const createCard = (movie) => {

  const markup = `
    <article class="film-card">
      <h3 class="film-card__title">${movie.title}</h3>
      <p class="film-card__rating">${movie.rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${movie.year}</span>
        <span class="film-card__duration">${movie.duration}</span>
        <span class="film-card__genre">${movie.genre}</span>
      </p>
      <img src="./images/posters/the-man-with-the-golden-arm.jpg" alt="" class="film-card__poster">
      <p class="film-card__description">${movie.desc}</p>
      <a class="film-card__comments">${movie.comments.length} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched film-card__controls-item--active">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>
`;

  return createElement(markup);
};

export default createCard;
