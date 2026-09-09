import{g as x,E as h,I as _,J as v,c as y,a as n,t as w,d as b,q as k,K as f,o as F}from"./g1Sunx13.js";import{f as L}from"./BLlz9LVz.js";import{_ as z}from"./DlAUqK2U.js";const B={class:"map-wrapper"},I={class:"map-overlay-badge"},M=x({__name:"InteractiveMap",props:{properties:{},centerLat:{},centerLng:{},zoom:{}},setup(p){const i=p,d=k(null);let o=null,r=null;const u=async()=>{if(typeof window>"u"||!d.value)return;const a=(await f(async()=>{const{default:c}=await import("./Byf149Wh.js").then(l=>l.l);return{default:c}},[],import.meta.url)).default,e=i.centerLat||23.7925,t=i.centerLng||90.4167,s=i.zoom||11;o=a.map(d.value,{center:[e,t],zoom:s,scrollWheelZoom:!1}),a.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"&copy; OpenStreetMap contributors"}).addTo(o),r=a.layerGroup().addTo(o),m(a)},m=a=>{if(!r||!o)return;r.clearLayers();const e=[];if(i.properties.forEach(t=>{if(t.lat&&t.lng){e.push([t.lat,t.lng]);const s=L(t.price),c=a.divIcon({className:"custom-leaflet-marker",html:`
          <div style="
            background: #0A1128;
            color: #FFFFFF;
            padding: 5px 10px;
            border-radius: 20px;
            border: 2px solid #D4AF37;
            font-size: 11px;
            font-weight: 800;
            white-space: nowrap;
            box-shadow: 0 4px 14px rgba(0,0,0,0.4);
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 4px;
            transform: translate(-50%, -50%);
          ">
            <span style="width:6px; height:6px; border-radius:50%; background:#10B981;"></span>
            ${s}
          </div>
        `,iconSize:[80,30],iconAnchor:[40,15]}),l=a.marker([t.lat,t.lng],{icon:c}),g=`
        <div style="width: 220px; font-family: 'Plus Jakarta Sans', sans-serif;">
          <img src="${t.images[0]}" style="width: 100%; height: 110px; object-fit: cover; border-radius: 8px; margin-bottom: 8px;" />
          <div style="font-weight: 700; font-size: 13px; color: #0F172A; line-height: 1.3; margin-bottom: 4px;">${t.title}</div>
          <div style="font-size: 11px; color: #64748B; margin-bottom: 6px;">${t.areaName}, ${t.city}</div>
          <div style="font-size: 14px; font-weight: 800; color: #059669; margin-bottom: 8px;">${s}</div>
          <a href="/properties/${t.id}" style="
            display: block;
            text-align: center;
            background: #0A1128;
            color: #FFFFFF;
            padding: 6px 12px;
            border-radius: 6px;
            font-size: 11px;
            font-weight: 700;
            text-decoration: none;
          ">View Details</a>
        </div>
      `;l.bindPopup(g),l.addTo(r)}}),e.length>1&&o)try{o.fitBounds(e,{padding:[40,40],maxZoom:14})}catch{}};return h(()=>{u()}),_(()=>i.properties,async()=>{if(typeof window<"u"){const a=(await f(async()=>{const{default:e}=await import("./Byf149Wh.js").then(t=>t.l);return{default:e}},[],import.meta.url)).default;m(a)}},{deep:!0}),v(()=>{o&&o.remove()}),(a,e)=>(F(),y("div",B,[n("div",{ref_key:"mapContainer",ref:d,class:"leaflet-map-container"},null,512),n("div",I,[e[1]||(e[1]=n("svg",{width:"16",height:"16",viewBox:"0 0 24 24",fill:"none",stroke:"#10B981","stroke-width":"2.5"},[n("path",{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"}),n("circle",{cx:"12",cy:"10",r:"3"})],-1)),n("span",null,[n("strong",null,w(p.properties.length),1),e[0]||(e[0]=b(" Geo-Verified Listings on Live Map",-1))])])]))}}),$=z(M,[["__scopeId","data-v-665dc52a"]]);export{$ as I};
