// Made by WuLaxy with GPT & Gemini

const enable = true;

function main(config) {
  if (!enable) return config;

  const allNodes = config?.proxies?.map(p => p.name) || [];

  if (!allNodes.includes('直连')) {
    config.proxies = config.proxies || [];
    config.proxies.push({ name: '直连', type: 'direct', udp: true });
  }

  const getNodesByKeywords = (keywords) => {
    return allNodes.filter(p => keywords.some(k => p.toLowerCase().includes(k.toLowerCase())));
  };

  const getRate = (nodeName) => {
    const yuanMatch = nodeName.match(/(\d+(\.\d+)?)元/);
    if (yuanMatch) return parseFloat(yuanMatch[1]) * 10;
    const xMatch = nodeName.match(/(\d+(\.\d+)?)x/i);
    if (xMatch) return parseFloat(xMatch[1]);
    const rateMatch = nodeName.match(/(\d+(\.\d+)?)倍率?/);
    if (rateMatch) return parseFloat(rateMatch[1]);
    return 1.0;
  };

  const lowRateNodes = allNodes.filter(p => getRate(p) < 1.0);
  const medRateNodes = allNodes.filter(p => getRate(p) >= 1.0 && getRate(p) <= 2.0);
  const highRateNodes = allNodes.filter(p => getRate(p) > 2.0);

  const countryConfigs = [
    { name: '韩国节点', keywords: ['韩国', 'KR', 'Korea'], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/South_Korea.png' },
    { name: '美国节点', keywords: ['美国', 'US', 'United States'], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png' },
    { name: '日本节点', keywords: ['日本', 'JP', 'Japan'], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png' },
    { name: '台湾节点', keywords: ['台湾', 'TW', 'Taiwan'], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Taiwan.png' },
    { name: '土耳其节点', keywords: ['土耳其', 'TR', 'Turkey'], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Turkey.png' },
    { name: '香港节点', keywords: ['香港', 'HK', 'Hong Kong'], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png' },
    { name: '新加坡节点', keywords: ['新加坡', 'SG', 'Singapore'], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png' },
    { name: '英国节点', keywords: ['英国', 'UK', 'United Kingdom'], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_Kingdom.png' }
  ];

  const countryGroups = countryConfigs.map(c => c.name);
  const rateGroups = ['低倍节点', '中倍节点', '高倍节点'];
  const baseProxies = ['自选节点', 'REJECT'];
  const commonProxies = [...baseProxies, ...rateGroups, ...countryGroups, ...allNodes];

  config['proxy-groups'] = [
    { name: '自选节点', type: 'select', proxies: ['直连', 'REJECT', ...rateGroups, ...countryGroups, ...allNodes], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png' },
    { name: '国内网站', type: 'select', proxies: ['直连', '自选节点', 'REJECT'], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/StreamingCN.png' },
    { name: '国外AI', type: 'select', proxies: ['自选节点', ...commonProxies], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png' },
    { name: 'YouTube', type: 'select', proxies: ['自选节点', ...commonProxies], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png' },
    { name: '流媒体', type: 'select', proxies: ['自选节点', ...commonProxies], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Streaming.png' },
    { name: 'Telegram', type: 'select', proxies: ['自选节点', ...commonProxies], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Telegram.png' },
    { name: 'Emby', type: 'select', proxies: ['直连', ...commonProxies], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Emby.png' },
    { name: 'Apple', type: 'select', proxies: ['直连', ...commonProxies], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Apple.png' },
    { name: 'GitHub', type: 'select', proxies: ['自选节点', ...commonProxies], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/GitHub.png' },
    { name: 'Steam/Epic', type: 'select', proxies: ['直连', ...commonProxies], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Steam.png' },
    { name: '广告追踪', type: 'select', proxies: ['REJECT', '直连'], icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Advertising.png' },
    { name: '低倍节点', type: 'url-test', proxies: lowRateNodes.length > 0 ? lowRateNodes : ['直连'], url: 'http://www.gstatic.com/generate_204', interval: 300, icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Speedtest.png' },
    { name: '中倍节点', type: 'url-test', proxies: medRateNodes.length > 0 ? medRateNodes : ['直连'], url: 'http://www.gstatic.com/generate_204', interval: 300, icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Speedtest.png' },
    { name: '高倍节点', type: 'url-test', proxies: highRateNodes.length > 0 ? highRateNodes : ['直连'], url: 'http://www.gstatic.com/generate_204', interval: 300, icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Speedtest.png' },
    ...countryConfigs.map(c => ({ name: c.name, type: 'url-test', proxies: getNodesByKeywords(c.keywords).length > 0 ? getNodesByKeywords(c.keywords) : ['直连'], url: 'http://www.gstatic.com/generate_204', interval: 300, icon: c.icon })),
  ];

  // 1. 开启嗅探功能 (Sniffer) - 解决抖音/B站/CDN识别
  config['sniffer'] = {
    enable: true,
    sniff: {
      TLS: { 'proxy-name': ['自选节点'], 'ports': [443, 8443] },
      HTTP: { 'proxy-name': ['自选节点'], 'ports': [80, 8080] },
      QUIC: { 'proxy-name': ['自选节点'], 'ports': [443] }
    },
    'force-domain': ['google.com']
  };

  // 2. 优化分流规则 - 逻辑：局域网 -> 广告 -> 大厂白名单 -> 社交黑名单 -> 剩余国内IP -> 全部代理
  config['rules'] = [
    'IP-CIDR,192.168.0.0/16,DIRECT',
    'IP-CIDR,10.0.0.0/8,DIRECT',
    'IP-CIDR,172.16.0.0/12,DIRECT',
    'IP-CIDR,127.0.0.0/8,DIRECT',
    'GEOSITE,category-ads-all,广告追踪',
    
    // 明确的大厂白名单，保证抖音B站直连
    'GEOSITE,bilibili,国内网站',
    'GEOSITE,bytedance,国内网站', 
    'GEOSITE,cn,国内网站',
    
    // 媒体与社交黑名单
    'DOMAIN-KEYWORD,emby,Emby',
    'DOMAIN-KEYWORD,plex,Emby',
    'GEOSITE,openai,国外AI',
    'GEOSITE,github,GitHub',
    'GEOSITE,youtube,YouTube',
    'GEOSITE,telegram,Telegram',
    'GEOSITE,netflix,流媒体',
    'GEOSITE,disney,流媒体',
    'GEOSITE,spotify,流媒体',
    'GEOSITE,apple,Apple',
    'GEOSITE,steam,Steam/Epic',
    
    // 强制地理位置识别
    'GEOSITE,geolocation-!cn,自选节点',
    
    // 剩余国内 IP 兜底（如果没匹配上大厂名单但服务器在中国，依然直连）
    'GEOIP,CN,国内网站',
    
    // 最终防御：所有未知的（包括泄露测试网站）全部强制代理
    'MATCH,自选节点',
  ];

  // 3. DNS 终极防泄露配置
  config['dns'] = {
    enable: true,
    listen: ':1053',
    ipv6: false,
    'prefer-h3': true,
    'respect-rules': true, // 必须：让 DNS 跟随规则
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '198.18.0.1/16',
    'fake-ip-filter': ['+.lan', '+.local', 'localhost', '+.msftconnecttest.com', 'time.windows.com'],
    
    // 默认 nameserver 只给国外 DoH，绝不问运营商
    nameserver: ['https://1.1.1.1/dns-query', 'https://8.8.8.8/dns-query'],
    
    'proxy-server-nameserver': ['223.5.5.5', '119.29.29.29'],
    
    'nameserver-policy': {
      // 只有这些确定的国内大厂才允许问国内 DNS
      'geosite:cn,private,bilibili,bytedance,steam,apple,microsoft': ['223.5.5.5', '119.29.29.29'],
      // 其余的一律强制走国外加密解析
      'geosite:google,youtube,openai,telegram,netflix,geolocation-!cn': ['https://dns.google/dns-query']
    }
  };

  return config;
}
