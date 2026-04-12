//made wuLaxy with GPT
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
  const baseProxies = ['自选节点', 'REJECT']; // 移除基础列表中的直连，因为下面会手动补位
  const commonProxies = [...baseProxies, ...rateGroups, ...countryGroups, ...allNodes];

  config['proxy-groups'] = [
    { 
      name: '自选节点', 
      type: 'select', 
      proxies: ['直连', 'REJECT', ...rateGroups, ...countryGroups, ...allNodes],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png'
    },
    { 
      name: '国内网站', 
      type: 'select', 
      proxies: ['直连', '自选节点', 'REJECT', ...rateGroups, ...countryGroups, ...allNodes],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/StreamingCN.png'
    },
    { 
      name: '国外AI', 
      type: 'select', 
      proxies: ['直连', ...commonProxies],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png'
    },
    { 
      name: 'YouTube', 
      type: 'select', 
      proxies: ['直连', ...commonProxies],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png'
    },
    { 
      name: '流媒体', 
      type: 'select', 
      proxies: ['直连', ...commonProxies],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Streaming.png'
    },
    { 
      name: 'Telegram', 
      type: 'select', 
      proxies: ['直连', ...commonProxies],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Telegram.png'
    },
    { 
      name: 'Emby', 
      type: 'select', 
      proxies: ['直连', ...commonProxies],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Emby.png'
    },
    { 
      name: 'Apple', 
      type: 'select', 
      proxies: ['直连', ...commonProxies],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Apple.png'
    },
    { 
      name: 'GitHub', 
      type: 'select', 
      proxies: ['直连', ...commonProxies],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/GitHub.png'
    },
    { 
      name: 'Steam/Epic', 
      type: 'select', 
      proxies: ['直连', ...commonProxies],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Steam.png'
    },
    { 
      name: '广告追踪', 
      type: 'select', 
      proxies: ['REJECT', '直连', ...commonProxies],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Advertising.png'
    },
    {
      name: '低倍节点',
      type: 'url-test',
      proxies: lowRateNodes.length > 0 ? lowRateNodes : ['直连'],
      url: 'http://www.gstatic.com/generate_204',
      interval: 300,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Speedtest.png'
    },
    {
      name: '中倍节点',
      type: 'url-test',
      proxies: medRateNodes.length > 0 ? medRateNodes : ['直连'],
      url: 'http://www.gstatic.com/generate_204',
      interval: 300,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Speedtest.png'
    },
    {
      name: '高倍节点',
      type: 'url-test',
      proxies: highRateNodes.length > 0 ? highRateNodes : ['直连'],
      url: 'http://www.gstatic.com/generate_204',
      interval: 300,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Speedtest.png'
    },
    ...countryConfigs.map(c => ({
      name: c.name,
      type: 'url-test',
      proxies: getNodesByKeywords(c.keywords).length > 0 ? getNodesByKeywords(c.keywords) : ['直连'],
      url: 'http://www.gstatic.com/generate_204',
      interval: 300,
      icon: c.icon
    })),
  ];

  config['rules'] = [
    'IP-CIDR,192.168.0.0/16,DIRECT',
    'IP-CIDR,10.0.0.0/8,DIRECT',
    'IP-CIDR,172.16.0.0/12,DIRECT',
    'IP-CIDR,127.0.0.0/8,DIRECT',
    'DOMAIN-KEYWORD,emby,Emby',
    'DOMAIN-KEYWORD,plex,Emby',
    'DOMAIN-KEYWORD,jellyfin,Emby',
    'DOMAIN-SUFFIX,emby.media,Emby',
    'DOMAIN-SUFFIX,emby.tv,Emby',
    'DOMAIN-SUFFIX,plex.tv,Emby',
    'DOMAIN-SUFFIX,jmsooo.com,Emby',
    'DOMAIN-SUFFIX,misakaf.org,Emby',
    'GEOSITE,category-ads-all,广告追踪',
    'DOMAIN-KEYWORD,adservice,广告追踪',
    'DOMAIN-SUFFIX,doubleclick.net,广告追踪',
    'DOMAIN-SUFFIX,googlesyndication.com,广告追踪',
    'DOMAIN-SUFFIX,googleadservices.com,广告追踪',
    'DOMAIN-SUFFIX,mmstat.com,广告追踪',
    'DOMAIN-SUFFIX,appsflyer.com,广告追踪',
    'DOMAIN-SUFFIX,vungle.com,广告追踪',
    'DOMAIN-SUFFIX,adj.st,广告追踪',
    'DOMAIN-SUFFIX,adjust.com,广告追踪',
    'GEOSITE,openai,国外AI',
    'GEOSITE,github,GitHub',
    'GEOSITE,steam,Steam/Epic',
    'GEOSITE,epicgames,Steam/Epic',
    'GEOSITE,ea,Steam/Epic',
    'GEOSITE,anthropic,国外AI',
    'GEOSITE,perplexity,国外AI',
    'GEOSITE,google,国外AI',
    'GEOSITE,youtube,YouTube',
    'GEOSITE,telegram,Telegram',
    'GEOIP,telegram,Telegram',
    'GEOSITE,netflix,流媒体',
    'GEOSITE,disney,流媒体',
    'GEOSITE,spotify,流媒体',
    'GEOSITE,hbo,流媒体',
    'GEOSITE,primevideo,流媒体',
    'DOMAIN-SUFFIX,netflix.com,流媒体',
    'DOMAIN-SUFFIX,netflix.net,流媒体',
    'DOMAIN-SUFFIX,nflximg.net,流媒体',
    'DOMAIN-SUFFIX,nflxvideo.net,流媒体',
    'DOMAIN-SUFFIX,nflxso.net,流媒体',
    'DOMAIN-SUFFIX,nflxext.com,流媒体',
    'DOMAIN-SUFFIX,disneyplus.com,流媒体',
    'DOMAIN-SUFFIX,disney-portal.com,流媒体',
    'DOMAIN-SUFFIX,disney.com,流媒体',
    'DOMAIN-SUFFIX,dssott.com,流媒体',
    'DOMAIN-SUFFIX,spotify.com,流媒体',
    'DOMAIN-SUFFIX,scdn.co,流媒体',
    'GEOSITE,apple,Apple',
    'DOMAIN-SUFFIX,apple.com,Apple',
    'DOMAIN-SUFFIX,icloud.com,Apple',
    'DOMAIN-SUFFIX,mzstatic.com,Apple',
    'DOMAIN-SUFFIX,itunes.apple.com,Apple',
    'IP-ASN,15169,国外AI',
    'IP-ASN,16509,国外AI',
    'IP-ASN,14061,国外AI',
    'IP-ASN,46489,国外AI',
    'GEOSITE,cn,国内网站',
    'GEOIP,CN,国内网站',
    'MATCH,自选节点',
  ];

  const chinaDNS = ['223.5.5.5', '119.29.29.29'];
  const foreignDNS = [
    'https://1.1.1.1/dns-query',
    'https://8.8.8.8/dns-query',
    'https://dns.google/dns-query'
  ];

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
    'fake-ip-filter': [
      '+.lan',
      '+.local',
      'time.windows.com',
      'ntp.*'
    ],
    nameserver: [...chinaDNS],
    'proxy-server-nameserver': [...foreignDNS],
    'nameserver-policy': {
      'geosite:cn': chinaDNS,
      'geosite:youtube': foreignDNS,
      'geosite:openai': foreignDNS,
      'geosite:github': foreignDNS,
      'geosite:telegram': foreignDNS,
      'geosite:netflix,disney,spotify': foreignDNS,
      'geosite:steam,epicgames,ea': foreignDNS,
      'geosite:private': 'system'
    },
  };

  return config;
}
