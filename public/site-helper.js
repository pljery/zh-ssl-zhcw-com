// public/site-helper.js

const SiteHelper = (function() {
  // 配置数据
  const CONFIG = {
    siteUrl: 'https://zh-ssl-zhcw.com',
    keywords: ['中彩网', '彩票资讯', '开奖信息', '走势分析'],
    version: '1.0.0'
  };

  // 提示卡片工厂
  function createTipCard(title, content, type) {
    const card = document.createElement('div');
    card.className = `site-tip-card site-tip-${type || 'info'}`;
    
    const header = document.createElement('div');
    header.className = 'tip-header';
    header.textContent = title;
    
    const body = document.createElement('div');
    body.className = 'tip-body';
    body.textContent = content;
    
    card.appendChild(header);
    card.appendChild(body);
    
    return card;
  }

  // 关键词徽章生成
  function createKeywordBadge(text, link) {
    const badge = document.createElement('span');
    badge.className = 'keyword-badge';
    badge.textContent = text;
    
    if (link) {
      badge.style.cursor = 'pointer';
      badge.addEventListener('click', function() {
        window.open(link, '_blank');
      });
    }
    
    return badge;
  }

  // 访问说明面板
  function createAccessPanel() {
    const panel = document.createElement('div');
    panel.className = 'access-panel';
    
    const title = document.createElement('h3');
    title.textContent = '访问说明';
    
    const list = document.createElement('ul');
    const items = [
      '本页面由 SiteHelper 动态生成提示卡片',
      '关键词徽章可点击跳转至相关页面',
      '所有内容来自 ' + CONFIG.siteUrl
    ];
    
    items.forEach(function(text) {
      const li = document.createElement('li');
      li.textContent = text;
      list.appendChild(li);
    });
    
    panel.appendChild(title);
    panel.appendChild(list);
    
    return panel;
  }

  // 渲染所有组件到指定容器
  function renderToContainer(containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
      console.warn('容器元素未找到: ' + containerId);
      return;
    }
    
    // 清空容器
    container.innerHTML = '';
    
    // 添加提示卡片
    const card1 = createTipCard('站点提示', '欢迎访问 ' + CONFIG.siteUrl + '，获取最新彩票资讯', 'info');
    const card2 = createTipCard('安全提醒', '请通过官方渠道核实信息，注意防范诈骗', 'warning');
    
    container.appendChild(card1);
    container.appendChild(card2);
    
    // 添加关键词徽章区域
    const badgeContainer = document.createElement('div');
    badgeContainer.className = 'badge-container';
    badgeContainer.style.marginTop = '16px';
    
    const badgeLabel = document.createElement('span');
    badgeLabel.textContent = '相关关键词: ';
    badgeLabel.style.marginRight = '8px';
    badgeContainer.appendChild(badgeLabel);
    
    CONFIG.keywords.forEach(function(keyword) {
      const badge = createKeywordBadge(keyword, CONFIG.siteUrl + '/search?q=' + encodeURIComponent(keyword));
      badgeContainer.appendChild(badge);
    });
    
    container.appendChild(badgeContainer);
    
    // 添加访问说明面板
    const accessPanel = createAccessPanel();
    accessPanel.style.marginTop = '24px';
    container.appendChild(accessPanel);
  }

  // 公共 API
  return {
    render: renderToContainer,
    createTip: createTipCard,
    createBadge: createKeywordBadge,
    version: CONFIG.version
  };
})();