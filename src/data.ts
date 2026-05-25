import { Service, Project, TeamMember, Testimonial, TimelineEvent, FAQItem, BlogPost } from './types';

export const SERVICES: Service[] = [
  {
    id: 'web',
    title: 'Thiết Kế Website & Web App',
    description: 'Xây dựng website tối ưu trải nghiệm người dùng, giao diện đẳng cấp, hiệu năng vượt trội và chuẩn thiết bị di động.',
    iconName: 'Laptop',
    features: [
      'Giao diện UI/UX thiết kế độc quyền',
      'Công nghệ React / Next.js tiên tiến',
      'Tối ưu hóa tốc độ tải trang Core Web Vitals',
      'Hệ thống quản trị nội dung CMS tiện dụng',
      'Tương thích hoàn hảo mọi kích thước màn hình'
    ],
    pricing: {
      basic: '15,000,000đ',
      premium: '28,000,000đ',
      enterprise: 'Từ 50,000,000đ'
    },
    technologies: ['Next.js', 'React', 'TailwindCSS', 'Node.js', 'MongoDB']
  },
  {
    id: 'seo',
    title: 'Tối Ưu SEO & Digital Marketing',
    description: 'Đưa website của bạn lên top Google bền vững, thu hút lượng truy cập tự nhiên chất lượng cao và chuyển đổi thành doanh thu.',
    iconName: 'Search',
    features: [
      'Nghiên cứu từ khóa chuyên sâu theo ngành',
      'Tối ưu On-page & cấu trúc dữ liệu schema',
      'Chiến lược xây dựng thực thể Entity On-page',
      'Content Marketing chuẩn SEO chuyên nghiệp',
      'Báo cáo hiệu suất định kỳ bằng Google Analytics'
    ],
    pricing: {
      basic: '8,000,000đ/tháng',
      premium: '15,000,000đ/tháng',
      enterprise: 'Giải pháp Custom'
    },
    technologies: ['Google Analytics', 'Ahrefs', 'Screaming Frog', 'Semrush', 'Schema.org']
  },
  {
    id: 'branding',
    title: 'Nhận Diện Thương Hiệu Kỹ Thuật Số',
    description: 'Kiến tạo bản sắc thương hiệu độc bản trên môi trường số, kết nối cảm xúc mạnh mẽ với khách hàng tiềm năng.',
    iconName: 'Palette',
    features: [
      'Thiết kế Logo & Slogan chuyên nghiệp',
      'Bộ nhận diện văn phòng & Digital Assets',
      'Cẩm nang hướng dẫn sử dụng thương hiệu',
      'Template truyền thông mạng xã hội đồng bộ',
      'Tư vấn truyền thông hình ảnh nhất quán'
    ],
    pricing: {
      basic: '5,000,000đ',
      premium: '12,000,000đ',
      enterprise: 'Giải pháp Toàn diện'
    },
    technologies: ['Figma', 'Adobe Illustrator', 'Photoshop', 'Indesign']
  },
  {
    id: 'maintenance',
    title: 'Vận Hành & Chăm Sóc Định Kỳ',
    description: 'Đảm bảo website của bạn luôn hoạt động an toàn, trơn tru, bảo mật cao và được cập nhật nội dung liên tục.',
    iconName: 'Shield',
    features: [
      'Sao lưu dữ liệu tự động hàng tuần',
      'Bảo mật tường lửa & quét mã độc liên tục',
      'Cập nhật nội dung & hình ảnh theo yêu cầu',
      'Tối ưu hóa cơ sở dữ liệu định kỳ',
      'Hỗ trợ kỹ thuật 24/7 tức thì'
    ],
    pricing: {
      basic: '1,500,000đ/tháng',
      premium: '3,500,000đ/tháng',
      enterprise: 'Tùy chỉnh linh hoạt'
    },
    technologies: ['Cloudflare', 'AWS Backup', 'Docker', 'Wordpress Maintenance']
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'proj1',
    title: 'UPhostix Agency Portal',
    category: 'Web',
    description: 'Nền tảng trang chủ thế hệ mới của UPhostix tích hợp quản lý dự án và thanh toán tự lưu.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARK8vlAGS-Cd6lK_438Zq0CG9KyK7uZ8OK2aDdUErEHNdeeyu4Cm_4qbAXdqUhobYaHbf4-rKhNNAjzzBNsDV9-YxXqZ6Pfkkk6hqlsIqxsVReucZRHmpNoOJXTCLqf8cCTkgK8t-YpXWmQDrlidtrBXy45pchIyq275DlmUFDZzXMwosdpQYUwi-cyJvsCZrPvxU6pT5t5CPxCkkNLD1__gyd1sqnjVot1ccgmRqTyW9iPGXh3Dg9eYFrHZUfyOsGc3r14wIIW-PJ',
    tags: ['Next.js', 'TailwindCSS', 'Motion'],
    link: '#',
    stats: { label: 'Tốc độ', value: '0.4s' },
    client: 'UPhostix Global Inc.',
    duration: '3 tháng',
    challenge: 'Tích hợp đồng nhất cổng thông tin doanh nghiệp, hệ quản trị dự án nội bộ và hệ thống theo dõi tiến độ của khách hàng với yêu cầu tốc độ tải trang cực đỉnh và chỉ số Core Web Vitals của Google đạt điểm hoàn hảo.',
    solution: 'Ứng dụng giải pháp kiến trúc React / Next.js thế hệ mới sử dụng cơ chế Static Site Generation, tối ưu CSS với Tailwind CSS v4, áp dụng Motion React cho chuyển động mượt mà và phân phối bảo bọc an toàn đằng sau Cloudflare CDN.',
    results: [
      'Chỉ số tối ưu Google Lighthouse đạt mức điểm tối đa 100/100 tuyệt đối.',
      'Tốc độ tải trang phản hồi tức thì dưới 0.4 giây giúp giảm thiểu tỷ lệ rớt trang.',
      'Hệ thống quản lý khách hàng thông minh tự động hóa được hơn 90% quy trình trao đổi.'
    ]
  },
  {
    id: 'proj2',
    title: 'E-commerce Luxury Fashion',
    category: 'Web',
    description: 'Trang thương mại điện tử chuyên nghiệp tối ưu hóa SEO vượt bậc cho hãng thời trang cao cấp.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAaihbUO18aKWmZhPAiF5vuadLNe9YsOwAUe_mH6zYzypGrL4Ioqt9V_oMMKl9cB9mQFHjJgRZnGIxwPZgPNBEveKRpbgQOQ6sMQ13ZZ38Te9WuUl6cUNhcM_493OMWidRQKO7G6_2N8hE7Nfcm9WuHhAd7YfldikABV7mdT4Cc6wN6hS2_GMpAT35qOoYEPm3189zs1OQPaZf_OTh8Ma7FYKDcO8oNg5MJ8D9BLahmiSozXaZRubLMYocyZxo7clrBrzb6Qbame09D',
    tags: ['React', 'NestJS', 'GraphQL'],
    link: '#',
    stats: { label: 'Doanh số tăng', value: '+45%' },
    client: 'D\'Lusso Atelier Group',
    duration: '2.5 tháng',
    challenge: 'Yêu cầu hiển thị kho hình ảnh chất lượng siêu cao và các video 4K sắc nét phục vụ cho bộ sưu tập thời trang xa xỉ, đồng thời bảo đảm tốc độ truy cập thần tốc và tỷ lệ chuyển đổi giỏ hàng mượt mà.',
    solution: 'Áp dụng công nghệ nén ảnh WebP/AVIF động thông minh, kết hợp kỹ thuật React Lazy Loading, đồng bộ hóa dữ liệu thông qua GraphQL APIs và lưu trữ caching mạnh mẽ trên hệ thống CDN của Amazon Web Services.',
    results: [
      'Doanh số bán hàng trực tuyến gia tăng vọt hơn 45% chỉ sau 2 tháng đầu chạy thử nghiệm.',
      'Tỷ lệ thoát trang giảm đột phá từ 52% xuống chỉ còn dưới 15%.',
      'Hơn 60 từ khóa thương hiệu đứng đầu top tìm kiếm của khách hàng cao cấp.'
    ]
  },
  {
    id: 'proj3',
    title: 'Chiến Dịch SEO Bứt Phá Doanh Số',
    category: 'SEO',
    description: 'Đưa hơn 120 từ khóa bán hàng cạnh tranh cao lên Top 3 công cụ tìm kiếm trong vòng 6 tháng.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfoeCM_A_yz1UevjjFMD7En2WeYHFcOhyyY-gDse07yYbUrxdskK3QjfF3QYJ5mE_kV0vUZqWys6lLtif7mcGF54V6ErqSXi9Z0CEp47jDQtC0egKhiPiEb9nVN9cJ2y87p8XrTPxME05SRAF6xAONexG1NkPcQIshyVVNoIWg1Nlo4VUmCjSzcDIfpeC55Wq8LvrYHdmNzIHBLgYr5AJs2QfErYnV_ZXaOkwV2fO0T2MtY6dqtVqsijubX7FCELh6NUApPv4YoBDL',
    tags: ['SEO', 'Content Strategy', 'Audit'],
    link: '#',
    stats: { label: 'Organic Traffic', value: '+320%' },
    client: 'Gia Dụng Modern House Việt Nam',
    duration: '6 tháng',
    challenge: 'Đối mặt với lĩnh vực kinh doanh nội thất gia dụng có độ cạnh tranh từ khóa cực độ khốc liệt, ngân sách quảng cáo Google Ads ngày càng tăng mà không thu lại kết quả doanh thu ổn định lâu dài.',
    solution: 'Tiến hành rà soát sửa lỗi kỹ thuật SEO (Technical Audit) toàn diện, chuyển đổi cấu trúc nội dung sang hướng Semantic Content sâu sắc về mặt thông tin, và xây dựng mô hình thực thể Entity thương hiệu nhất quán.',
    results: [
      'Lượng người dùng truy cập tự nhiên (Organic Traffic) bứt phá tăng trưởng vượt bậc 320%.',
      'Đưa thành công hơn 120 từ khóa bán hàng chiến lược nằm vững chắc trong Top 3 Google.',
      'Cắt giảm thành công 60% ngân sách chi trả cho quảng cáo trực tuyến truyền thống.'
    ]
  },
  {
    id: 'proj4',
    title: 'Nhận Diện Số V-Finance Corp',
    category: 'Branding',
    description: 'Xây dựng ngôn ngữ thiết kế đồng bộ cho tập đoàn tài chính công nghệ năng động.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB73Yig2XQbc-Lg66jW7INBGzCHvdQo5IPTFjV0n7J83nn6yJGEUCZ2QfhY2vTH43Y2zwA5HKQc7G4WTZ6OZEVtSFYed-igJpJvvX8ZwM3oZl-BoEkepr0w-TZ2gNkHkFZNWXlT4nD2wfjJmfsogmKM_VhupRFON1JnC_kCv0fTc_UJfoAcnBgfH2IiqfVuFnwCvjz5gMHXM7QJavpfhxdAagtIEGm3XapS3apaJ76zo3NHpfyGvohcdZk0E3LGHjfzUzqeerGhoflv',
    tags: ['Brand Identity', 'UI/UX Guidelines'],
    link: '#',
    stats: { label: 'Tin cậy', value: '99%' },
    client: 'V-Finance Fintech Group',
    duration: '1.5 tháng',
    challenge: 'Thiết kế một bộ ngôn ngữ hình ảnh số hoàn toàn mới mẻ, hiện đại truyền tải được tinh thần đổi mới sáng tạo tài chính nhưng vẫn gìn giữ vẹn nguyên tính minh bạch và uy tín vững chắc của thương hiệu.',
    solution: 'Nghiên cứu sâu sắc hành vi tâm lý tài chính của tập khách hàng thế hệ mới, kiến tạo Design System đồng bộ trên Figma bao gồm hệ thống logo, bảng màu chuẩn hóa, các kiểu typography và thiết kế mẫu truyền thông xã hội.',
    results: [
      'Chỉ số tin cậy đo lường từ phía khách hàng đạt 99% trong các cuộc khảo sát ý kiến.',
      'Tính nhất quán thương hiệu số đạt độ hoàn thiện đồng bộ 100% trên tất cả các kênh.',
      'Hỗ trợ đắc lực giúp rút gọn quy trình thiết kế và chuyển đổi số nội bộ lên tới 2 tuần.'
    ]
  }
];

export const TEAM: TeamMember[] = [
  {
    id: 'member1',
    name: 'Trần Minh Anh',
    role: 'CEO & Founder',
    bio: 'Hơn 8 năm quản lý và dẫn dắt các chiến lược sản phẩm số, biến các ý tưởng phức tạp thành giải pháp thực tế tối ưu thúc đẩy doanh nghiệp.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKRCEUr1kxfPWBX44cc9DY72QmGOpqTv1oKQCUp5opUN0zXexKHSRTGLjsItyQfDhT28xAsqZRfNM9GwXpgLDFDB5Wc1q4mabrdnVVBb9hanvJIn0F98gITBAvq1h5cI3FtpRqJXMDZoaNafjnD9r3SVv450X39alKJ8orRl6jcwwIKuaF3A09s4c2awia-pSkfqGUEgUI7-ucT06aZmGQtycsLeXmKIt51ihFmBn12x7ml2nP9wz7y1YGplWDtNj5h1dPeQ2j2MAu',
    socials: {
      facebook: '#',
      linkedin: '#'
    }
  },
  {
    id: 'member2',
    name: 'Lê Phương Thảo',
    role: 'Creative Director',
    bio: 'Nhà thiết kế am hiểu tâm lý người dùng sâu sắc, kiến tạo các giao diện trực quan thẩm mỹ kết hợp cân bằng giữa nghệ thuật và công nghệ.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6st9GcZbD36SKwpOI3KSMcuWU3NEDXE_pLdKopHYuJjOduzoeVHDqzT4uMWpEmNaEfVftfoTSyo6b9J0xJ3sFonutZ4kD1S5hzY5wSY3MLAuxe01KTWybGBhariOmTxcDCR1UKNba5yJjIgRjt7qkQdHYi2uveNUgzCxyKqNkab_xoolE3auCdWUsUm4d-9DQPvjyhry8YqI-JXDnb2IeQOqlOnVI-gfS6kqE_610buvh6IPGZP_TYJkRM0CyiTSrMD-syFlB-YjN',
    socials: {
      linkedin: '#',
      github: '#'
    }
  },
  {
    id: 'member3',
    name: 'Nguyễn Đức Việt',
    role: 'Technical Lead',
    bio: 'Chuyên gia lập trình Full-stack với niềm đam mê vô tận cho tối ưu hóa hiệu năng, bảo mật hạ tầng và phát triển các giải pháp Web có cấu trúc siêu mượt.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCyUn4WbQRkkX346g89mt1exTx5Ynp0Htb7V18sftLGmoduMsVSoFUf1qmqnRLVX0a4H7pwCtdp9CTu3vyvxhTYcMFj7ajrOA9WdY8Ab_dp2nB8lJ1lMtmlvg_q4Ii0KCmYEhJvXXAdsY4cy4pp6O6jTx8je4PVCbNBFK5K5xjjxjwjjd96R9LDlzJiwLrus2kA_cysLyxO6uOqHLFcftyyhrxUTln0azmZLsYGCB1mNLDe1o8tGzT-UMNb3hHgq4gAFWDbo05Vm21',
    socials: {
      github: '#',
      linkedin: '#'
    }
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test1',
    name: 'Bùi Thế Duy',
    role: 'Giám đốc Vận hành',
    company: 'Gia dụng Modern House',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfe_KEHXGLfarSkYksgGDslxsRdgimDW9125BF20UryEEkoMaypdedyolh5APjEmc114Icl4LF0MOaUiY5GYYUU4b32wh2hVYPEsp9LUtND-RqAzEgnFbvsBKVn6e4EV2XlZ1GvnGrjKbI69VG18zKEmSdPyIOdB7IkOaaqVCFP7glx23vGmtZGTACJpTaknxEPtLJI6ajh105FO4kFZuS-ye6Gz1847qOi2qZuTItFX67fKnatvO7cQG67-4alsYOb6W4GMyI-7pK',
    content: 'Đội ngũ UPhostix đã mang lại sự bứt phá thực sự cho việc chuyển đổi số của công ty chúng tôi. Website tải cực nhanh dưới 1 giây, tỷ lệ chuyển đổi đơn hàng tăng vọt 40%.',
    rating: 5
  },
  {
    id: 'test2',
    name: 'Phạm Hải Yến',
    role: 'Giám đốc Thương hiệu',
    company: 'K-Cosmetic Beauty',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2w8dMTs5kR4RHQqII42oOVfQ0JpHtQgmKoykauZUpOrvlGYMEZcC_DoZhAFWA_GUUb0fdwMOJ6ZIwhXWGoPT-9rIXppTq7Un9U9TObb-ibJKHmTdS-mOLDI7sBnREwqXeH70SUsxJYvJGdVKV5b4d6NWv92MG1ZANcVuS8dTgacEotPLYoXeISHpJzFho4DrjpnJN2zBEbDc_ls9y1Wk6XbYS6mM-_oE2r3lviiQxQS3MsBBFwEs8DHJM7tJEVdIQx3Tiy54uliOR',
    content: 'Tư duy thiết kế của UPhostix cực kỳ hiện đại và mang tính chiến lược cao. Bộ nhận diện thương hiệu số hoàn toàn giải quyết được sự nhất quán của chúng tôi trên mọi kênh truyền thông.',
    rating: 5
  },
  {
    id: 'test3',
    name: 'Nguyễn Tiến Đạt',
    role: 'Founder',
    company: 'Velo Logistics',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB5R3CtpPAlaWx46b17qMPijg7AyRzgu5IcZIrrPTJM9f90nO_OvdbgdgUSWkofBQ9gl4DAGzzDl3gk7b2ILcvRCBWkeVRlV_sIsQOQXFRdshzall5HtjE1udvm8XiYGP8EE6VTut4GEyTgDQoaulnIl6Pl-b4RA95jqLeLzBbxJqwRDTOqt1NGse0hDVQw2Jfgvtn4oRPZkM3xoQDpvuhQpw31V2j5anZP8LpBY0LARiEuaLpO6_gQNPeoPoClVBxOzjg5Zf1Vvm5y',
    content: 'Sử dụng dịch vụ SEO và marketing của UPhostix mang lại lượng traffic tự nhiên khổng lồ. Từ khóa đứng top bền vững, dịch vụ hỗ trợ chu đáo từ khâu khởi tạo tới vận hành.',
    rating: 5
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2022',
    title: 'Khơi Nguồn Sáng Tạo',
    description: 'UPhostix được thành lập bởi nhóm 3 tài năng trẻ mang khát khao định nghĩa lại trải nghiệm thiết kế Web cao cấp.'
  },
  {
    year: '2023',
    title: 'Vươn Mình Đột Phá',
    description: 'Đạt mốc 50 dự án số thành công, mở rộng dịch vụ toàn diện bao gồm chiến lược SEO nâng cao và Hệ sinh thái thương mại điện tử.'
  },
  {
    year: '2024',
    title: 'Dẫn Đầu Hiệu Năng',
    description: 'Tiên phong tích hợp công nghệ Jamstack và Serverless, tăng tốc độ trải nghiệm và độ bảo mật cho các đối tác cấp doanh nghiệp.'
  },
  {
    year: '2026',
    title: 'Kiến Tạo Tương Lai Số',
    description: 'Cùng doanh nghiệp Việt Nam vững vàng hội nhập thế giới bằng các giải pháp tự động hóa thông minh và đẳng cấp quốc tế.'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    category: 'general',
    question: 'Quy trình thiết kế website tại UPhostix diễn ra trong bao lâu?',
    answer: 'Thời gian hoàn thành phụ thuộc vào quy mô dự án. Với Landing Page / Website thông thường mất khoảng 2 - 3 tuần, còn hệ thống E-commerce hay Web App phức tạp có thể từ 4 - 8 tuần bao gồm các khâu: Nghiên cứu, thiết kế UI/UX, lập trình, kiểm thử độ ổn định và bàn giao.'
  },
  {
    id: 'faq2',
    category: 'technical',
    question: 'UPhostix sử dụng công nghệ nào để phát triển website?',
    answer: 'Chúng tôi ưu tiên hiệu năng ưu việt, tốc độ và tối ưu SEO. Do đó, chúng tôi sử dụng React, Next.js, Tailwind CSS cho Frontend; Node.js, Python cho Backend tùy nhu cầu; lưu trữ đám mây AWS, Vercel hoặc Cloudflare giúp bảo mật tối đa và tải trang dưới 1 giây.'
  },
  {
    id: 'faq3',
    category: 'pricing',
    question: 'Chi phí duy trì website hàng năm gồm những khoản nào?',
    answer: 'Thông thường bao gồm hai khoản chi phí cố định: Tên miền (Domain) và Host lưu trữ (Hosting/Cloud server). UPhostix luôn tư duy tối ưu chi phí hạ tầng, nhiều giải pháp web tĩnh hiện đại của chúng tôi giúp khách hàng không mất thêm phí hosting hàng tháng mà vẫn đạt tốc độ tuyệt đỉnh.'
  },
  {
    id: 'faq4',
    category: 'general',
    question: 'Website có được tối ưu hóa chuẩn SEO tự động không?',
    answer: 'Tất cả sản phẩm Web của UPhostix xuất xưởng đều được tối ưu hóa cấu trúc chuẩn SEO on-page: cấu trúc thẻ Heading, tối ưu sitemap, robot.txt, nén ảnh tự động, tương thích thiết bị di động, cài đặt sẵn Google Analytics và Search Console.'
  },
  {
    id: 'faq5',
    category: 'pricing',
    question: 'UPhostix có chính sách bảo hành, bảo trì như thế nào?',
    answer: 'Chúng tôi cam kết bảo hành kỹ thuật trọn đời đối với tất cả website được vận hành trên hạ tầng do chúng tôi cấu hình. Bạn cũng nhận được chương trình hướng dẫn quản trị trực quan 1-1 và support xử lý sự cố khẩn cấp trong vòng 2 giờ.'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog1',
    title: 'Xu Hướng Thiết Kế Website Năm 2026: Khi Tốc Độ Và Thẩm Mỹ Lên Ngôi',
    excerpt: 'Tìm hiểu các xu hướng thiết kế Web tiên phong sắp tới, nơi trải nghiệm người dùng tối giản cùng hiệu năng máy chủ cực đỉnh sẽ nắm giữ chìa khóa chuyển đổi thành công.',
    content: 'Thiết kế website trong năm 2026 không còn đơn thuần là việc sắp đặt các khối hộp hay lựa chọn các tông màu rực rỡ thông thường. Đây chính là kỷ nguyên của **Sự chuyển động có mục đích**, **Tối ưu tốc độ phản hồi tuyệt đối** và **Kiến trúc dữ liệu siêu phân tán** nhằm nâng tầm doanh nghiệp số.\n\n### 1. Cuộc cách mạng về hiệu suất tải trang tối hảo\nKhách hàng thời đại số không có đủ kiên nhẫn để chờ đợi website của bạn tải quá 1.5 giây. Theo các thống kê và nghiên cứu trải nghiệm khách hàng mới nhất, mỗi 100 miligiây tải trang chậm trễ có thể khiến tỷ lệ chuyển đổi sụt giảm tới 7%. Do đó, các công nghệ hiện đại như Jamstack, React, Next.js và CDN phân tán trên điện toán đám mây đang trở thành lựa chọn cốt lõi của mọi thương hiệu khao khát khẳng định thế mạnh trên thị trường số.\n\n### 2. Thẩm mỹ tối giản và có chiều sâu (Sophisticated Minimalism)\nThay vì chồng chất các hiệu ứng nặng nề gây loãng thông tin, thiết kế hiện đại chú trọng sâu sắc đến việc tăng diện tích không gian âm (Negative Space) để tạo độ thở rộng rãi, kết hợp cùng các display font độc quyền mang xu hướng thanh lịch cao cấp và hiệu ứng chuyển động tinh tế của thư viện Motion React. Giao diện tối giản mang tới cảm giác thanh tao, chuyên nghiệp, phản ánh trực quan chân thực nhất về giá trị và vị thế của doanh nghiệp.\n\n### 3. Tương tác mượt mà tập trung cho thiết bị di động\nMọi điểm chạm vuốt hay hộp thông tin trên màn hình di động đều được tính toán tỉ mỉ cho hành vi một ngón cái. Trải nghiệm một trang (SPA-like) và sự mượt mà không load lại trang sẽ gia tăng trải nghiệm sử dụng liên tục, từ đó đưa tỷ lệ chuyển đổi giỏ hàng và đăng ký dịch vụ của khách hàng tăng trưởng nhanh vượt bực.\n\nTại UPhostix, chúng tôi tin rằng website chính là gương mặt số đại diện cho vị thế của doanh nghiệp. Bởi vậy chúng tôi thiết lập chế độ Core Web Vitals khắt khe làm quy chuẩn bàn giao sản phẩm, bảo đảm thương hiệu của bạn luôn sở hữu bệ phóng trực tuyến mượt mà và tối tân nhất.',
    category: 'Design',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARK8vlAGS-Cd6lK_438Zq0CG9KyK7uZ8OK2aDdUErEHNdeeyu4Cm_4qbAXdqUhobYaHbf4-rKhNNAjzzBNsDV9-YxXqZ6Pfkkk6hqlsIqxsVReucZRHmpNoOJXTCLqf8cCTkgK8t-YpXWmQDrlidtrBXy45pchIyq275DlmUFDZzXMwosdpQYUwi-cyJvsCZrPvxU6pT5t5CPxCkkNLD1__gyd1sqnjVot1ccgmRqTyW9iPGXh3Dg9eYFrHZUfyOsGc3r14wIIW-PJ',
    author: {
      name: 'Trần Minh Anh',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDKRCEUr1kxfPWBX44cc9DY72QmGOpqTv1oKQCUp5opUN0zXexKHSRTGLjsItyQfDhT28xAsqZRfNM9GwXpgLDFDB5Wc1q4mabrdnVVBb9hanvJIn0F98gITBAvq1h5cI3FtpRqJXMDZoaNafjnD9r3SVv450X39alKJ8orRl6jcwwIKuaF3A09s4c2awia-pSkfqGUEgUI7-ucT06aZmGQtycsLeXmKIt51ihFmBn12x7ml2nP9wz7y1YGplWDtNj5h1dPeQ2j2MAu',
      role: 'CEO & Founder'
    },
    date: '24/05/2026',
    readTime: '5 phút đọc',
    tags: ['Web Design', 'UI/UX Trend', 'Next.js', 'Core Web Vitals']
  },
  {
    id: 'blog2',
    title: 'Bí Quyết Tối Ưu SEO On-Page Thống Trị Từ Khóa Google Bền Vững',
    excerpt: 'SEO không chỉ là nhồi nhét từ khóa bừa bãi. Muốn đứng vững trên Top Google đòi hỏi doanh nghiệp của bạn phải am hiểu về tối ưu hóa thực thể Entity, cấu trúc Schema và nội dung ngữ nghĩa.',
    content: 'Các bộ máy tìm kiếm của Google đang liên tục tiến hành nâng cấp thuật toán thông minh hơn dưới sự hỗ trợ đắc lực của Trí Tuệ Nhân Tạo (AI Search). Do thế, phương pháp làm SEO kiểu cũ không còn phát huy nhiều hiệu quả thực tế. Để nâng thứ hạng từ khóa bền vững, chúng ta cần thay đổi tư duy làm nội dung chuẩn SEO kiểu mới.\n\n### 1. Kiến tạo Hệ Thực Thể Nhất Quán (Entity SEO)\nGoogle sẽ đánh giá cực kỳ cao các trang web có tính minh bạch thực thể (Entity) rõ nét. Việc định hình một thực thể số bền vững đòi hỏi website của bạn phải được tối ưu hóa cấu trúc dữ liệu vi mô (Schema.org), kết hợp định danh đồng bộ tuyệt đối về mặt địa chỉ, thông tin liên hệ và liên kết không rời rạc giữa website chính thức tới các mạng xã hội uy tín hàng đầu.\n\n### 2. Tập trung sâu cho Nội Dung Ngữ Nghĩa (Semantic Content)\nThay cho việc sản xuất các bài viết ngắn, sơ sài với mật độ nhồi nhét từ khóa dày đặc gây khó chịu cho người đọc, xu hướng SEO bền vững đòi hỏi bạn phải đầu tư cho các Bài viết Trụ Cột (Pillar Content). Đó là những bài phân tích sâu sắc, đa chiều, cung cấp kiến thức giá trị thật sự thỏa mãn đầy đủ các mục đích tìm kiếm (User Intent) của khách hàng.\n\n### 3. Tối ưu kỹ thuật (Technical SEO) – Nền móng vững chãi\nMột trang web đẹp sẽ vô giá trị nếu sitemap.xml bị lỗi, cấu trúc URL rườm rà hay không được trang bị chứng chỉ bảo mật HTTPS. Việc tối ưu hóa hình ảnh gọn nhẹ, dọn dẹp các mã nguồn dư thừa để đạt điểm Core Web Vitals xanh mướt đóng góp tới 40% trong việc giữ vững thứ hạng từ khóa trên Google.\n\nTại UPhostix, chúng tôi luôn lồng ghép chiến lược tối ưu hóa SEO kỹ thuật sâu sắc vào từng dòng code khi xây dựng website, tạo ra ưu thế cạnh tranh bứt phá cho thương hiệu ngay từ những ngày đầu ra mắt.',
    category: 'SEO',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfoeCM_A_yz1UevjjFMD7En2WeYHFcOhyyY-gDse07yYbUrxdskK3QjfF3QYJ5mE_kV0vUZqWys6lLtif7mcGF54V6ErqSXi9Z0CEp47jDQtC0egKhiPiEb9nVN9cJ2y87p8XrTPxME05SRAF6xAONexG1NkPcQIshyVVNoIWg1Nlo4VUmCjSzcDIfpeC55Wq8LvrYHdmNzIHBLgYr5AJs2QfErYnV_ZXaOkwV2fO0T2MtY6dqtVqsijubX7FCELh6NUApPv4YoBDL',
    author: {
      name: 'Lê Phương Thảo',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB6st9GcZbD36SKwpOI3KSMcuWU3NEDXE_pLdKopHYuJjOduzoeVHDqzT4uMWpEmNaEfVftfoTSyo6b9J0xJ3sFonutZ4kD1S5hzY5wSY3MLAuxe01KTWybGBhariOmTxcDCR1UKNba5yJjIgRjt7qkQdHYi2uveNUgzCxyKqNkab_xoolE3auCdWUsUm4d-9DQPvjyhry8YqI-JXDnb2IeQOqlOnVI-gfS6kqE_610buvh6IPGZP_TYJkRM0CyiTSrMD-syFlB-YjN',
      role: 'Creative Director'
    },
    date: '18/05/2026',
    readTime: '6 phút đọc',
    tags: ['SEO Marketing', 'SEO Onpage', 'Google Rank', 'Semantic Content']
  },
  {
    id: 'blog3',
    title: 'Kiến Trúc Tải Nhanh Jamstack: Thống Trị Trải Nghiệm Khách Hàng',
    excerpt: 'Tìm hiểu nguyên nhân vì sao hầu hết các tập đoàn công nghệ lớn đang dần dịch chuyển dịch từ WordPress truyền thống sang kiến trúc Jamstack siêu việt (React, Next.js, Cloud APIs).',
    content: 'Tốc độ phản hồi chậm chạp cùng nỗi lo bảo mật của các hệ CMS cũ kĩ đang vô hình trung kìm hãm đà phát triển của nhiều công ty lớn. Cùng Technical Lead từ UPhostix mổ xẻ lý do vì sao kiến trúc Jamstack đang thiết lập lại tiêu chí đánh giá website cao cấp hoàn toàn mới.\n\n### 1. Giới hạn khó vượt qua của WordPress truyền thống\nCác trang web WordPress sử dụng cơ sở dữ liệu MySQL truy vấn trực tiếp mỗi khi có người dùng truy cập. Việc này tạo thêm gánh nặng bộ nhớ cho máy chủ và khi lượng người đọc tăng đột biến sẽ dễ gây nghẽn mạng. Đồng thời, do quản lý cơ sở dữ liệu tập trung, WordPress luôn là mục tiêu ưa thích của các cuộc tấn công DDoS hay chèn mã độc vào plugin của bên thứ ba.\n\n### 2. Định nghĩa Jamstack nâng tầm tối đa hiệu suất\nJamstack (JavaScript - APIs - Markup) tách biệt hoàn toàn phần giao diện hiển thị (Frontend) và cơ sở dữ liệu / dịch vụ nghiệp vụ (Backend): \n\n- **Static Site Generation (SSG)**: Toàn bộ cấu trúc website được dựng sẵn thành tệp HTML/CSS/JS tĩnh ngay trong quá trình build sản phẩm, thay vì render tại thời điểm có client gọi.\n- **Lưu trữ phân tán CDN toàn cầu**: Các tệp tĩnh gọn nhẹ này được phát tán tức tốc tới hàng ngàn máy chủ CDN rìa (Edge servers). Khách hàng truy cập sẽ lập tức nhận được phản hồi từ vị trí máy chủ gần nhất mà không cần đợi truy vấn database dài dòng.\n- **Bảo mật tuyệt đỉnh**: Không còn tồn tại một lỗ hổng cơ sở dữ liệu mở trực thòng ra bên ngoài. Website Jamstack trở nên kiên cố không thể bị xâm thực bất hợp pháp.\n\nVới đội ngũ chuyên gia giàu kinh nghiệm của UPhostix, chúng tôi luôn tự tin là một trong những đơn vị phát triển web đi đầu hành trình làm chủ Jamstack, Next.js nâng bước doanh nghiệp vươn tầm cao số hóa.',
    category: 'Tech',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7xKkF5hHFERNM5czVRKin_KB3b10d8i7NPdaFMQoSpJ-b1hQOAag_39996h-rgyyE609v5YMtViMG17dzmLiVQK-4YqtzbFEo9DHHC_P9kC9Z1JsY0OmzqwoXLAaOryabq3tMqglFI-qSzXyNqvPmaiecO1J_rpKSV6mSRH9Wuq2VzuhUj1FT6mIvefX3aI90SfcIB8BDIlEi7kxvc0G-X09VXkkr14AgvNsgyYzNqf3CF4lTQbBMVoVV9bu1WkHinQPLy-I0eC7s',
    author: {
      name: 'Nguyễn Đức Việt',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCyUn4WbQRkkX346g89mt1exTx5Ynp0Htb7V18sftLGmoduMsVSoFUf1qmqnRLVX0a4H7pwCtdp9CTu3vyvxhTYcMFj7ajrOA9WdY8Ab_dp2nB8lJ1lMtmlvg_q4Ii0KCmYEhJvXXAdsY4cy4pp6O6jTx8je4PVCbNBFK5K5xjjxjwjjd96R9LDlzJiwLrus2kA_cysLyxO6uOqHLFcftyyhrxUTln0azmZLsYGCB1mNLDe1o8tGzT-UMNb3hHgq4gAFWDbo05Vm21',
      role: 'Technical Lead'
    },
    date: '12/05/2026',
    readTime: '8 phút đọc',
    tags: ['Jamstack', 'Next.js', 'Performance Opt', 'Web Security']
  }
];
