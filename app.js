(()=>{
'use strict';
const D=window.ARCHIVE, cats=D.categories, page=document.body.dataset.page, root=document.querySelector('#app');
const esc=v=>String(v??'').replace(/[&<>"']/g,s=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[s]));
const num=i=>String(i+1).padStart(2,'0');
const url=c=>c.id+'.html';
const media=(src,label)=>`<div class="media">${src?`<img src="${esc(src)}" alt="${esc(label)}" loading="lazy">`:`<div class="placeholder"><span>${esc(label)}</span><small>IMAGE PLACEHOLDER</small></div>`}</div>`;
const current=p=>page===p?' aria-current="page"':'';
const header=()=>`<header class="header"><div class="wrap header-inner"><a class="logo" href="index.html">${esc(D.siteName)}</a><button class="mobile-toggle" aria-expanded="false" aria-label="메뉴 열기">☰</button><nav class="nav" aria-label="주 메뉴"><a href="index.html"${current('home')}>HOME</a><div class="drop"><button class="drop-toggle" aria-expanded="false">WORKS <span aria-hidden="true">⌄</span></button><div class="drop-menu">${cats.map(c=>`<a href="${url(c)}"${current(c.id)}>${esc(c.title)}</a>`).join('')}</div></div><a href="about.html"${current('about')}>ABOUT</a><a href="contact.html"${current('contact')}>CONTACT</a></nav></div></header>`;
const footer=()=>`<footer class="footer"><div class="wrap"><a class="logo" href="index.html">${esc(D.siteName)}</a><span>© 2026 HE ARCHIVE.</span><a href="#top">TOP ↑</a></div></footer>`;
const contact=()=>`<section class="section contact-strip reveal"><div><div class="eyebrow">03 / CONTACT</div><h2 class="serif">Let's work together.</h2></div><a class="arrow" aria-label="연락처 페이지" href="contact.html">↗</a></section>`;
const home=()=>`<main class="wrap"><section class="hero"><div class="hero-copy"><div class="hero-number" aria-hidden="true">26</div><div class="eyebrow">L. HEE EUN / PORTFOLIO</div><h1 class="serif"><span>Visual</span>Design<em>Archive.</em></h1><p>기획과 공감을 바탕으로<br>메시지를 시각적으로 설계합니다.</p><a class="text-link" href="#works">EXPLORE WORKS <span class="arrow">↘</span></a></div><div class="hero-visual">${media(D.heroImage,'Main Visual')}</div></section><section class="section reveal" id="works"><div class="section-head"><div><div class="eyebrow">01 / DESIGN CATEGORY</div><h2 class="serif">Explore Works.</h2></div><div class="controls"><button data-scroll="-1" aria-label="이전 카테고리">←</button><button data-scroll="1" aria-label="다음 카테고리">→</button></div></div><div class="track" tabindex="0" aria-label="디자인 카테고리">${cats.map((c,i)=>`<a class="category-card" href="${url(c)}"><div class="card-top"><span>${esc(c.title.toUpperCase())}</span><span>${num(i)}</span></div>${media(c.image,c.title)}<div class="card-bottom"><small>${esc(c.ko)}</small><span class="arrow">↗</span></div></a>`).join('')}</div></section><section class="section about-strip reveal"><div><div class="eyebrow">02 / ABOUT THE DESIGNER</div><h2 class="serif" style="margin-top:20px">More than<br>just a visual.</h2></div><div><p>브랜드가 전달하고자 하는 메시지를 이해하고, 목적에 맞는 디자인을 설계합니다.</p><a class="text-link" href="about.html">ABOUT ME ↗</a></div></section>${contact()}</main>`;
const intro=(k,t,desc,n='')=>`<section class="page-intro"><div class="eyebrow">${esc(k)}</div>${n?`<span class="num" aria-hidden="true">${esc(n)}</span>`:''}<h1 class="serif">${esc(t)}.</h1><p>${esc(desc)}</p></section>`;
const category=c=>{const i=cats.indexOf(c),ps=D.projects.filter(p=>p.category===c.id),next=cats[(i+1)%cats.length];return `<main class="wrap">${intro('WORKS / '+num(i),c.title,c.desc,num(i))}<nav class="tabs" aria-label="작업물 카테고리">${cats.map(x=>`<a class="${x===c?'active':''}" href="${url(x)}"${x===c?' aria-current="page"':''}>${esc(x.title.toUpperCase())}</a>`).join('')}</nav><div class="project-grid">${ps.length?ps.map((p,j)=>`<a class="project-card ${p.feature?'feature':''}" href="project.html?id=${encodeURIComponent(p.id)}"><div class="card-top"><span>${num(j)} / ${esc(p.en)}</span></div>${media(p.thumbnail,p.en||p.title)}<div class="card-bottom"><h3>${esc(p.title)}</h3><span class="arrow">↗</span></div></a>`).join(''):'<div class="empty"><h2>Coming soon.</h2><p>작업물 업데이트 예정입니다.</p></div>'}</div><a class="next" href="${url(next)}"><span class="eyebrow">NEXT CATEGORY</span><strong>${esc(next.title)} ↗</strong></a></main>`};
const project=()=>{const p=D.projects.find(x=>x.id===new URLSearchParams(location.search).get('id'));if(!p)return `<main class="wrap">${intro('WORKS','Project not found','등록된 프로젝트가 없습니다.')}<a class="text-link" href="index.html#works">← BACK TO WORKS</a></main>`;const c=cats.find(x=>x.id===p.category);document.title=p.title+' | HE ARCHIVE';return `<main class="wrap"><div class="eyebrow" style="padding-top:30px"><a href="index.html">HOME</a> / <a href="${url(c)}">${esc(c.title)}</a> / ${esc(p.en)}</div><section class="project-hero">${media(p.thumbnail,p.en)}<div><div class="eyebrow">${esc(c.title)}</div><h1>${esc(p.title)}</h1><p>${esc(p.description||'프로젝트 설명을 추가할 수 있습니다.')}</p></div></section><section class="project-body ${esc(c.id)}"><div class="eyebrow" style="margin-bottom:28px">PROJECT DETAILS</div>${(p.images||[]).map((x,i)=>`<img class="work-image" src="${esc(x)}" alt="${esc(p.title)} 작업 이미지 ${i+1}" loading="lazy">`).join('')}${p.video?`<video controls preload="metadata" style="width:100%;max-height:80vh" src="${esc(p.video)}"></video>`:''}${p.youtubeId&&/^[\w-]{11}$/.test(p.youtubeId)?`<iframe title="프로젝트 영상" style="width:100%;aspect-ratio:16/9;border:0" src="https://www.youtube-nocookie.com/embed/${esc(p.youtubeId)}" allowfullscreen loading="lazy"></iframe>`:''}${!(p.images||[]).length&&!p.video&&!p.youtubeId?'<div class="empty"><h2>Project preview.</h2><p>작업 이미지 등록 영역</p></div>':''}</section><a class="next" href="${url(c)}"><span class="eyebrow">BACK TO CATEGORY</span><strong>← ${esc(c.title)}</strong></a></main>`};
const about=()=>`<main class="wrap">
  ${intro('ABOUT / PROFILE','About me','기획력과 공감력을 바탕으로 메시지를 시각적으로 설계하는 디자이너입니다.')}

  <section class="about-hero reveal">
    <div class="about-copy">
      <div class="eyebrow">01 / INTRODUCTION</div>
      <h2 class="serif">More than<br>just a visual.</h2>
      <p>
        브랜드가 전달하고자 하는 메시지와 소비자의 경험을 함께 고려하며,<br>
        목적에 맞는 시각적 결과물을 설계합니다.
      </p>
      <p>
        상세페이지, 패키지, 브랜드 아이덴티티, 프로모션, 영상까지<br>
        다양한 영역에서 일관된 브랜드 경험을 만드는 디자이너입니다.
      </p>
    </div>
    <div class="about-profile">
      <div class="eyebrow">PROFILE</div>
      <ul class="profile-list">
        <li><strong>Name</strong><span>임희은 | Lim HeeEun</span></li>
        <li><strong>MBTI</strong><span>ISFJ</span></li>
        <li><strong>Email</strong><span>${D.email ? esc(D.email) : 'tab950310@gmail.com'}</span></li>
      </ul>
    </div>
  </section>

  <section class="about-section reveal">
    <div class="section-head">
      <div>
        <div class="eyebrow">02 / EDUCATION & WORK</div>
        <h2 class="serif">Experience.</h2>
      </div>
    </div>

    <div class="timeline">
      <div class="timeline-item">
        <span class="date">2026.06 — Present</span>
  <div>
    <h3>주식회사 새벽다섯시</h3>
    <p>Visual Design</p>
  </div>
</div>
        <span class="date">2024.04 — 2026.01</span>
        <div>
          <h3>(주)워크플로컴퍼니</h3>
          <p>Visual Design</p>
        </div>
      </div>

      <div class="timeline-item">
        <span class="date">2021.07 — 2023.10</span>
        <div>
          <h3>(주)그로밋</h3>
          <p>Visual Design</p>
        </div>
      </div>

      <div class="timeline-item">
        <span class="date">2018.03 — 2021.02</span>
        <div>
          <h3>(주)디자인시티커뮤니케이션</h3>
          <p>Visual Design</p>
        </div>
      </div>

      <div class="timeline-item">
        <span class="date">2014.03 — 2018.02</span>
        <div>
          <h3>한서대학교 졸업</h3>
          <p>Education</p>
        </div>
      </div>

      <div class="timeline-item">
        <span class="date">2011.03 — 2014.02</span>
        <div>
          <h3>부광여자고등학교 졸업</h3>
          <p>Education</p>
        </div>
      </div>
    </div>
  </section>

  <section class="about-section reveal">
    <div class="section-head">
      <div>
        <div class="eyebrow">03 / CERTIFICATION</div>
        <h2 class="serif">Certification.</h2>
      </div>
    </div>

    <ul class="simple-list">
      <li>ITQ 아래한글 / 파워포인트</li>
      <li>워드프로세서 3급</li>
      <li>자동차운전면허 · 2종 보통(Auto)</li>
    </ul>
  </section>

  <section class="about-section reveal">
    <div class="section-head">
      <div>
        <div class="eyebrow">04 / TOOLS</div>
        <h2 class="serif">Tools.</h2>
      </div>
    </div>

    <div class="tool-grid">
      <div class="tool-item"><strong>Ps</strong><span>Adobe Photoshop</span></div>
      <div class="tool-item"><strong>Ai</strong><span>Adobe Illustrator</span></div>
      <div class="tool-item"><strong>Id</strong><span>Adobe InDesign</span></div>
      <div class="tool-item"><strong>Ae</strong><span>Adobe After Effects</span></div>
      <div class="tool-item"><strong>Pr</strong><span>Adobe Premiere Pro</span></div>
      <div class="tool-item"><strong>PPT</strong><span>Microsoft PowerPoint</span></div>
      <div class="tool-item"><strong>Fg</strong><span>Figma</span></div>
      <div class="tool-item"><strong>Flow</strong><span>Google Flow (AI Video)</span></div>
      <div class="tool-item"><strong>CapCut</strong><span>CapCut (AI Video)</span></div>
      <div class="tool-item"><strong>C24</strong><span>Cafe24</span></div>
    </div>
  </section>

  <section class="about-section reveal">
    <div class="section-head">
      <div>
        <div class="eyebrow">05 / DESIGN FIELD</div>
        <h2 class="serif">What I Do.</h2>
      </div>
    </div>

    <div class="field-grid">
      <div class="field-item"><span>01</span><h3>Detail Page</h3><p>상세페이지 기획 및 디자인</p></div>
      <div class="field-item"><span>02</span><h3>Package Design</h3><p>패키지 및 라벨 디자인</p></div>
      <div class="field-item"><span>03</span><h3>Brand Identity</h3><p>로고 및 브랜드 아이덴티티 디자인</p></div>
      <div class="field-item"><span>04</span><h3>Promotion</h3><p>프로모션 및 광고 디자인</p></div>
      <div class="field-item"><span>05</span><h3>Motion & Video</h3><p>영상 및 AI 기반 콘텐츠 제작</p></div>
    </div>
  </section>

  ${contact()}
</main>`;
const contactPage=()=>`<main class="wrap">${intro('CONTACT','Get in touch','디자인 프로젝트 및 작업 문의')}<div class="contact-box"><div class="eyebrow" style="margin-bottom:15px">EMAIL</div>${D.email?`<a href="mailto:${esc(D.email)}">${esc(D.email)} ↗</a>`:'<p>공개용 이메일 등록 예정입니다.</p>'}</div></main>`;
const c=cats.find(x=>x.id===page);root.innerHTML=header()+(page==='home'?home():c?category(c):page==='project'?project():page==='about'?about():contactPage())+footer();
const menu=document.querySelector('.mobile-toggle'),nav=document.querySelector('.nav'),drop=document.querySelector('.drop'),toggle=document.querySelector('.drop-toggle');menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',open)});toggle.addEventListener('click',()=>{const open=drop.classList.toggle('open');toggle.setAttribute('aria-expanded',open)});document.addEventListener('click',e=>{if(!drop.contains(e.target)){drop.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});document.addEventListener('keydown',e=>{if(e.key==='Escape'){drop.classList.remove('open');nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');menu.setAttribute('aria-expanded','false')}});document.querySelectorAll('[data-scroll]').forEach(b=>b.addEventListener('click',()=>{const t=document.querySelector('.track');t.scrollBy({left:Number(b.dataset.scroll)*t.clientWidth*.6,behavior:'smooth'})}));
if('IntersectionObserver'in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js');const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('.reveal').forEach(el=>{el.classList.add('waiting');observer.observe(el)})}
})();
