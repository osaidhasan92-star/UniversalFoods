document.addEventListener("DOMContentLoaded",()=>{
  const header=document.querySelector(".site-header");
  const nav=document.querySelector(".nav");
  const toggle=document.querySelector(".menu-toggle");
  window.addEventListener("scroll",()=>{
  const sticky = window.scrollY > 35;
  header.classList.toggle("scrolled", sticky);
  document.documentElement.style.setProperty("--header-offset", sticky ? "96px" : "0px");
});

  // Desktop hover works through CSS. On touch/mobile, parent dropdowns open on click.
  document.querySelectorAll(".nav-item.has-dropdown > .nav-link").forEach(link=>{
    link.addEventListener("click",e=>{
      const item=link.parentElement;
      if(window.innerWidth<=980){
        e.preventDefault();
        document.querySelectorAll(".nav-item.has-dropdown.open").forEach(x=>{if(x!==item)x.classList.remove("open")});
        item.classList.toggle("open");
      }
    });
  });
  
  toggle?.addEventListener("click",()=>nav.classList.toggle("open"));
  document.addEventListener("click",e=>{
    if(window.innerWidth<=980 && nav.classList.contains("open") &&
       !nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove("open");
  });
  document.addEventListener("keydown",e=>{if(e.key==="Escape") nav.classList.remove("open")});
  document.querySelectorAll(".nav a:not(.has-dropdown .nav-link)").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

  const obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.1});
  document.querySelectorAll(".reveal").forEach(x=>obs.observe(x));
});
// Header behavior refinement: inner pages use a readable light header; homepage uses transparent hero header.
(function(){
  const header=document.querySelector('.site-header');
  const nav=document.querySelector('.nav');
  const toggle=document.querySelector('.menu-toggle');
  if(!header) return;
  const updateHeader=()=>header.classList.toggle('scrolled',window.scrollY>35);
  updateHeader();
  window.addEventListener('scroll',updateHeader,{passive:true});
  toggle?.addEventListener('click',()=>{
    const open=nav?.classList.toggle('open');
    toggle?.setAttribute('aria-expanded',open?'true':'false');
  });
  document.addEventListener('click',e=>{
    if(nav?.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)){
      nav.classList.remove('open'); toggle?.setAttribute('aria-expanded','false');
    }
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){nav?.classList.remove('open');toggle?.setAttribute('aria-expanded','false')}
  });
})();

// V4 header behavior: inner pages use a solid navy header for reliable contrast.
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav a[href]').forEach(a=>{
  const href=(a.getAttribute('href')||'').split('#')[0];
  if(href && href===currentPage) a.classList.add('current-page');
});
document.addEventListener('click',e=>{
  if(window.innerWidth<=980 && nav && nav.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) nav.classList.remove('open');
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav)nav.classList.remove('open')});

  document.addEventListener("click",e=>{
    if(window.innerWidth>980){
      document.querySelectorAll(".nav-item.has-dropdown.open").forEach(item=>{
        if(!item.contains(e.target)) item.classList.remove("open");
      });
    }
  });

document.addEventListener("DOMContentLoaded", function(){
  const megaMenus = document.querySelectorAll(".video-mega");

  megaMenus.forEach(function(mega){
    const rightColumn = mega.querySelector(":scope > .mega-right");
    const parents = mega.querySelectorAll(".mega-parent.has-submenu");

    if(!rightColumn || !parents.length) return;

    // Start with an empty child column. It is populated on hover.
    rightColumn.innerHTML = "";

    parents.forEach(function(parent){
      const source = parent.querySelector(":scope > .mega-submenu");
      if(!source) return;

      parent.addEventListener("mouseenter", function(){
        if(window.innerWidth <= 980) return;

        parents.forEach(function(item){
          item.classList.remove("active");
        });

        parent.classList.add("active");

        // Copy ONLY this parent's children into the third column.
        rightColumn.innerHTML = source.innerHTML;
        rightColumn.classList.add("has-content");
      });
    });

    mega.addEventListener("mouseleave", function(){
      parents.forEach(function(item){
        item.classList.remove("active");
      });
      rightColumn.innerHTML = "";
      rightColumn.classList.remove("has-content");
    });
  });
});


// V26 — Parent menu items with children are non-navigational.
document.addEventListener("DOMContentLoaded", function(){
  // Any top-level item with a mega menu opens the menu; it never navigates.
  document.querySelectorAll(".nav-item.has-dropdown > .nav-link").forEach(function(link){
    link.addEventListener("click", function(e){
      e.preventDefault();
      const item=link.parentElement;
      if(window.innerWidth <= 980){
        document.querySelectorAll(".nav-item.has-dropdown.open").forEach(function(other){
          if(other !== item){
            other.classList.remove("open");
            const otherLink=other.querySelector(":scope > .nav-link");
            if(otherLink) otherLink.setAttribute("aria-expanded","false");
          }
        });
        item.classList.toggle("open");
        link.setAttribute("aria-expanded", item.classList.contains("open") ? "true" : "false");
      }
    });
  });

  // Nested parents also only toggle their children on mobile; they never navigate.
  document.querySelectorAll(".mega-parent.has-submenu > a").forEach(function(link){
    link.addEventListener("click", function(e){
      e.preventDefault();
      const parent=link.parentElement;
      if(window.innerWidth <= 980){
        const mega=parent.closest(".video-mega");
        mega?.querySelectorAll(".mega-parent.has-submenu.open").forEach(function(other){
          if(other !== parent){
            other.classList.remove("open");
            const otherLink=other.querySelector(":scope > a");
            if(otherLink) otherLink.setAttribute("aria-expanded","false");
          }
        });
        parent.classList.toggle("open");
        link.setAttribute("aria-expanded", parent.classList.contains("open") ? "true" : "false");
      }
    });
  });
});
