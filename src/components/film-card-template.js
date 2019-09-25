/**
 * Return template for card of film.
 * @param {object} filmCard
 * @return {string}
 */
const getFilmCardTemplate = ({title, rating, year, duration, genres, img,
  description, countComments}) => {
  return `
    <article class="film-card">
      <h3 class="film-card__title">
        ${title}
      </h3>
      <p class="film-card__rating">
        ${rating}
      </p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${img}"
        alt="" class="film-card__poster"
      >
      <p class="film-card__description">
        ${description}
      </p>
      <a class="film-card__comments">
        ${countComments} comment${countComments === 1 ? `` : `s`}   
      </a>      
      <form class="film-card__controls">
        <button class="film-card__controls-item button 
        film-card__controls-item--add-to-watchlist">
          Add to watchlist
        </button>
        <button class="film-card__controls-item button 
        film-card__controls-item--mark-as-watched">
          Mark as watched
        </button>
        <button class="film-card__controls-item button 
        film-card__controls-item--favorite">
          Mark as favorite
        </button>
      </form>
    </article>`;
};

export {
  getFilmCardTemplate
};