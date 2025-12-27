document.addEventListener('DOMContentLoaded',function(){
  const navToggle = document.getElementById('navToggle');
  const navList = document.getElementById('nav-list');
  navToggle && navToggle.addEventListener('click', ()=>{
    const isOpen = navList.classList.toggle('show');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  // close nav when clicking outside or pressing Escape
  document.addEventListener('click', (e)=>{
    if(!navList || !navToggle) return;
    if(navList.classList.contains('show')){
      const isInside = navList.contains(e.target) || navToggle.contains(e.target);
      if(!isInside) {
        navList.classList.remove('show');
        navToggle.setAttribute('aria-expanded','false');
      }
    }
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && navList && navList.classList.contains('show')){
      navList.classList.remove('show');
      navToggle.setAttribute('aria-expanded','false');
    }
  });

  // smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if(href.length>1){
        e.preventDefault();
        const el = document.querySelector(href);
        el && el.scrollIntoView({behavior:'smooth',block:'start'});
        navList && navList.classList.remove('show');
        navToggle && navToggle.setAttribute('aria-expanded','false');
      }
    })
  })

  // GSAP animations (only if gsap loaded)
  if(window.gsap){
    try{
      gsap.registerPlugin(window.ScrollTrigger);
      const tl = gsap.timeline({defaults:{duration:0.8,ease:'power3.out'}});
      tl.from('.brand h1',{y:-10,opacity:0,stagger:0.05})
        .from('.brand .role',{y:-6,opacity:0},'-=0.5')
        .from('.hero-left h2',{x:-20,opacity:0},'-=0.5')
        .from('.lead',{y:8,opacity:0},'-=0.45')
        .from('.links .btn',{scale:0.95,opacity:0,stagger:0.08},'-=0.4');

      // hero visual float
      gsap.to('.blob',{y: -18, x: 10, duration:6, yoyo:true, repeat:-1, ease:'sine.inOut'});
      gsap.to('.blob',{rotation:8,duration:10,yoyo:true,repeat:-1,ease:'sine.inOut'});

      // skill cards stagger
      gsap.from('.skill-card',{opacity:0,y:18,stagger:0.12,duration:0.8,ease:'power2.out',delay:0.3});

      // project cards
      gsap.from('.project',{opacity:0,y:14,stagger:0.12,duration:0.7,ease:'power2.out',delay:0.6});

      // footer
      gsap.from('.site-footer',{opacity:0,y:10,duration:0.8,delay:0.9});
      
      // Scroll-triggered reveals for sections and cards
      gsap.utils.toArray('.section-content').forEach((el)=>{
        gsap.from(el,{opacity:0,y:20,duration:0.8,scrollTrigger:{trigger:el,start:'top 82%',toggleActions:'play none none none'}});
      });
      gsap.utils.toArray('.skill-card').forEach((el,i)=>{
        gsap.from(el,{opacity:0,y:18,duration:0.7,delay: i*0.06,scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none none'}});
      });
      gsap.utils.toArray('.project').forEach((el,i)=>{
        gsap.from(el,{opacity:0,y:20,duration:0.7,delay: i*0.06,scrollTrigger:{trigger:el,start:'top 90%',toggleActions:'play none none none'}});
      });
    }catch(e){console.warn('GSAP animation failed',e)}
  }
});
