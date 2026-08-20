
(function(){
  const menuBtn=document.querySelector('.menu-button');
  const menu=document.querySelector('.mobile-menu');
  if(menuBtn&&menu){menuBtn.addEventListener('click',()=>menu.toggleAttribute('hidden'));}
  document.querySelectorAll('.mailto-form').forEach(form=>{
    form.addEventListener('submit',function(e){
      e.preventDefault();
      const data=new FormData(form);
      const kind=data.get('form_type')||'Website enquiry';
      const city=data.get('city')||'';
      const subject=encodeURIComponent(kind+(city?' - '+city:''));
      const parts=[];
      for(const [key,val] of data.entries()){
        if(key==='form_type') continue;
        if(String(val).trim()) parts.push(key.replaceAll('_',' ').replace(/\b\w/g,c=>c.toUpperCase())+': '+val);
      }
      location.href='mailto:info@cperecycling.ca?subject='+subject+'&body='+encodeURIComponent(parts.join('\n'));
    });
  });
})();
