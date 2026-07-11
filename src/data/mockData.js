export const congressMembers = [
  { id: 1, name: 'Abolyo Putyag', party: '自由共和黨', district: '奉天府第一選區', committee: '外交與國防委員會', since: '民國四年', role: '民國府總理', email: 'a.putyag@parliament.bd' },
  { id: 2, name: 'Motyselin Setti', party: '自由共和黨', district: '泠江州第一選區', committee: '司法與法制委員會', since: '民國四年', role: '召集委員', email: 'm.setti@parliament.bd' },
  { id: 3, name: 'Tseng Hontso', party: '自由共和黨', district: '奉天府第二選區', committee: '財政委員會', since: '民國五年', role: '召集委員', email: 't.hontso@parliament.bd' },
  { id: 4, name: 'Chiang Menkin', party: '民主黨', district: '青河州第一選區', committee: '教育與文化委員會', since: '民國四年', role: '召集委員', email: 'c.menkin@parliament.bd' },
  { id: 5, name: 'Teai Kinmen', party: '自由共和黨', district: '沿海州第一選區', committee: '內政委員會', since: '民國四年', role: '召集委員', email: 't.kinmen@parliament.bd' },
  { id: 6, name: 'Lyo Minhe', party: '民主黨', district: '紅西州第一選區', committee: '經濟委員會', since: '民國五年', role: '委員', email: 'l.minhe@parliament.bd' },
  { id: 7, name: 'Tsen Ieepon', party: '民主黨', district: '泠江州第二選區', committee: '交通委員會', since: '民國五年', role: '委員', email: 't.ieepon@parliament.bd' },
];

export const committees = [
  { id: 1, name: '司法與法制委員會', chair: 'Motyselin Setti', members: 5, description: '審查法律案、憲法修正案、司法制度、人權保障及法制相關政策。' },
  { id: 2, name: '財政委員會', chair: 'Tseng Hontso', members: 5, description: '審查預算、決算、稅制、公債、國有資產及金融監理相關政策。民國六年度歲出預算修正案即由本委員會審查。' },
  { id: 3, name: '外交與國防委員會', chair: 'Abolyo Putyag', members: 5, description: '審查外交條約、國防安全、國際合作及海外事務相關政策。' },
  { id: 4, name: '教育與文化委員會', chair: 'Chiang Menkin', members: 5, description: '審查教育制度、文化保存、學術研究、語言政策及傳播相關政策。' },
  { id: 5, name: '內政委員會', chair: 'Teai Kinmen', members: 5, description: '審查地方自治、選舉制度、公共安全、移民及民政相關政策。' },
  { id: 6, name: '經濟委員會', chair: 'Lyo Minhe', members: 5, description: '審查產業發展、貿易政策、科技創新、能源及勞動相關政策。' },
  { id: 7, name: '交通委員會', chair: 'Tsen Ieepon', members: 4, description: '審查交通建設、航運、港務、郵政及通訊相關政策。' },
];

export const otherOfficials = [
  { name: 'Aselin Fodepat', title: '中央監察院院長', note: '立憲委員會委員。依法獨立行使職權，對國會負責。' },
  { name: 'Men Chiekin', title: '國府特聘專家', note: '立憲委員會主任。非國會議員，由民國府聘任。' },
];

export const newsArticles = [
  { id: 1, title: '國會審議六年度歲出預算修正案', date: '民國六年六月一日', category: '預算', summary: '民國府呈送六年度歲出預算修正案，中央公職人員年度薪資支出總額為1,537,029普斯及147人民幣元。財政委員會已排入審查議程。' },
  { id: 2, title: '立憲委員會將於六月十五日依法解散', date: '民國六年六月五日', category: '憲政', summary: '依據《大立憲法》規定，立憲委員會完成正式憲法起草任務後，將於民國六年六月十五日依法解散。' },
  { id: 3, title: '國會舉行《公職人員財產公示法案》公聽會', date: '民國六年六月十八日', category: '公聽會', summary: '多位學者與公民團體代表出席發言，就財產公示範圍與罰則標準進行討論。' },
  { id: 4, title: '自由共和黨與民主黨就憲法修正達成共識', date: '民國六年六月十二日', category: '憲政', summary: '兩大黨在憲法法院組織法修正案上達成跨黨派共識。總理 Abolyo Putyag 表示樂觀其成。' },
  { id: 5, title: '中央監察院提交年度廉政報告', date: '民國六年五月二十日', category: '監察', summary: '中央監察院院長 Aselin Fodepat 向國會提交年度廉政報告，肯定公職人員財產申報制度實施成效。' },
  { id: 6, title: '國會通過《地方自治法修正草案》', date: '民國六年五月十五日', category: '法案', summary: '強化地方財政自主權，明確中央與地方權限劃分。' },
  { id: 7, title: '「憲政民主與治水智慧」國際學術研討會', date: '民國六年五月七日', category: '國際交流', summary: '來自世界各地的憲法學者與治水專家共聚奉天府，探討水文明與憲政秩序的深層聯繫。' },
  { id: 8, title: '國會公布新一會期開議日程', date: '民國六年四月二十五日', category: '會議', summary: '新會期將於七月一日開議，預計審議多項法案，包括歲出預算案及憲法相關修正案。' },
];

export const laws = [
  { id: 1, number: '民國五年法字第042號', title: '國籍法', status: 'passed', statusLabel: '已公布', date: '民國五年九月一日' },
  { id: 2, number: '民國五年法字第035號', title: '司法組織法案', status: 'passed', statusLabel: '已公布', date: '民國五年七月十五日' },
  { id: 3, number: '民國五年法字第028號', title: '行政程序法案', status: 'passed', statusLabel: '已公布', date: '民國五年六月一日' },
  { id: 4, number: '民國六年法字第007號', title: '反極權主義宣傳法案', status: 'review', statusLabel: '委員會審查', date: '民國六年六月一日' },
  { id: 5, number: '民國六年法字第015號', title: '國民教育法修正草案', status: 'review', statusLabel: '委員會審查', date: '民國六年六月一日' },
  { id: 6, number: '民國六年法字第021號', title: '地方自治法修正草案', status: 'review', statusLabel: '委員會審查', date: '民國六年五月十五日' },
  { id: 7, number: '民國六年法字第018號', title: '移民管理法', status: 'passed', statusLabel: '已公布', date: '民國六年三月十日' },
  { id: 8, number: '民國四年法字第055號', title: '立憲委員會法（大立憲法）', status: 'passed', statusLabel: '已公布', date: '民國四年十一月五日' },
  { id: 9, number: '民國四年法字第041號', title: '國會職權行使法', status: 'passed', statusLabel: '已公布', date: '民國四年七月二十二日' },
  { id: 10, number: '民國六年法字第035號', title: '政黨法修正草案', status: 'proposed', statusLabel: '提案階段', date: '民國六年七月一日' },
];

export const siteConfig = {
  name: '白東民國國會',
  nameEn: 'Parliament of the Republic of Bronoto',
  shortName: '國會',
  tagline: '國民主權的最高立法機關',
  address: '奉天府中央區憲政大道1號',
  email: 'info@parliament.bd',
  currentSession: '民國六年度第三會期',
  sessionStart: '民國六年七月一日',
  sessionEnd: '民國六年十二月三十一日',
  billsInReview: 4,
  billsPassed: 42,
  totalBudget: '1,537,029 普斯 / 147 人民幣元',
};
