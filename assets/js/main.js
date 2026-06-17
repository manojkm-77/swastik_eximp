document.addEventListener('DOMContentLoaded',function(){
  // set year
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  // mobile nav toggle
  const navToggle=document.getElementById('nav-toggle');
  const mainNav=document.getElementById('main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click',()=>{mainNav.classList.toggle('show')});
  }

  // Active nav link highlighting on scroll
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = Array.from(navLinks).map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  function onScroll(){
    const y = window.scrollY + 120;
    sections.forEach((sec, idx) => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if(y >= top && y < bottom){ navLinks[idx].classList.add('active') } else { navLinks[idx].classList.remove('active') }
    });
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Intersection Observer for reveal animations
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if(e.isIntersecting){ e.target.classList.add('revealed'); io.unobserve(e.target) } });
  }, {threshold: 0.12});
  reveals.forEach(r=>io.observe(r));

  // Product inquiry modal + prefill
  const inquireBtns = document.querySelectorAll('.inquire');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalClose = document.getElementById('modal-close');
  const modalBody = document.getElementById('modal-body');
  const productField = document.getElementById('product-field');
  function openModal(product){
    modalBody.innerHTML = document.getElementById('contact-form').outerHTML;
    modalBackdrop.style.display = 'flex';
    modalBackdrop.setAttribute('aria-hidden','false');
    // prefill product in original form and modal form
    if(productField) productField.value = product;
  }
  function closeModal(){ modalBackdrop.style.display='none'; modalBackdrop.setAttribute('aria-hidden','true'); }
  inquireBtns.forEach(b=>b.addEventListener('click', e=>{ const card = e.target.closest('.card'); const p = card && card.dataset.product; openModal(p||''); }));
  if(modalClose) modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', function(e){ if(e.target===modalBackdrop) closeModal(); });

  // Cookie banner
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('accept-cookies');
  if(!localStorage.getItem('swastik_cookies')){ cookieBanner.style.display='flex'; }
  if(acceptBtn){ acceptBtn.addEventListener('click', ()=>{ localStorage.setItem('swastik_cookies','1'); cookieBanner.style.display='none'; }); }

  // Form client-side validation and submission
  const form=document.getElementById('contact-form');
  const msg=document.getElementById('form-msg');
  if(form){
    form.addEventListener('submit',function(e){
      const endpoint=form.dataset.endpoint && form.dataset.endpoint.trim();
      // client-side validation
      let valid=true;
      const name = form.querySelector('[name="name"]');
      const email = form.querySelector('[name="email"]');
      form.querySelectorAll('.field-error').forEach(el=>el.textContent='');
      if(!name.value.trim()){ form.querySelector('[data-for="name"]').textContent='Name is required'; valid=false; }
      if(!email.value.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.value)){ form.querySelector('[data-for="email"]').textContent='Valid email required'; valid=false; }
      if(!valid){ e.preventDefault(); return; }

      if(endpoint){
        e.preventDefault();
        const fdata=new FormData(form);
        fetch(endpoint, {method:'POST', body: fdata})
          .then(r=>{
            if(r.ok){ msg.textContent='Thanks — your inquiry has been received. We will respond soon.'; form.reset(); }
            else { msg.textContent='Submission failed. Please try again or email us directly.'; }
          })
          .catch(()=>{ msg.textContent='Submission failed. Please try again later.' });
      } else {
        if(form.dataset.netlify!=='true'){
          e.preventDefault();
          msg.textContent='Form not configured: set `data-endpoint` or enable Netlify Forms.';
        }
      }
    });
  }

  // contact form handling: if `data-endpoint` is provided on the form, POST there.
  const form=document.getElementById('contact-form');
  const msg=document.getElementById('form-msg');
  if(form){
    form.addEventListener('submit',function(e){
      const endpoint=form.dataset.endpoint && form.dataset.endpoint.trim();
      // If endpoint provided, handle via fetch
      if(endpoint){
        e.preventDefault();
        const fdata=new FormData(form);
        const name=fdata.get('name')||''; const email=fdata.get('email')||'';
        if(!name || !email){ msg.textContent='Please provide name and email.'; return; }
        fetch(endpoint, {method:'POST', body: fdata})
          .then(r=>{
            if(r.ok){ msg.textContent='Thanks — your inquiry has been received. We will respond soon.'; form.reset(); }
            else { msg.textContent='Submission failed. Please try again or email us directly.'; }
          })
          .catch(()=>{ msg.textContent='Submission failed. Please try again later.' });
      } else {
        // No endpoint: if Netlify forms is enabled via data-netlify attribute, allow normal submit
        // Otherwise prevent default and show message to configure an endpoint
        if(form.dataset.netlify!=='true'){
          e.preventDefault();
          msg.textContent='Form not configured: set `data-endpoint` or enable Netlify Forms.';
        }
      }
    });
  }
});
