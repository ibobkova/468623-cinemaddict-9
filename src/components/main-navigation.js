
import {
  getMainNavigationTemplate
} from './main-navigation-template.js';
import {
  menuTypes,
  menuTypesId
} from '../data.js';
import {
  KEYS
} from '../utils.js';
import AbstractComponent from './abstract-component.js';

/**
 * Class representaing main navigation.
 * @extends AbstractComponent
 */
class MainNavigation extends AbstractComponent {
  /**
   * Create main navigation.
   */
  constructor() {
    super();
    this._menuTypes = menuTypes;
    this._menuTypesId = menuTypesId;

    this._selectFilms = null;
    this._openCloseState = null;
    this._onSelectFilms = this._onSelectFilms.bind(this);
    this._onOpenCloseState = this._onOpenCloseState.bind(this);
  }

  /**
   * Get template.
   * @return {string}
   */
  get template() {
    return getMainNavigationTemplate(this);
  }

  /**
   * Save the function for selecting of films.
   * @param {function} fn
   */
  set selectFilms(fn) {
    this._selectFilms = fn;
  }

  /**
   * Save the function for open/close state.
   * @param {function} fn
   */
  set openCloseState(fn) {
    this._openCloseState = fn;
  }

  /**
   * Add events for elements.
   * @param {DocumentFragment} element
   */
  bind(element = null) {
    if (element === null) {
      element = this._element;
    }
    this._bindOnSelectFilms(element);
    this._bindOnOpenCloseState(element);
  }

  /**
   * Remove events for elements.
   * @param {DocumentFragment} element
   */
  unbind(element = null) {
    if (element === null) {
      element = this._element;
    }
    this._unbindOnSelectFilms(element);
    this._unbindOnOpenCloseState(element);
  }

  /**
   * Add events for selecting of films.
   * @param {DocumentFragment} element
   */
  _bindOnSelectFilms(element) {
    if (element !== null) {
      const itemsContainer = element.querySelectorAll(`.main-navigation__item`);
      for (const itemContainer of itemsContainer) {
        if (itemContainer.dataset.id !== menuTypesId.stats) {
          itemContainer.addEventListener(`click`, this._onSelectFilms);
          itemContainer.addEventListener(`keydown`, this._onSelectFilms);
        }
      }
    }
  }

  /**
   * Add events for open/close state.
   * @param {DocumentFragment} element
   */
  _bindOnOpenCloseState(element) {
    if (element !== null) {
      const itemsContainer = element.querySelectorAll(`.main-navigation__item`);
      for (const itemContainer of itemsContainer) {
        if (itemContainer.dataset.id === menuTypesId.stats) {
          itemContainer.addEventListener(`click`, this._onOpenCloseState);
          itemContainer.addEventListener(`keydown`, this._onOpenCloseState);
        }
      }
    }
  }

  /**
   * Remove events for selecting of films.
   * @param {DocumentFragment} element
   */
  _unbindOnSelectFilms(element) {
    if (element !== null) {
      const itemsContainer = element.querySelectorAll(`.main-navigation__item`);
      for (let itemContainer of itemsContainer) {
        if (itemContainer.dataset.id !== menuTypesId.stats) {
          itemContainer.removeEventListener(`click`, this._onSelectFilms);
          itemContainer.removeEventListener(`keydown`, this._onSelectFilms);
        }
      }
    }
  }

  /**
   * Remove events for open/close state.
   * @param {DocumentFragment} element
   */
  _unbindOnOpenCloseState(element) {
    if (element !== null) {
      const itemsContainer = element.querySelectorAll(`.main-navigation__item`);
      for (const itemContainer of itemsContainer) {
        if (itemContainer.dataset.id === menuTypesId.stats) {
          itemContainer.removeEventListener(`click`, this._onOpenCloseState);
          itemContainer.removeEventListener(`keydown`, this._onOpenCloseState);
        }
      }
    }
  }

  /**
   * Call the function for selecting films.
   * @param {event} evt
   */
  _onSelectFilms(evt) {
    if ((evt.keyCode === KEYS.ENTER || evt.type === `click`)
      && (typeof this._selectFilms === `function`)) {
      this._selectFilms(evt);
    }
  }

  /**
   * Call the function for open/close state.
   * @param {event} evt
   */
  _onOpenCloseState(evt) {
    if ((evt.keyCode === KEYS.ENTER || evt.type === `click`)
      && (typeof this._openCloseState === `function`)) {
      this._openCloseState(evt);
    }
  }
}

export default MainNavigation;
