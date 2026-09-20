export async function GET(){
  const page=await fetch('https://pixabay.com/sound-effects/city-deep-church-bell-27297/',{headers:{'User-Agent':'Mozilla/5.0'}});
  const html=await page.text();
  const decoded=html.replaceAll('\\u0026','&').replaceAll('\\/','/');
  const matches=[...decoded.matchAll(/https:\/\/cdn\.pixabay\.com\/[^"'<>\\s]+\.mp3[^"'<>\\s]*/g)].map(m=>m[0]);
  const url=matches.find(u=>u.includes('deep-church-bell')||u.includes('27297'))||matches[0];
  if(!url)return new Response('Bell audio source unavailable',{status:502});
  const audio=await fetch(url);
  if(!audio.ok)return new Response('Bell audio fetch failed',{status:502});
  return new Response(audio.body,{headers:{'Content-Type':audio.headers.get('content-type')||'audio/mpeg','Cache-Control':'public, max-age=86400'}});
}
