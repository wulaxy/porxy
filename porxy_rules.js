/***
 * Clash Verge Rev 全局极简分流脚本（六分组 + DNS覆写 + 图标）
 */

const enable = true;

function main(config) {
  if (!enable) return config;

  const allNodes = config?.proxies?.map(p => p.name) || [];

  // 添加直连节点
  if (!allNodes.includes('直连')) {
    config.proxies = config.proxies || [];
    config.proxies.push({ name: '直连', type: 'direct', udp: true });
  }

  // ====== 六个极简分组（带图标） ======
  config['proxy-groups'] = [
    { 
      name: '默认节点', 
      type: 'select', 
      proxies: ['直连', ...allNodes],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png'
    },
    { 
      name: '国内网站', 
      type: 'select', 
      proxies: ['直连', ...allNodes],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/StreamingCN.png'
    },
    { 
      name: '国外AI', 
      type: 'select', 
      proxies: ['默认节点', ...allNodes],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png'
    },
    { 
      name: 'YouTube', 
      type: 'select', 
      proxies: ['默认节点', ...allNodes],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png'
    },
    { 
      name: 'Telegram', 
      type: 'select', 
      proxies: ['默认节点', ...allNodes],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Telegram.png'
    },
    { 
      name: '广告追踪', 
      type: 'select', 
      proxies: ['REJECT', ...allNodes],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Advertising.png'
    },
  ];

  // ====== 极简规则 ======
  config['rules'] = [
    // 广告拦截
    'GEOSITE,category-ads-all,广告追踪',

    // 国外AI
    'GEOSITE,openai,国外AI',
    'GEOSITE,anthropic,国外AI',
    'GEOSITE,perplexity,国外AI',

    // YouTube
    'GEOSITE,youtube,YouTube',

    // Telegram
    'GEOSITE,telegram,Telegram',

    // 国内直连
    'GEOSITE,cn,国内网站',
    'GEOIP,CN,国内网站',

    // 兜底
    'MATCH,默认节点',
  ];

  // ====== DNS覆写 ======
  const chinaDNS = ['119.29.29.29', '223.5.5.5'];
  const foreignDNS = ['https://120.53.53.53/dns-query', 'https://223.5.5.5/dns-query'];

  config['dns'] = {
    enable: true,
    listen: ':1053',
    ipv6: true,
    'prefer-h3': true,
    'use-hosts': true,
    'use-system-hosts': true,
    'respect-rules': true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '198.18.0.1/16',
    'fake-ip-filter': ['*', '+.lan', '+.local', '+.market.xiaomi.com'],
    nameserver: [...foreignDNS],
    'proxy-server-nameserver': [...foreignDNS],
    'nameserver-policy': {
      'geosite:private': 'system',
      'geosite:cn,steam@cn,category-games@cn,microsoft@cn,apple@cn': chinaDNS,
    },
  };

  return config;
}
