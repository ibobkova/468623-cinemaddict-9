export const renderComponent = (container, ...storage) => {
  container.append(...storage);
};

export const createElement = (markup) => {
  const element = document.createElement(`template`);
  element.innerHTML = markup.trim();

  return element.content;
};
