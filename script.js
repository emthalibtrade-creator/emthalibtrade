document.addEventListener("DOMContentLoaded",function(){
  const menuToggle=document.getElementById("menuToggle"),mainNav=document.getElementById("mainNav");
  function closeMenu(){if(!menuToggle||!mainNav)return;mainNav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.setAttribute("aria-label","Open menu")}
  if(menuToggle&&mainNav){menuToggle.addEventListener("click",function(){const open=mainNav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.setAttribute("aria-label",open?"Close menu":"Open menu")});mainNav.querySelectorAll("a").forEach(a=>a.addEventListener("click",closeMenu));document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()})}
  const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
  const top=document.getElementById("backToTop");if(top){const update=()=>top.classList.toggle("visible",window.scrollY>500);window.addEventListener("scroll",update,{passive:true});update();top.addEventListener("click",()=>window.scrollTo({top:0,behavior:"smooth"}))}
  document.querySelectorAll(".enquire-btn").forEach(btn=>btn.addEventListener("click",function(){const subject=document.getElementById("subject");if(subject)subject.value=this.dataset.product||""}));
  const form=document.getElementById("contactForm"),status=document.getElementById("formStatus");if(!form)return;
  const fields={
    fullName:{el:document.getElementById("fullName"),valid:v=>v.trim().length>1,msg:"Please enter your full name."},
    email:{el:document.getElementById("email"),valid:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()),msg:"Please enter a valid email address."},
    phone:{el:document.getElementById("phone"),valid:v=>v.replace(/[^0-9+]/g,"").length>=7,msg:"Please enter a valid phone number."},
    subject:{el:document.getElementById("subject"),valid:v=>v.trim().length>2,msg:"Please specify a product or service."},
    message:{el:document.getElementById("message"),valid:v=>v.trim().length>5,msg:"Please enter a short message."}
  };
  function validate(k){const f=fields[k],ok=f.valid(f.el.value),row=f.el.closest(".form-row"),err=document.getElementById("err-"+k);row.classList.toggle("invalid",!ok);if(err)err.textContent=ok?"":f.msg;f.el.setAttribute("aria-invalid",ok?"false":"true");return ok}
  Object.keys(fields).forEach(k=>{fields[k].el.addEventListener("blur",()=>validate(k));fields[k].el.addEventListener("input",()=>{if(fields[k].el.closest(".form-row").classList.contains("invalid"))validate(k)})});
  form.addEventListener("submit",function(e){e.preventDefault();const ok=Object.keys(fields).every(validate);if(!ok){if(status){status.textContent="Please fix the highlighted fields and try again.";status.classList.add("error")}return}
    const name=fields.fullName.el.value.trim(),email=fields.email.el.value.trim(),phone=fields.phone.el.value.trim(),subject=fields.subject.el.value.trim(),message=fields.message.el.value.trim();
    const text=`Hello Emthalib Agro Allied,\n\nI would like to make an enquiry.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProduct / Service: ${subject}\nMessage: ${message}`;
    if(status){status.classList.remove("error");status.textContent="Opening WhatsApp…"} window.open("https://wa.me/2348133339191?text="+encodeURIComponent(text),"_blank","noopener");
  });
});