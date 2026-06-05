const enable = true;

function main(config) {
  if (!enable) return config;

  const allNodes = config?.proxies?.map(p => p.name) || [];

  if (!allNodes.includes('直连')) {
    config.proxies = config.proxies || [];
    config.proxies.push({ name: '直连', type: 'direct', udp: true });
  }

  const baseProxies = ['直连', 'REJECT', ...allNodes];
  const commonProxies = ['自选节点', ...baseProxies];

  config['proxy-groups'] = [
    { name: '自选节点', type: 'select', proxies: baseProxies, icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png' },
    { name: '流媒体', type: 'select', proxies: commonProxies, icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png' },
    { name: 'Telegram', type: 'select', proxies: commonProxies, icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Telegram.png' },
    { name: 'Emby', type: 'select', proxies: commonProxies, icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Emby.png' },
    { name: '广告追踪', type: 'select', proxies: commonProxies, icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Advertising.png' }
  ];

  config['rules'] = [
    'IP-CIDR,192.168.0.0/16,DIRECT',
    'IP-CIDR,10.0.0.0/8,DIRECT',
    'IP-CIDR,172.16.0.0/12,DIRECT',
    'IP-CIDR,127.0.0.0/8,DIRECT',
    'GEOSITE,category-ads-all,广告追踪',
    'DOMAIN-SUFFIX,cloudflare.com,自选节点',
    'DOMAIN-SUFFIX,challenges.cloudflare.com,自选节点',
    'DOMAIN-KEYWORD,emby,Emby',
    'DOMAIN-KEYWORD,plex,Emby',
    'GEOSITE,youtube,流媒体',
    'GEOSITE,netflix,流媒体',
    'GEOSITE,disney,流媒体',
    'GEOSITE,spotify,流媒体',
    'DOMAIN-SUFFIX,twitch.tv,流媒体',          
    'DOMAIN-SUFFIX,primevideo.com,流媒体',     
    'GEOSITE,telegram,Telegram',
    'GEOSITE,bilibili,DIRECT',
    'GEOSITE,bytedance,DIRECT', 
    'GEOSITE,apple,DIRECT',
    'GEOSITE,cn,DIRECT',
    'GEOIP,CN,DIRECT',                
    'GEOSITE,geolocation-!cn,自选节点', 
    'MATCH,自选节点',                    
  ];

  config['dns'] = {
    enable: true,
    listen: ':1053',
    ipv6: false,
    'prefer-h3': false, 
    'respect-rules': true,
    'enhanced-mode': 'fake-ip',
    'fake-ip-range': '198.18.0.1/16',
    'fake-ip-filter': ['+.lan', '+.local', 'localhost', '+.msftconnecttest.com', 'time.windows.com', '*.challenges.cloudflare.com', '*.cloudflare.com', '+.bilibili.com', '+.apple.com', '+.toutiao.com', '+.douyin.com'],
    nameserver: ['https://1.1.1.1/dns-query', 'https://8.8.8.8/dns-query'],
    'proxy-server-nameserver': ['223.5.5.5', '119.29.29.29'],
    'nameserver-policy': {
      'geosite:cn,private,bilibili,bytedance,apple': ['223.5.5.5', '119.29.29.29'],
      'geosite:google,youtube,telegram,netflix,geolocation-!cn': ['https://dns.google/dns-query']
    }
  };

  return config;
}
