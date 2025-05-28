import{a as v,S as b,i as n}from"./assets/vendor-CrlV4O_2.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))d(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&d(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function d(e){if(e.ep)return;e.ep=!0;const r=s(e);fetch(e.href,r)}})();const S="50419214-1ccabcfe8be519659cde54a70",R="https://pixabay.com/api/";async function u(t,o){return(await v.get(R,{params:{key:S,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:15}})).data}const f=document.querySelector(".gallery"),m=document.querySelector(".loader"),p=document.querySelector(".load-more"),q=new b(".gallery a");function h(t){const o=t.map(s=>`
    <li class="gallery-item">
      <a href="${s.largeImageURL}">
        <img src="${s.webformatURL}" alt="${s.tags}" />
      </a>
      <div class="info">
        <p>Likes: ${s.likes}</p>
        <p>Views: ${s.views}</p>
        <p>Comments: ${s.comments}</p>
        <p>Downloads: ${s.downloads}</p>
      </div>
    </li>
  `).join("");f.insertAdjacentHTML("beforeend",o),q.refresh()}function B(){f.innerHTML=""}function g(){m.classList.remove("is-hidden")}function y(){m.classList.add("is-hidden")}function L(){p.classList.remove("is-hidden")}function w(){p.classList.add("is-hidden")}let i=1,a="",l=0;const M=document.querySelector(".form"),P=document.querySelector(".load-more");M.addEventListener("submit",async t=>{if(t.preventDefault(),B(),w(),i=1,a=t.target.elements["search-text"].value.trim(),!!a){g();try{const o=await u(a,i);if(o.hits.length===0){n.error({message:"No images found",position:"topRight"});return}h(o.hits),l=Math.ceil(o.totalHits/15),i<l?L():n.info({message:"You've reached the end of search results.",position:"topRight"})}catch{n.error({message:"Something went wrong",position:"topRight"})}finally{y()}}});P.addEventListener("click",async()=>{i++,g(),w();try{const t=await u(a,i);h(t.hits),i>=l?n.info({message:"You've reached the end of search results.",position:"topRight"}):L(),$()}catch{n.error({message:"Failed to load more images",position:"topRight"})}finally{y()}});function $(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}
//# sourceMappingURL=index.js.map
