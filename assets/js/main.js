document.addEventListener('DOMContentLoaded',function(){
  // set year
  const y=document.getElementById('year'); if(y) y.textContent=new Date().getFullYear();

  // mobile nav toggle
  const navToggle=document.getElementById('nav-toggle');
  const mainNav=document.getElementById('main-nav');
  if(navToggle && mainNav){
    navToggle.addEventListener('click',()=>{mainNav.classList.toggle('show')});
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
