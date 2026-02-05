const navLinks = document.querySelectorAll('.nav a');
const sections = Array.from(navLinks).map((link) => document.querySelector(link.getAttribute('href')));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav a[href="#${entry.target.id}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  },
  { threshold: 0.4 }
);

sections.forEach((section) => section && observer.observe(section));

const flowData = {
  '內容入口': '建立專業可信任內容，主打「肌膚健身」概念與前後對比數據。',
  '投流放大': '以分層投放擴大曝光，將高互動內容二次放大。',
  '私域沉澱': '透過會員肌膚檔案與專屬群任務提高黏著度。',
  '體驗成交': '主打一次體驗 + 限時優惠券，降低首次決策阻力。',
  '續卡成長': '建立續卡關鍵任務與回診節奏，提升 LTV。',
  '轉介紹擴散': '設計「雙向獎勵」促進會員帶會員。',
  '品牌聲譽': '設定合規審核，確保案例與話術一致性。',
  '加盟複製': '輸出標準化內容庫與投放 SOP，降低導入成本。',
  '區域合夥': '打造區域流量中台，形成聚合流量優勢。'
};

const flowNodes = document.querySelectorAll('.flow-node');
const flowTitle = document.getElementById('flow-title');
const flowDesc = document.getElementById('flow-desc');

flowNodes.forEach((node) => {
  node.addEventListener('click', () => {
    flowNodes.forEach((item) => item.classList.remove('active'));
    node.classList.add('active');
    const title = node.textContent.trim();
    flowTitle.textContent = title;
    flowDesc.textContent = flowData[title] || '請選擇節點查看說明。';
  });
});

const calcBtn = document.getElementById('calc');

function formatNumber(value) {
  return new Intl.NumberFormat('zh-Hant-TW').format(Math.round(value));
}

function calcROI() {
  const budget = Number(document.getElementById('budget').value) || 0;
  const cpc = Number(document.getElementById('cpc').value) || 0;
  const cr = Number(document.getElementById('cr').value) || 0;
  const commission = Number(document.getElementById('commission').value) || 0;
  const repeat = Number(document.getElementById('repeat').value) || 0;

  const clicks = cpc > 0 ? budget / cpc : 0;
  const orders = clicks * (cr / 100);
  const repeatBoost = 1 + repeat / 100;
  const revenue = orders * commission * repeatBoost;
  const roi = budget > 0 ? ((revenue - budget) / budget) * 100 : 0;

  document.getElementById('orders').textContent = formatNumber(orders);
  document.getElementById('revenue').textContent = `NT$ ${formatNumber(revenue)}`;
  document.getElementById('roi').textContent = `${roi.toFixed(1)}%`;
}

calcBtn.addEventListener('click', calcROI);

calcROI();

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('.mobile-nav');

if (menuToggle && mobileNav) {
  menuToggle.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
    });
  });
}

const filters = document.querySelectorAll('.filter');
const caseCards = document.querySelectorAll('#case-grid .card');

filters.forEach((filter) => {
  filter.addEventListener('click', () => {
    filters.forEach((btn) => btn.classList.remove('active'));
    filter.classList.add('active');
    const tag = filter.getAttribute('data-filter');
    caseCards.forEach((card) => {
      const tags = card.getAttribute('data-tags') || '';
      if (tag === 'all' || tags.includes(tag)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
