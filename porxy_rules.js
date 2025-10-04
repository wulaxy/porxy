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
      name: '自选节点', 
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
      proxies: ['自选节点', ...allNodes],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png'
    },
    { 
      name: 'YouTube', 
      type: 'select', 
      proxies: ['自选节点', ...allNodes],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png'
    },
    { 
      name: 'Telegram', 
      type: 'select', 
      proxies: ['自选节点', ...allNodes],
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
    // 广告追踪（REJECT）
    'GEOSITE,category-ads-all,广告追踪',
    'DOMAIN-KEYWORD,admarvel,广告追踪',
    'DOMAIN-KEYWORD,admaster,广告追踪',
    'DOMAIN-KEYWORD,adsage,广告追踪',
    'DOMAIN-KEYWORD,adsmogo,广告追踪',
    'DOMAIN-KEYWORD,adsrvmedia,广告追踪',
    'DOMAIN-KEYWORD,adwords,广告追踪',
    'DOMAIN-KEYWORD,adservice,广告追踪',
    'DOMAIN-SUFFIX,appsflyer.com,广告追踪',
    'DOMAIN-KEYWORD,domob,广告追踪',
    'DOMAIN-SUFFIX,doubleclick.net,广告追踪',
    'DOMAIN-KEYWORD,duomeng,广告追踪',
    'DOMAIN-KEYWORD,dwtrack,广告追踪',
    'DOMAIN-KEYWORD,guanggao,广告追踪',
    'DOMAIN-KEYWORD,lianmeng,广告追踪',
    'DOMAIN-SUFFIX,mmstat.com,广告追踪',
    'DOMAIN-KEYWORD,mopub,广告追踪',
    'DOMAIN-KEYWORD,omgmta,广告追踪',
    'DOMAIN-KEYWORD,openx,广告追踪',
    'DOMAIN-KEYWORD,partnerad,广告追踪',
    'DOMAIN-KEYWORD,pingfore,广告追踪',
    'DOMAIN-KEYWORD,supersonicads,广告追踪',
    'DOMAIN-KEYWORD,uedas,广告追踪',
    'DOMAIN-KEYWORD,umeng,广告追踪',
    'DOMAIN-KEYWORD,usage,广告追踪',
    'DOMAIN-SUFFIX,vungle.com,广告追踪',

    // 国外AI
    'GEOSITE,openai,国外AI',
    'GEOSITE,anthropic,国外AI',
    'GEOSITE,perplexity,国外AI',

    // YouTube
    'GEOSITE,youtube,YouTube',

    // Telegram
    'GEOSITE,telegram,Telegram',
    'GEOIP,telegram,Telegram',

    // 国内网站（DIRECT）
    'GEOSITE,cn,国内网站',
    'GEOIP,CN,国内网站',
    'DOMAIN,safebrowsing.urlsec.qq.com,国内网站',
    'DOMAIN,safebrowsing.googleapis.com,国内网站',
    'DOMAIN-SUFFIX,mzstatic.com,国内网站',
    'DOMAIN-SUFFIX,itunes.apple.com,国内网站',
    'DOMAIN-SUFFIX,icloud.com,国内网站',
    'DOMAIN-SUFFIX,icloud-content.com,国内网站',
    'DOMAIN-SUFFIX,me.com,国内网站',
    'DOMAIN-SUFFIX,aaplimg.com,国内网站',
    'DOMAIN-SUFFIX,apple.com,国内网站',
    'DOMAIN-SUFFIX,126.com,国内网站',
    'DOMAIN-SUFFIX,163.com,国内网站',
    'DOMAIN-SUFFIX,taobao.com,国内网站',
    'DOMAIN-SUFFIX,qq.com,国内网站',
    'DOMAIN-SUFFIX,bilibili.com,国内网站',
    'DOMAIN-SUFFIX,zhihu.com,国内网站',
    'DOMAIN-SUFFIX,csdn.net,国内网站',
    'DOMAIN-SUFFIX,mi.com,国内网站',
    'DOMAIN-SUFFIX,weibo.com,国内网站',
    'DOMAIN-SUFFIX,douyin.com,国内网站',
    'DOMAIN-SUFFIX,amemv.com,国内网站',
    'DOMAIN-SUFFIX,bytecdn.cn,国内网站',
    'DOMAIN-SUFFIX,byteimg.com,国内网站',
    'DOMAIN-SUFFIX,bytedance.com,国内网站',
    'DOMAIN-SUFFIX,byted-static.com,国内网站',
    'DOMAIN-SUFFIX,bytedns.net,国内网站',
    'DOMAIN-SUFFIX,bytednsdoc.com,国内网站',
    'DOMAIN-SUFFIX,bytedance.net,国内网站',
    'DOMAIN-SUFFIX,byted-api.com,国内网站',
    'DOMAIN-SUFFIX,iesdouyin.com,国内网站',
    'DOMAIN-SUFFIX,snssdk.com,国内网站',
    'DOMAIN-SUFFIX,pstatp.com,国内网站',
    'DOMAIN-SUFFIX,toutiao.com,国内网站',
    'DOMAIN-SUFFIX,toutiaoimg.com,国内网站',
    'DOMAIN-SUFFIX,toutiaostatic.com,国内网站',
    'DOMAIN-KEYWORD,douyin,国内网站',
    'DOMAIN-KEYWORD,toutiao,国内网站',
    'DOMAIN-SUFFIX,kuaishou.com,国内网站',
    'DOMAIN-SUFFIX,ksapisrv.com,国内网站',
    'DOMAIN-SUFFIX,yximgs.com,国内网站',
    'DOMAIN-SUFFIX,kwai.com,国内网站',
    'DOMAIN-SUFFIX,kwimgs.com,国内网站',
    'DOMAIN-SUFFIX,kwaicdn.com,国内网站',
    'DOMAIN-SUFFIX,kwaicdn.net,国内网站',
    'DOMAIN-KEYWORD,kuaishou,国内网站',
    'DOMAIN-KEYWORD,kwai,国内网站',


    // 自选节点
    'DOMAIN-SUFFIX,services.googleapis.cn,自选节点',
    'DOMAIN-SUFFIX,xn--ngstr-lra8j.com,自选节点',
    'DOMAIN,developer.apple.com,自选节点',
    'DOMAIN-SUFFIX,digicert.com,自选节点',
    'DOMAIN,ocsp.apple.com,自选节点',
    'DOMAIN,ocsp.comodoca.com,自选节点',
    'DOMAIN,ocsp.usertrust.com,自选节点',
    'DOMAIN,ocsp.sectigo.com,自选节点',
    'DOMAIN,ocsp.verisign.net,自选节点',
    'DOMAIN-SUFFIX,apple-dns.net,自选节点',
    'DOMAIN,testflight.apple.com,自选节点',
    'DOMAIN,sandbox.itunes.apple.com,自选节点',
    'DOMAIN,itunes.apple.com,自选节点',
    'DOMAIN-SUFFIX,apps.apple.com,自选节点',
    'DOMAIN-SUFFIX,blobstore.apple.com,自选节点',
    'DOMAIN,cvws.icloud-content.com,自选节点',
    'DOMAIN-KEYWORD,amazon,自选节点',
    'DOMAIN-KEYWORD,google,自选节点',
    'DOMAIN-KEYWORD,gmail,自选节点',
    'DOMAIN-KEYWORD,facebook,自选节点',
    'DOMAIN-SUFFIX,fb.me,自选节点',
    'DOMAIN-SUFFIX,fbcdn.net,自选节点',
    'DOMAIN-KEYWORD,twitter,自选节点',
    'DOMAIN-KEYWORD,instagram,自选节点',
    'DOMAIN-KEYWORD,dropbox,自选节点',
    'DOMAIN-SUFFIX,twimg.com,自选节点',
    'DOMAIN-KEYWORD,blogspot,自选节点',
    'DOMAIN-KEYWORD,whatsapp,自选节点',

    // 兜底
    'MATCH,自选节点',
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
