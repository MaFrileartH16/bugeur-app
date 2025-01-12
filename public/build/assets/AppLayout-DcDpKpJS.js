import{c as S,j as c,R as dt,w as ut,M as pt,G as nt,N as mt,P as ft,E as yt,x as gt,Q as vt,f as O,u as h,a as w,B as b,k as N,r as E,m as j,o as k,l as X,p as et,U as rt,S as st,q as bt,T as K,V as ht}from"./app-CwXZ0I_k.js";function Xt(t=null){const n=S.createContext(t);return[({children:r,value:s})=>c.jsx(n.Provider,{value:s,children:r}),()=>S.useContext(n)]}const xt=dt.useId||(()=>{});function St(){const t=xt();return t?`mantine-${t.replace(/:/g,"")}`:""}function Dt(t){const n=St(),[o,e]=S.useState(n);return ut(()=>{e(pt())},[]),typeof t=="string"?t:typeof window>"u"?n:o}function Ut({value:t,defaultValue:n,finalValue:o,onChange:e=()=>{}}){const[r,s]=S.useState(n!==void 0?n:o),i=(a,...l)=>{s(a),e==null||e(a,...l)};return t!==void 0?[t,e,!0]:[r,i,!1]}function Et({classNames:t,styles:n,props:o,stylesCtx:e}){const r=nt();return{resolvedClassNames:mt({theme:r,classNames:t,props:o,stylesCtx:e||void 0}),resolvedStyles:ft({theme:r,styles:n,props:o,stylesCtx:e||void 0})}}const Y=t=>({in:{opacity:1,transform:"scale(1)"},out:{opacity:0,transform:`scale(.9) translateY(${t==="bottom"?10:-10}px)`},transitionProperty:"transform, opacity"}),F={fade:{in:{opacity:1},out:{opacity:0},transitionProperty:"opacity"},"fade-up":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:"translateY(30px)"},transitionProperty:"opacity, transform"},"fade-down":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:"translateY(-30px)"},transitionProperty:"opacity, transform"},"fade-left":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(30px)"},transitionProperty:"opacity, transform"},"fade-right":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(-30px)"},transitionProperty:"opacity, transform"},scale:{in:{opacity:1,transform:"scale(1)"},out:{opacity:0,transform:"scale(0)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"scale-y":{in:{opacity:1,transform:"scaleY(1)"},out:{opacity:0,transform:"scaleY(0)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"scale-x":{in:{opacity:1,transform:"scaleX(1)"},out:{opacity:0,transform:"scaleX(0)"},common:{transformOrigin:"left"},transitionProperty:"transform, opacity"},"skew-up":{in:{opacity:1,transform:"translateY(0) skew(0deg, 0deg)"},out:{opacity:0,transform:"translateY(-20px) skew(-10deg, -5deg)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"skew-down":{in:{opacity:1,transform:"translateY(0) skew(0deg, 0deg)"},out:{opacity:0,transform:"translateY(20px) skew(-10deg, -5deg)"},common:{transformOrigin:"bottom"},transitionProperty:"transform, opacity"},"rotate-left":{in:{opacity:1,transform:"translateY(0) rotate(0deg)"},out:{opacity:0,transform:"translateY(20px) rotate(-5deg)"},common:{transformOrigin:"bottom"},transitionProperty:"transform, opacity"},"rotate-right":{in:{opacity:1,transform:"translateY(0) rotate(0deg)"},out:{opacity:0,transform:"translateY(20px) rotate(5deg)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"slide-down":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:"translateY(-100%)"},common:{transformOrigin:"top"},transitionProperty:"transform, opacity"},"slide-up":{in:{opacity:1,transform:"translateY(0)"},out:{opacity:0,transform:"translateY(100%)"},common:{transformOrigin:"bottom"},transitionProperty:"transform, opacity"},"slide-left":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(100%)"},common:{transformOrigin:"left"},transitionProperty:"transform, opacity"},"slide-right":{in:{opacity:1,transform:"translateX(0)"},out:{opacity:0,transform:"translateX(-100%)"},common:{transformOrigin:"right"},transitionProperty:"transform, opacity"},pop:{...Y("bottom"),common:{transformOrigin:"center center"}},"pop-bottom-left":{...Y("bottom"),common:{transformOrigin:"bottom left"}},"pop-bottom-right":{...Y("bottom"),common:{transformOrigin:"bottom right"}},"pop-top-left":{...Y("top"),common:{transformOrigin:"top left"}},"pop-top-right":{...Y("top"),common:{transformOrigin:"top right"}}},Z={entering:"in",entered:"in",exiting:"out",exited:"out","pre-exiting":"out","pre-entering":"out"};function Pt({transition:t,state:n,duration:o,timingFunction:e}){const r={transitionDuration:`${o}ms`,transitionTimingFunction:e};return typeof t=="string"?t in F?{transitionProperty:F[t].transitionProperty,...r,...F[t].common,...F[t][Z[n]]}:{}:{transitionProperty:t.transitionProperty,...r,...t.common,...t[Z[n]]}}function Rt({duration:t,exitDuration:n,timingFunction:o,mounted:e,onEnter:r,onExit:s,onEntered:i,onExited:a,enterDelay:l,exitDelay:d}){const m=nt(),f=yt(),p=m.respectReducedMotion?f:!1,[y,u]=S.useState(p?0:t),[A,C]=S.useState(e?"entered":"exited"),G=S.useRef(-1),R=S.useRef(-1),P=S.useRef(-1),I=g=>{const x=g?r:s,v=g?i:a;window.clearTimeout(G.current);const B=p?0:g?t:n;u(B),B===0?(typeof x=="function"&&x(),typeof v=="function"&&v(),C(g?"entered":"exited")):P.current=requestAnimationFrame(()=>{vt.flushSync(()=>{C(g?"pre-entering":"pre-exiting")}),P.current=requestAnimationFrame(()=>{typeof x=="function"&&x(),C(g?"entering":"exiting"),G.current=window.setTimeout(()=>{typeof v=="function"&&v(),C(g?"entered":"exited")},B)})})},_=g=>{if(window.clearTimeout(R.current),typeof(g?l:d)!="number"){I(g);return}R.current=window.setTimeout(()=>{I(g)},g?l:d)};return gt(()=>{_(e)},[e]),S.useEffect(()=>()=>{window.clearTimeout(G.current),cancelAnimationFrame(P.current)},[]),{transitionDuration:y,transitionStatus:A,transitionTimingFunction:o||"ease"}}function W({keepMounted:t,transition:n="fade",duration:o=250,exitDuration:e=o,mounted:r,children:s,timingFunction:i="ease",onExit:a,onEntered:l,onEnter:d,onExited:m,enterDelay:f,exitDelay:p}){const{transitionDuration:y,transitionStatus:u,transitionTimingFunction:A}=Rt({mounted:r,exitDuration:e,duration:o,timingFunction:i,onExit:a,onEntered:l,onEnter:d,onExited:m,enterDelay:f,exitDelay:p});return y===0?r?c.jsx(c.Fragment,{children:s({})}):t?s({display:"none"}):null:u==="exited"?t?s({display:"none"}):null:c.jsx(c.Fragment,{children:s(Pt({transition:n,duration:y,state:u,timingFunction:A}))})}W.displayName="@mantine/core/Transition";var T={root:"m_8d3f4000",icon:"m_8d3afb97",loader:"m_302b9fb1",group:"m_1a0f1b21",groupSection:"m_437b6484"};const M={orientation:"horizontal"},jt=N((t,{borderWidth:n})=>({group:{"--ai-border-width":E(n)}})),q=O((t,n)=>{const o=h("ActionIconGroup",M,t),{className:e,style:r,classNames:s,styles:i,unstyled:a,orientation:l,vars:d,borderWidth:m,variant:f,mod:p,...y}=h("ActionIconGroup",M,t),u=w({name:"ActionIconGroup",props:o,classes:T,className:e,style:r,classNames:s,styles:i,unstyled:a,vars:d,varsResolver:jt,rootSelector:"group"});return c.jsx(b,{...u("group"),ref:n,variant:f,mod:[{"data-orientation":l},p],role:"group",...y})});q.classes=T;q.displayName="@mantine/core/ActionIconGroup";const z={},wt=N((t,{radius:n,color:o,gradient:e,variant:r,autoContrast:s,size:i})=>{const a=t.variantColorResolver({color:o||t.primaryColor,theme:t,gradient:e,variant:r||"filled",autoContrast:s});return{groupSection:{"--section-height":j(i,"section-height"),"--section-padding-x":j(i,"section-padding-x"),"--section-fz":k(i),"--section-radius":n===void 0?void 0:X(n),"--section-bg":o||r?a.background:void 0,"--section-color":a.color,"--section-bd":o||r?a.border:void 0}}}),L=O((t,n)=>{const o=h("ActionIconGroupSection",z,t),{className:e,style:r,classNames:s,styles:i,unstyled:a,vars:l,variant:d,gradient:m,radius:f,autoContrast:p,...y}=h("ActionIconGroupSection",z,t),u=w({name:"ActionIconGroupSection",props:o,classes:T,className:e,style:r,classNames:s,styles:i,unstyled:a,vars:l,varsResolver:wt,rootSelector:"groupSection"});return c.jsx(b,{...u("groupSection"),ref:n,variant:d,...y})});L.classes=T;L.displayName="@mantine/core/ActionIconGroupSection";const Nt={},Ct=N((t,{size:n,radius:o,variant:e,gradient:r,color:s,autoContrast:i})=>{const a=t.variantColorResolver({color:s||t.primaryColor,theme:t,gradient:r,variant:e||"filled",autoContrast:i});return{root:{"--ai-size":j(n,"ai-size"),"--ai-radius":o===void 0?void 0:X(o),"--ai-bg":s||e?a.background:void 0,"--ai-hover":s||e?a.hover:void 0,"--ai-hover-color":s||e?a.hoverColor:void 0,"--ai-color":a.color,"--ai-bd":s||e?a.border:void 0}}}),D=et((t,n)=>{const o=h("ActionIcon",Nt,t),{className:e,unstyled:r,variant:s,classNames:i,styles:a,style:l,loading:d,loaderProps:m,size:f,color:p,radius:y,__staticSelector:u,gradient:A,vars:C,children:G,disabled:R,"data-disabled":P,autoContrast:I,mod:_,...g}=o,x=w({name:["ActionIcon",u],props:o,className:e,style:l,classes:T,classNames:i,styles:a,unstyled:r,vars:C,varsResolver:Ct});return c.jsxs(rt,{...x("root",{active:!R&&!d&&!P}),...g,unstyled:r,variant:s,size:f,disabled:R||d,ref:n,mod:[{loading:d,disabled:R||P},_],children:[c.jsx(W,{mounted:!!d,transition:"slide-down",duration:150,children:v=>c.jsx(b,{component:"span",...x("loader",{style:v}),"aria-hidden":!0,children:c.jsx(st,{color:"var(--ai-color)",size:"calc(var(--ai-size) * 0.55)",...m})})}),c.jsx(b,{component:"span",mod:{loading:d},...x("icon"),children:G})]})});D.classes=T;D.displayName="@mantine/core/ActionIcon";D.Group=q;D.GroupSection=L;var $={root:"m_77c9d27d",inner:"m_80f1301b",label:"m_811560b9",section:"m_a74036a",loader:"m_a25b86ee",group:"m_80d6d844",groupSection:"m_70be2a01"};const tt={orientation:"horizontal"},Gt=N((t,{borderWidth:n})=>({group:{"--button-border-width":E(n)}})),V=O((t,n)=>{const o=h("ButtonGroup",tt,t),{className:e,style:r,classNames:s,styles:i,unstyled:a,orientation:l,vars:d,borderWidth:m,variant:f,mod:p,...y}=h("ButtonGroup",tt,t),u=w({name:"ButtonGroup",props:o,classes:$,className:e,style:r,classNames:s,styles:i,unstyled:a,vars:d,varsResolver:Gt,rootSelector:"group"});return c.jsx(b,{...u("group"),ref:n,variant:f,mod:[{"data-orientation":l},p],role:"group",...y})});V.classes=$;V.displayName="@mantine/core/ButtonGroup";const ot={},At=N((t,{radius:n,color:o,gradient:e,variant:r,autoContrast:s,size:i})=>{const a=t.variantColorResolver({color:o||t.primaryColor,theme:t,gradient:e,variant:r||"filled",autoContrast:s});return{groupSection:{"--section-height":j(i,"section-height"),"--section-padding-x":j(i,"section-padding-x"),"--section-fz":i!=null&&i.includes("compact")?k(i.replace("compact-","")):k(i),"--section-radius":n===void 0?void 0:X(n),"--section-bg":o||r?a.background:void 0,"--section-color":a.color,"--section-bd":o||r?a.border:void 0}}}),H=O((t,n)=>{const o=h("ButtonGroupSection",ot,t),{className:e,style:r,classNames:s,styles:i,unstyled:a,vars:l,variant:d,gradient:m,radius:f,autoContrast:p,...y}=h("ButtonGroupSection",ot,t),u=w({name:"ButtonGroupSection",props:o,classes:$,className:e,style:r,classNames:s,styles:i,unstyled:a,vars:l,varsResolver:At,rootSelector:"groupSection"});return c.jsx(b,{...u("groupSection"),ref:n,variant:d,...y})});H.classes=$;H.displayName="@mantine/core/ButtonGroupSection";const It={in:{opacity:1,transform:`translate(-50%, calc(-50% + ${E(1)}))`},out:{opacity:0,transform:"translate(-50%, -200%)"},common:{transformOrigin:"center"},transitionProperty:"transform, opacity"},Ot={},Tt=N((t,{radius:n,color:o,gradient:e,variant:r,size:s,justify:i,autoContrast:a})=>{const l=t.variantColorResolver({color:o||t.primaryColor,theme:t,gradient:e,variant:r||"filled",autoContrast:a});return{root:{"--button-justify":i,"--button-height":j(s,"button-height"),"--button-padding-x":j(s,"button-padding-x"),"--button-fz":s!=null&&s.includes("compact")?k(s.replace("compact-","")):k(s),"--button-radius":n===void 0?void 0:X(n),"--button-bg":o||r?l.background:void 0,"--button-hover":o||r?l.hover:void 0,"--button-color":l.color,"--button-bd":o||r?l.border:void 0,"--button-hover-color":o||r?l.hoverColor:void 0}}}),U=et((t,n)=>{const o=h("Button",Ot,t),{style:e,vars:r,className:s,color:i,disabled:a,children:l,leftSection:d,rightSection:m,fullWidth:f,variant:p,radius:y,loading:u,loaderProps:A,gradient:C,classNames:G,styles:R,unstyled:P,"data-disabled":I,autoContrast:_,mod:g,...x}=o,v=w({name:"Button",props:o,classes:$,className:s,style:e,classNames:G,styles:R,unstyled:P,vars:r,varsResolver:Tt}),B=!!d,ct=!!m;return c.jsxs(rt,{ref:n,...v("root",{active:!a&&!u&&!I}),unstyled:P,variant:p,disabled:a||u,mod:[{disabled:a||I,loading:u,block:f,"with-left-section":B,"with-right-section":ct},g],...x,children:[c.jsx(W,{mounted:!!u,transition:It,duration:150,children:lt=>c.jsx(b,{component:"span",...v("loader",{style:lt}),"aria-hidden":!0,children:c.jsx(st,{color:"var(--button-color)",size:"calc(var(--button-height) / 1.8)",...A})})}),c.jsxs("span",{...v("inner"),children:[d&&c.jsx(b,{component:"span",...v("section"),mod:{position:"left"},children:d}),c.jsx(b,{component:"span",mod:{loading:u},...v("label"),children:l}),m&&c.jsx(b,{component:"span",...v("section"),mod:{position:"right"},children:m})]})]})});U.classes=$;U.displayName="@mantine/core/Button";U.Group=V;U.GroupSection=H;var at={root:"m_7485cace"};const $t={},Bt=N((t,{size:n,fluid:o})=>({root:{"--container-size":o?void 0:j(n,"container-size")}})),Q=O((t,n)=>{const o=h("Container",$t,t),{classNames:e,className:r,style:s,styles:i,unstyled:a,vars:l,fluid:d,mod:m,...f}=o,p=w({name:"Container",classes:at,props:o,className:r,style:s,classNames:e,styles:i,unstyled:a,vars:l,varsResolver:Bt});return c.jsx(b,{ref:n,mod:[{fluid:d},m],...p("root"),...f})});Q.classes=at;Q.displayName="@mantine/core/Container";var it={root:"m_6d731127"};const Yt={gap:"md",align:"stretch",justify:"flex-start"},kt=N((t,{gap:n,align:o,justify:e})=>({root:{"--stack-gap":bt(n),"--stack-align":o,"--stack-justify":e}})),J=O((t,n)=>{const o=h("Stack",Yt,t),{classNames:e,className:r,style:s,styles:i,unstyled:a,vars:l,align:d,justify:m,gap:f,variant:p,...y}=o,u=w({name:"Stack",props:o,classes:it,className:r,style:s,classNames:e,styles:i,unstyled:a,vars:l,varsResolver:kt});return c.jsx(b,{ref:n,...u("root"),variant:p,...y})});J.classes=it;J.displayName="@mantine/core/Stack";const _t=()=>c.jsxs(Q,{py:16,children:["© ",new Date().getFullYear()," Bugeur by Muhammad Fauzul Hanif. All rights reserved."]}),Wt=t=>(S.useEffect(()=>{t.notification&&K.show({withBorder:!0,title:t.notification.title,message:t.notification.message,color:t.notification.status==="success"?"green":"red"}),K.cleanQueue()},[t.notification]),c.jsxs(c.Fragment,{children:[c.jsx(ht,{title:t.title}),c.jsxs(J,{gap:0,mih:"100vh",children:[t.children,c.jsx(_t,{})]})]}));export{Wt as A,U as B,Q as C,J as S,W as T,Ut as a,D as b,Xt as c,Dt as d,Et as u};