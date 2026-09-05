(function(){
  const menuBtn=document.querySelector('.menu-button');
  const menu=document.querySelector('.mobile-menu');
  if(menuBtn&&menu){
    menuBtn.addEventListener('click',()=>menu.toggleAttribute('hidden'));
  }

  // Contact forms now submit directly to the configured HTTPS form endpoint.
  // Native browser validation handles fields marked required.
  document.querySelectorAll('form[data-direct-submit="true"]').forEach(form=>{
    form.addEventListener('submit',()=>{
      const button=form.querySelector('button[type="submit"]');
      if(button){
        button.disabled=true;
        button.setAttribute('aria-busy','true');
        button.textContent=document.documentElement.lang&&document.documentElement.lang.toLowerCase().startsWith('fr')
          ? 'Envoi…'
          : 'Sending…';
      }
    });
  });
})();
