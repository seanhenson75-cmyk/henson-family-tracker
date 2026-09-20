export async function GET(){
  const sources=[
    'https://pixabay.com/sound-effects/download/deep-church-bell-27297/',
    'https://pixabay.com/sound-effects/download/city-deep-church-bell-27297/'
  ];
  for(const url of sources){
    try{
      const audio=await fetch(url,{redirect:'follow',headers:{'User-Agent':'Mozilla/5.0','Accept':'audio/mpeg,audio/*;q=0.9,*/*;q=0.8','Referer':'https://pixabay.com/sound-effects/city-deep-church-bell-27297/'}});
      const type=audio.headers.get('content-type')||'';
      if(audio.ok&&(type.includes('audio')||type.includes('octet-stream'))){
        return new Response(audio.body,{headers:{'Content-Type':type||'audio/mpeg','Cache-Control':'public, max-age=86400'}})
      }
    }catch{}
  }
  return new Response('Bell audio source unavailable',{status:502})
}
