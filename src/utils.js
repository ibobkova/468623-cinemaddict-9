export const renderComponent = (container, ...storage) => {
  container.append(...storage);
};

export const createElement = (markup) => {
  const element = document.createElement(`template`);
  element.innerHTML = markup.trim();

  return element.content;
};

export const formatDateTime = (userDate) => {
  const dateTime = userDate.toLocaleString(`en-US`, {
    month: `long`,
    day: `numeric`,
    timezone: `UTC`,
    hour: `numeric`,
    minute: `numeric`
  });

  let date = dateTime.split(`,`)[0].split(` `);
  [date[1], date[0]] = [date[0], date[1]];
  date = date.join(` `);

  let time = dateTime.split(`,`)[1];

  return {
    date,
    time
  };
};
