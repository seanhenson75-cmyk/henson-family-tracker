export async function GET(){
  const url='https://cdn.pixabay.com/download/audio/2022/03/15/audio_27297.mp3';
  try{
    const audio=await fetch(url,{redirect:'follow',headers:{'User-Agent':'Mozilla/5.0','Accept':'audio/mpeg,audio/*;q=0.9,*/*;q=0.8'}});
    if(audio.ok){
      return new Response(audio.body,{headers:{'Content-Type':'audio/mpeg','Cache-Control':'public, max-age=86400'}})
    }
  }catch{}
  return new Response('Bell audio source unavailable',{status:502})
}
