'use strict';

const createGrid = () => {
  const container = document.querySelector('.grid-container');

  for (let i = 0; i < 12 * 12; i++) {
    const gridItem = document.createElement('div');
    gridItem.classList.add('grid-item');
    container.appendChild(gridItem);
  }
};

const minutesSinceMidnight = () => {
  const now = new Date();
  const midnight = new Date().setHours(0, 0, 0, 0);

  return ((now - midnight) / 1000) / 60;
}

const fillGrid = () => {
  const minutesPassed = minutesSinceMidnight();
  const fullBlocks = Math.floor(minutesPassed / 10);
  const remainder = minutesPassed % 10;

  const items = document.querySelectorAll('.grid-container .grid-item');

  items.forEach((element, index) => {
    const isFull = index < fullBlocks;
    element.classList.toggle('bg-time-passed', isFull);
    element.style.background = isFull ? '' : 'transparent';
  });

  const partialBlock = items[fullBlocks];
  if (partialBlock && remainder > 0) {
    partialBlock.classList.remove('bg-time-passed');
    partialBlock.style.background = `linear-gradient(to right, var(--green) ${remainder * 10}%, transparent 0%)`;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  createGrid();
  fillGrid();
  setInterval(fillGrid, 4000);
});
