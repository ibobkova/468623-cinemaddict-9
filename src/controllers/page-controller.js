import ButtonShowMore from '../components/button-show-more.js';
import FilmList from '../components/film-list.js';
import MovieController from '../controllers/movie-controller.js';
import Sort from '../components/sort.js';
import {
  filmLists,
  filmsCardsCurrent,
  filmsCategoriesId,
  getFilmsCardsPortion,
  sortTypes,
  sortTypesId,
  changefilmsCardsPortionCount,
  updateServerData,
  totalDownloadedFilmsCards,
  setNumberDownloadedFilmsCards
} from '../data.js';
import {
  addElementDOM,
  removeContainerChildren
} from '../utils.js';
import moment from 'moment';

/**
 * Class representaing controller of page.
 */
class PageController {
  /**
   * Create page controller.
   * @param {HTMLElement} films
   * @param {HTMLElement} filmsDetailsContainer
   * @param {HTMLElement} sort
   */
  constructor(films, filmsDetailsContainer, sort) {
    this._films = films;
    this._filmsDetailsContainer = filmsDetailsContainer;
    this._sort = sort;
    this._totalFilmPortionNumber = 1;
    this._movieControllers = [];
    this._getFilmsCards = getFilmsCardsPortion();

    this._onDataChange = this._onDataChange.bind(this);
  }

  /**
   * Create lists of films with cards if films.
   */
  init() {
    this._renderSortComponent();
    this._addFilmsLists();
  }

  /**
   * Add films lists.
   */
  _addFilmsLists() {
    this._movieControllers = [];
    this._addFilmsList(filmsCategoriesId.AllMoviesUpcoming);
    this._addFilmsList(filmsCategoriesId.TopRated);
    this._addFilmsList(filmsCategoriesId.MostCommented);
  }

  /**
   * Update data of film card.
   * @param {object} newData
   */
  _onDataChange(newData) {
    updateServerData(newData);
    changefilmsCardsPortionCount(totalDownloadedFilmsCards);
    removeContainerChildren(this._films);
    const containerfilmsDetailsHaveChildren =
      this._filmsDetailsContainer.children.length;
    removeContainerChildren(this._filmsDetailsContainer);
    this._addFilmsLists();
    this._renderFilmDetails(newData.id, containerfilmsDetailsHaveChildren);
  }

  /**
   * Render film details.
   * @param {number} id
   * @param {boolean} containerfilmsDetailsHaveChildren
   */
  _renderFilmDetails(id, containerfilmsDetailsHaveChildren) {
    for (const component of this._movieControllers) {
      if ((component.id === id) && containerfilmsDetailsHaveChildren) {
        component.openFilmDetails();
        break;
      }
    }
  }

  /**
   * Render sort component.
   */
  _renderSortComponent() {
    Object.entries(sortTypes).map((sortType) => {
      const sortComponent = new Sort(sortType);
      addElementDOM(this._sort, sortComponent);

      sortComponent.onSort = () => {
        const filmCategory = filmsCategoriesId.AllMoviesUpcoming;
        const filmsListContainer = document.getElementById(filmCategory);
        const filmsListFilmsContainer = this._getFilmsListFilmsContainer(filmsListContainer);
        const currentCountFilmsCards = filmsListFilmsContainer.children.length;
        const filmsCardsForSort = this._getFilmsCardsForSort(currentCountFilmsCards);
        const currentSortType = sortComponent.getSortType();

        removeContainerChildren(filmsListFilmsContainer);
        this._sortFilmsCards(filmsCardsForSort, currentSortType);
        this._addFilmsCards(filmsCardsForSort, filmsListContainer, filmsListFilmsContainer);
        this._changeActiveSort(sortComponent);
      };
    });
  }

  /**
   * Sort films card.
   * @param {array} filmsCardsForSort
   * @param {string} currentSortType
   */
  _sortFilmsCards(filmsCardsForSort, currentSortType) {
    switch (currentSortType) {
      case sortTypesId.date:
        filmsCardsForSort.sort((firstFilmCard, secondFilmCard) => {
          return moment(secondFilmCard.year) - moment(firstFilmCard.year);
        });
        break;
      case sortTypesId.rating:
        filmsCardsForSort.sort((firstFilmCard, secondFilmCard) => {
          return secondFilmCard.rating - firstFilmCard.rating;
        });
        break;
      default:
        break;
    }
  }

  /**
   * Сhange the display of active sorting.
   * @param {class} sortComponent
   */
  _changeActiveSort(sortComponent) {
    const sortButtonActiveContainer = document.querySelector(`.sort__button--active`);
    sortButtonActiveContainer.classList.remove(`sort__button--active`);
    const sortButtonContainer = sortComponent.element.querySelector(`.sort__button`);
    const sorts = this._sort.children;
    for (let sort of sorts) {
      if (sort.firstElementChild.dataset.sorttype ===
          sortButtonContainer.dataset.sorttype) {
        sort.firstElementChild.classList.add(`sort__button--active`);
      }
    }
  }

  /**
   * Return array film cards for sorting.
   * @param {number} currentCountFilmsCards
   * @return {array}
   */
  _getFilmsCardsForSort(currentCountFilmsCards) {
    return filmsCardsCurrent.slice(0, currentCountFilmsCards);
  }

  /**
    * Return html container for list of films.
    * @param {HTMLElement} filmsListElement
    * @return {HTMLElement}
    */
  _getFilmsListContainer(filmsListElement) {
    return document.getElementById(filmsListElement.firstElementChild.dataset.id);
  }

  /**
    * Return html container for films in list of films.
    * @param {HTMLElement} filmsListContainer
    * @return {HTMLElement}
    */
  _getFilmsListFilmsContainer(filmsListContainer) {
    return filmsListContainer.querySelector(`.films-list__container`);
  }

  /**
    * Add more cards of films.
    */
  _addMoreCards() {
    const filmsCardsPortion = this._getFilmsCards();
    this._totalFilmPortionNumber += 1;
    filmsCardsPortion.forEach((filmCardPortion) => {
      const filmsListContainer = document.getElementById(filmCardPortion.categoriesId[0]);
      const filmsListFilmsContainer =
        filmsListContainer.querySelector(`.films-list__container`);
      this._addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCardPortion);
    });
  }

  /**
    * Create button "ShowMore".
    * @param {HTMLElement} filmsListContainer
    */
  _createButtonShowMore(filmsListContainer) {
    const buttonShowMoreComponent = new ButtonShowMore();
    addElementDOM(filmsListContainer, buttonShowMoreComponent);

    buttonShowMoreComponent.onOpen = () => {
      setNumberDownloadedFilmsCards();
      this._addMoreCards();
      if (this._totalFilmPortionNumber === 3) {
        document.querySelector(`.films-list__show-more`).remove();
        buttonShowMoreComponent.unrender();
      }
    };
  }

  /**
   * Return portion of film cards.
   * @param {string} filmCategory
   * @return {array}
   */
  _getFilmsCardsPortion(filmCategory) {
    return filmCategory === filmsCategoriesId.AllMoviesUpcoming
      ? this._getFilmsCards() : filmsCardsCurrent;
  }

  /**
   * Add one card of film.
   * @param {HTMLElement} filmsListContainer
   * @param {HTMLElement} filmsListFilmsContainer
   * @param {object} filmCard
   */
  _addFilmCard(filmsListContainer, filmsListFilmsContainer,
      filmCard) {
    const movieController = new MovieController(filmCard, filmsListContainer,
        filmsListFilmsContainer, this._filmsDetailsContainer,
        this._onDataChange);
    movieController.init();
    this._movieControllers.push(movieController);
  }

  /**
    * Add cards of film.
    * @param {string} filmsCardsPortion
    * @param {HTMLElement} filmsListContainer
    * @param {HTMLElement} filmsListFilmsContainer
    */
  _addFilmsCards(filmsCardsPortion, filmsListContainer,
      filmsListFilmsContainer) {
    filmsCardsPortion.forEach((filmCard) => {
      this._addFilmCard(filmsListContainer, filmsListFilmsContainer, filmCard);
    });
  }

  /**
    * Add film lists.
    * @param {string} filmCategory
    */
  _addFilmsList(filmCategory) {
    const filmsListComponent = new FilmList(filmLists[filmCategory]);
    addElementDOM(this._films, filmsListComponent);

    const filmsListElement = filmsListComponent.element;
    const filmsListContainer = this._getFilmsListContainer(filmsListElement);
    const filmsListFilmsContainer = this._getFilmsListFilmsContainer(filmsListContainer);
    const filmsCardsPortion = this._getFilmsCardsPortion(filmCategory);
    this._addFilmsCards(filmsCardsPortion, filmsListContainer, filmsListFilmsContainer);

    if ((filmsListElement.firstElementChild.dataset.isbutton)
      && totalDownloadedFilmsCards < filmsCardsCurrent.length) {
      this._createButtonShowMore(filmsListContainer);
    }
  }
}

export default PageController;
