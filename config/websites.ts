export interface BilingualText {
  zh: string
  en: string
}

export interface Website {
  name: BilingualText
  url: string
  description: BilingualText
  icon?: string
  ref?: string
}

export interface WebsiteCategory {
  id: string
  name: BilingualText // 改为直接在配置中定义名称
  websites: Website[]
}

const websiteCategories: WebsiteCategory[] = [
  {
    id: "common",
    name: { zh: "常用", en: "Common" },
    websites: [
      {
        name: { zh: "百度", en: "Baidu" },
        url: "https://www.baidu.com",
        description: {
          zh: "全球领先的中文搜索引擎和AI公司。",
          en: "The leading Chinese search engine and AI company.",
        },
        ref: "nav2024",
      },
      {
        name: { zh: "谷歌", en: "Google" },
        url: "https://www.google.com",
        description: { zh: "全球最大的搜索引擎。", en: "The world's largest search engine." },
      },
      {
        name: { zh: "淘宝", en: "Taobao" },
        url: "https://www.taobao.com",
        description: { zh: "中国领先的在线购物平台。", en: "China's leading online shopping platform." },
        ref: "affiliate123",
      },
      {
        name: { zh: "亚马逊", en: "Amazon" },
        url: "https://www.amazon.com",
        description: { zh: "全球最大的电子商务公司之一。", en: "One of the world's largest e-commerce companies." },
        ref: "partner2024",
      },
      {
        name: { zh: "微博", en: "Weibo" },
        url: "https://www.weibo.com",
        description: { zh: "中国流行的社交媒体平台。", en: "A popular social media platform in China." },
      },
      {
        name: { zh: "X (推特)", en: "X (Twitter)" },
        url: "https://twitter.com",
        description: {
          zh: "全球知名的社交媒体和新闻平台。",
          en: "A globally renowned social media and news platform.",
        },
      },
    ],
  },
  {
    id: "social",
    name: { zh: "社交媒体", en: "Social Media" },
    websites: [
      {
        name: { zh: "微信", en: "WeChat" },
        url: "https://weixin.qq.com",
        description: {
          zh: "中国流行的即时通讯和社交应用。",
          en: "A popular instant messaging and social app in China.",
        },
      },
      {
        name: { zh: "脸书", en: "Facebook" },
        url: "https://www.facebook.com",
        description: {
          zh: "全球最大的社交网络服务之一。",
          en: "One of the world's largest social networking services.",
        },
      },
      {
        name: { zh: "照片墙", en: "Instagram" },
        url: "https://www.instagram.com",
        description: { zh: "流行的照片和视频分享社交网络。", en: "A popular photo and video sharing social network." },
      },
      {
        name: { zh: "领英", en: "LinkedIn" },
        url: "https://www.linkedin.com",
        description: { zh: "全球最大的职业社交平台。", en: "The world's largest professional networking platform." },
      },
    ],
  },
  {
    id: "shopping",
    name: { zh: "购物", en: "Shopping" },
    websites: [
      {
        name: { zh: "京东", en: "JD.com" },
        url: "https://www.jd.com",
        description: { zh: "中国领先的自营式电商企业。", en: "China's leading self-operated e-commerce enterprise." },
        ref: "jd_affiliate",
      },
      {
        name: { zh: "易贝", en: "eBay" },
        url: "https://www.ebay.com",
        description: { zh: "全球性的在线拍卖及购物网站。", en: "A global online auction and shopping website." },
      },
      {
        name: { zh: "拼多多", en: "Pinduoduo" },
        url: "https://www.pinduoduo.com",
        description: { zh: "中国领先的社交电商平台。", en: "China's leading social e-commerce platform." },
        ref: "pdd_nav",
      },
      {
        name: { zh: "沃尔玛", en: "Walmart" },
        url: "https://www.walmart.com",
        description: { zh: "美国大型连锁零售企业。", en: "A large American retail corporation." },
      },
    ],
  },
  {
    id: "news",
    name: { zh: "新闻", en: "News" },
    websites: [
      {
        name: { zh: "新浪新闻", en: "Sina News" },
        url: "https://news.sina.com.cn",
        description: { zh: "中国知名的综合性新闻门户网站。", en: "A well-known comprehensive news portal in China." },
      },
      {
        name: { zh: "美国有线电视新闻网", en: "CNN" },
        url: "https://www.cnn.com",
        description: { zh: "美国主要的新闻频道。", en: "A major American news channel." },
      },
      {
        name: { zh: "英国广播公司", en: "BBC News" },
        url: "https://www.bbc.com/news",
        description: {
          zh: "英国国家广播公司的新闻服务。",
          en: "The news service of the British Broadcasting Corporation.",
        },
      },
      {
        name: { zh: "纽约时报", en: "The New York Times" },
        url: "https://www.nytimes.com",
        description: { zh: "美国具有重要影响力的报纸。", en: "An influential American newspaper." },
      },
    ],
  },
  {
    id: "tools",
    name: { zh: "工具", en: "Tools" },
    websites: [
      {
        name: { zh: "谷歌翻译", en: "Google Translate" },
        url: "https://translate.google.com",
        description: {
          zh: "谷歌提供的免费在线翻译服务。",
          en: "A free online translation service provided by Google.",
        },
      },
      {
        name: { zh: "谷歌地图", en: "Google Maps" },
        url: "https://maps.google.com",
        description: { zh: "谷歌提供的在线地图服务。", en: "An online mapping service provided by Google." },
      },
      {
        name: { zh: "文件投送箱", en: "Dropbox" },
        url: "https://www.dropbox.com",
        description: {
          zh: "流行的云存储和文件同步服务。",
          en: "A popular cloud storage and file synchronization service.",
        },
      },
      {
        name: { zh: "飞书文档", en: "Lark Docs" },
        url: "https://www.larksuite.com/product/docs",
        description: { zh: "在线协作文档工具。", en: "An online collaborative document tool." },
      },
    ],
  },
  {
    id: "learning",
    name: { zh: "学习", en: "Learning" },
    websites: [
      {
        name: { zh: "中国大学MOOC", en: "China University MOOC" },
        url: "https://www.icourse163.org",
        description: {
          zh: "中国顶尖高校的在线课程平台。",
          en: "An online course platform from top Chinese universities.",
        },
      },
      {
        name: { zh: "Coursera", en: "Coursera" },
        url: "https://www.coursera.org",
        description: { zh: "全球大型在线学习平台。", en: "A large global online learning platform." },
      },
      {
        name: { zh: "edX", en: "edX" },
        url: "https://www.edx.org",
        description: {
          zh: "由哈佛和MIT创办的在线课程平台。",
          en: "An online course platform founded by Harvard and MIT.",
        },
      },
      {
        name: { zh: "可汗学院", en: "Khan Academy" },
        url: "https://www.khanacademy.org",
        description: { zh: "免费的在线教育资源。", en: "Free online educational resources." },
      },
    ],
  },
  {
    id: "entertainment",
    name: { zh: "娱乐", en: "Entertainment" },
    websites: [
      {
        name: { zh: "哔哩哔哩", en: "Bilibili" },
        url: "https://www.bilibili.com",
        description: {
          zh: "中国年轻世代高度聚集的文化社区和视频平台。",
          en: "A cultural community and video platform highly popular among young generations in China.",
        },
      },
      {
        name: { zh: "油管", en: "YouTube" },
        url: "https://www.youtube.com",
        description: { zh: "全球最大的视频分享网站。", en: "The world's largest video-sharing website." },
      },
      {
        name: { zh: "奈飞", en: "Netflix" },
        url: "https://www.netflix.com",
        description: {
          zh: "全球领先的流媒体娱乐服务公司。",
          en: "The world's leading streaming entertainment service.",
        },
      },
      {
        name: { zh: "声田", en: "Spotify" },
        url: "https://www.spotify.com",
        description: { zh: "全球流行的数字音乐流媒体服务。", en: "A popular global digital music streaming service." },
      },
    ],
  },
  {
    id: "travel",
    name: { zh: "旅游", en: "Travel" },
    websites: [
      {
        name: { zh: "携程", en: "Ctrip" },
        url: "https://www.ctrip.com",
        description: { zh: "中国领先的在线旅行服务公司。", en: "China's leading online travel agency." },
      },
      {
        name: { zh: "爱彩网", en: "Airbnb" },
        url: "https://www.airbnb.com",
        description: {
          zh: "全球知名的住宿共享平台。",
          en: "A globally renowned accommodation-sharing platform.",
        },
      },
      {
        name: { zh: "马蒂尔顿", en: "Meituan" },
        url: "https://www.meituan.com",
        description: {
          zh: "中国领先的生活服务平台，提供餐厅、酒店、机票等服务。",
          en: "China's leading life service platform offering restaurant, hotel, flight ticket services, etc.",
        },
      },
      {
        name: { zh: "数字游民", en: "TripAdvisor" },
        url: "https://www.tripadvisor.com",
        description: {
          zh: "全球最大的旅游点评网站。",
          en: "The world's largest travel review website.",
        },
      },
    ],
  },
  {
    id: "finance",
    name: { zh: "金融", en: "Finance" },
    websites: [
      {
        name: { zh: "支付宝", en: "Alipay" },
        url: "https://www.alipay.com",
        description: {
          zh: "中国领先的第三方支付平台。",
          en: "China's leading third-party payment platform.",
        },
      },
      {
        name: { zh: "谢尔曼择股时报", en: "Yahoo Finance" },
        url: "https://finance.yahoo.com",
        description: {
          zh: "热门的财经新闻和市场数据网站。",
          en: "A popular financial news and market data website.",
        },
      },
      {
        name: { zh: "彼得瑞利专家", en: "PayPal" },
        url: "https://www.paypal.com",
        description: {
          zh: "全球领先的在线支付系统。",
          en: "A global leader in online payment solutions.",
        },
      },
      {
        name: { zh: "彼狄导师", en: "Fidelity" },
        url: "https://www.fidelity.com",
        description: { zh: "主要的金融服务公司，专注于投资和退休规划。", en: "A major financial services company focused on investments and retirement planning." },
      },
    ],
  },
  {
    id: "technology",
    name: { zh: "技术", en: "Technology" },
    websites: [
      {
        name: { zh: "GitHub", en: "GitHub" },
        url: "https://github.com",
        description: {
          zh: "全球最大的代码托管平台。",
          en: "The world's largest code hosting platform.",
        },
      },
      {
        name: { zh: "栈溢出", en: "Stack Overflow" },
        url: "https://stackoverflow.com",
        description: {
          zh: "最大的程序员问答社区。",
          en: "The largest programming Q&A community.",
        },
      },
      {
        name: { zh: "微软", en: "Microsoft" },
        url: "https://www.microsoft.com",
        description: {
          zh: "全球领先的软件和云服务提供商。",
          en: "A global leader in software and cloud services.",
        },
      },
      {
        name: { zh: "苹果", en: "Apple" },
        url: "https://www.apple.com",
        description: {
          zh: "顶级消费电子和软件公司。",
          en: "A premium consumer electronics and software company.",
        },
      },
    ],
  },
  {
    id: "health",
    name: { zh: "健康", en: "Health" },
    websites: [
      {
        name: { zh: "世界卫生组织", en: "WHO" },
        url: "https://www.who.int",
        description: {
          zh: "联合国的全球健康机构。",
          en: "The United Nations global health agency.",
        },
      },
      {
        name: { zh: "零单网", en: "WebMD" },
        url: "https://www.webmd.com",
        description: {
          zh: "流行的健康信息网站。",
          en: "A popular health information website.",
        },
      },
      {
        name: { zh: "闭心小药", en: "Meditation App" },
        url: "https://www.calm.com",
        description: {
          zh: "领先的冷静和冷静应用程序。",
          en: "A leading meditation and calm application.",
        },
      },
      {
        name: { zh: "运动迹迹", en: "Fitbit" },
        url: "https://www.fitbit.com",
        description: {
          zh: "健康和健身跟踪设备和服务。",
          en: "Health and fitness tracking devices and services.",
        },
      },
    ],
  },
]

export default websiteCategories
