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

const generatePageStats = async () => {
  const statsList = document.getElementById('statsList');
  statsList.innerHTML = '<div class="stats-item placeholder">正在加载数据...</div>';

  try {
    // 尝试使用 Chrome Extension API 或其他方式来获取历史记录
    // 由于浏览器的安全限制，我们使用 LocalStorage 来存储访问数据
    const pageStats = getPageStatsFromStorage();
    
    if (pageStats.length === 0) {
      statsList.innerHTML = '<div class="stats-item placeholder">暂无数据</div>';
      return;
    }

    // 按小格子数量排序（降序）
    pageStats.sort((a, b) => b.count - a.count);

    // 显示统计结果
    statsList.innerHTML = '';
    pageStats.forEach(page => {
      const item = document.createElement('div');
      item.className = 'stats-item';
      item.innerHTML = `
        <span class="page-url" title="${page.url}">${page.url}</span>
        <span class="page-count">${page.count}</span>
      `;
      statsList.appendChild(item);
    });
  } catch (error) {
    console.error('Failed to generate page stats:', error);
    statsList.innerHTML = '<div class="stats-item placeholder">加载失败</div>';
  }
};

const getPageStatsFromStorage = () => {
  // 从 localStorage 获取存储的页面访问统计
  const stored = localStorage.getItem('pageStats');
  if (stored) {
    return JSON.parse(stored);
  }
  return [];
};

const initPageTracking = () => {
  // 初始化页面访问跟踪
  const currentUrl = window.location.href;
  const now = Date.now();
  const stats = getPageStatsFromStorage();
  
  // 检查当前页面是否已存在
  const existingIndex = stats.findIndex(page => page.url === currentUrl);
  
  if (existingIndex !== -1) {
    // 如果存在，检查上次更新时间
    const page = stats[existingIndex];
    const timeDiff = now - (page.lastUpdate || now);
    const blocksToAdd = Math.floor(timeDiff / (10 * 60 * 1000)); // 每10分钟一个小格子
    
    if (blocksToAdd > 0) {
      stats[existingIndex].count += blocksToAdd;
      stats[existingIndex].lastUpdate = now;
    }
  } else {
    // 如果不存在，添加新条目
    stats.push({ url: currentUrl, count: 0, lastUpdate: now });
  }
  
  // 保存回 localStorage
  localStorage.setItem('pageStats', JSON.stringify(stats));
  return stats;
};

document.addEventListener('DOMContentLoaded', () => {
  createGrid();
  fillGrid();
  setInterval(fillGrid, 4000);
  
  initPageTracking();
  generatePageStats();
  
  // 每分钟检查一次并更新统计
  setInterval(() => {
    initPageTracking();
    generatePageStats();
  }, 60 * 1000);
  
  // 页面卸载时记录最后的访问时间
  window.addEventListener('beforeunload', () => {
    initPageTracking();
  });
});
