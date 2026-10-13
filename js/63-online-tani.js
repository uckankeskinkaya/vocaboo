// v43: Online bağlantı tanısı. Oda kanalı kurulamazsa (CHANNEL_ERROR / TIMED_OUT) ve online ekrandan hata mesajıyla çıkılırsa
// kısa bir kayıt sunucuya gider (izGonder -> log_error, tekrarlar elenir). Yönetici panelindeki "Hata günlüğü"nde görünür.
(function(){
if(typeof oKanal!=='function'||typeof oExit!=='function'||typeof izGonder!=='function')return;
const _k=oKanal;
oKanal=function(code,ozel){
  const sc=sb&&sb.channel;
  if(typeof sc!=='function')return _k.apply(this,arguments);
  sb.channel=function(){
    const c=sc.apply(this,arguments),s0=c&&c.subscribe;
    if(typeof s0==='function')c.subscribe=function(cb){
      const a=Array.prototype.slice.call(arguments);
      a[0]=function(st,err){
        if(st==='CHANNEL_ERROR'||st==='TIMED_OUT')izGonder('oda kanalı '+st+' ('+(ozel?'özel':'açık')+') '+String((err&&(err.message||err))||'').slice(0,120),'oda');
        return typeof cb==='function'?cb.apply(this,arguments):undefined;
      };
      return s0.apply(this,a);
    };
    return c;
  };
  try{return _k.apply(this,arguments)}finally{sb.channel=sc}
};
const _e=oExit;
oExit=function(msg){
  if(msg)izGonder('online çıkış: '+msg,'oda');
  return _e.apply(this,arguments);
};
})();
