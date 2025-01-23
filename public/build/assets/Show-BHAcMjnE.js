import{r as O,a1 as oe,a2 as se,a3 as re,f as D,u as S,d as ie,a4 as ae,j as e,B as g,h as Q,U as ce,V as le,s as de,a as ue,a5 as he,e as me,F as ge,l as pe,o as $,X as fe,G as xe,J as ye,c as je}from"./app-D3R6lm7F.js";import{P as ve}from"./PageHeadings-psyFkYvz.js";import{g as Ce,f as Ae,A as be,C as we,S as W,T as R,D as B,B as Se,e as Ie}from"./AppLayout-B3HIGmJ6.js";import{T as b}from"./Text-BxAYQD4o.js";import{S as Pe,C as G,I as K}from"./IconPlus-D7DYjHcm.js";import{A as q}from"./AccordionChevron-C1HqtNCn.js";function L(o,n){return s=>{if(typeof s!="string"||s.trim().length===0)throw new Error(n);return`${o}-${s}`}}function _e(o){if(!o||typeof o=="string")return 0;const n=o/36;return Math.round((4+15*n**.25+n/5)*10)}function M(o){return o!=null&&o.current?o.current.scrollHeight:"auto"}const w=typeof window<"u"&&window.requestAnimationFrame;function $e({transitionDuration:o,transitionTimingFunction:n="ease",onTransitionEnd:s=()=>{},opened:a}){const u=O.useRef(null),t=0,l={display:"none",height:0,overflow:"hidden"},[m,p]=O.useState(a?{}:l),d=c=>{re.flushSync(()=>p(c))},i=c=>{d(h=>({...h,...c}))};function y(c){const h=o||_e(c);return{transition:`height ${h}ms ${n}, opacity ${h}ms ${n}`}}oe(()=>{typeof w=="function"&&w(a?()=>{i({willChange:"height",display:"block",overflow:"hidden"}),w(()=>{const c=M(u);i({...y(c),height:c})})}:()=>{const c=M(u);i({...y(c),willChange:"height",height:c}),w(()=>i({height:t,overflow:"hidden"}))})},[a]);const C=c=>{if(!(c.target!==u.current||c.propertyName!=="height"))if(a){const h=M(u);h===m.height?d({}):i({height:h}),s()}else m.height===t&&(d(l),s())};function x({style:c={},refKey:h="ref",...r}={}){const A=r[h];return{"aria-hidden":!a,...r,[h]:se(u,A),onTransitionEnd:C,style:{boxSizing:"border-box",...c,...m}}}return x}const Re={transitionDuration:200,transitionTimingFunction:"ease",animateOpacity:!0},J=D((o,n)=>{const{children:s,in:a,transitionDuration:u,transitionTimingFunction:t,style:l,onTransitionEnd:m,animateOpacity:p,...d}=S("Collapse",Re,o),i=ie(),y=ae(),x=(i.respectReducedMotion?y:!1)?0:u,c=$e({opened:a,transitionDuration:x,transitionTimingFunction:t,onTransitionEnd:m});return x===0?a?e.jsx(g,{...d,children:s}):null:e.jsx(g,{...c({style:{opacity:a||!p?1:0,transition:p?`opacity ${x}ms ${t}`:"none",...Ce(l,i)},ref:n,...d}),children:s})});J.displayName="@mantine/core/Collapse";const[De,k]=Q("Accordion component was not found in the tree"),[Ne,X]=Q("Accordion.Item component was not found in the tree");var I={root:"m_9bdbb667",panel:"m_df78851f",content:"m_4ba554d4",itemTitle:"m_8fa820a0",control:"m_4ba585b8","control--default":"m_6939a5e9","control--contained":"m_4271d21b",label:"m_df3ffa0f",chevron:"m_3f35ae96",icon:"m_9bd771fe",item:"m_9bd7b098","item--default":"m_fe19b709","item--contained":"m_1f921b3b","item--filled":"m_2cdf939a","item--separated":"m_9f59b069"};const Te={},E=D((o,n)=>{const{classNames:s,className:a,style:u,styles:t,vars:l,chevron:m,icon:p,onClick:d,onKeyDown:i,children:y,disabled:C,mod:x,...c}=S("AccordionControl",Te,o),{value:h}=X(),r=k(),A=r.isItemActive(h),U=typeof r.order=="number",N=`h${r.order}`,P=e.jsxs(ce,{...c,...r.getStyles("control",{className:a,classNames:s,style:u,styles:t,variant:r.variant}),unstyled:r.unstyled,mod:["accordion-control",{active:A,"chevron-position":r.chevronPosition,disabled:C},x],ref:n,onClick:_=>{d==null||d(_),r.onChange(h)},type:"button",disabled:C,"aria-expanded":A,"aria-controls":r.getRegionId(h),id:r.getControlId(h),onKeyDown:Ae({siblingSelector:"[data-accordion-control]",parentSelector:"[data-accordion]",activateOnFocus:!1,loop:r.loop,orientation:"vertical",onKeyDown:i}),children:[e.jsx(g,{component:"span",mod:{rotate:!r.disableChevronRotation&&A,position:r.chevronPosition},...r.getStyles("chevron",{classNames:s,styles:t}),children:m||r.chevron}),e.jsx("span",{...r.getStyles("label",{classNames:s,styles:t}),children:y}),p&&e.jsx(g,{component:"span",mod:{"chevron-position":r.chevronPosition},...r.getStyles("icon",{classNames:s,styles:t}),children:p})]});return U?e.jsx(N,{...r.getStyles("itemTitle",{classNames:s,styles:t}),children:P}):P});E.displayName="@mantine/core/AccordionControl";E.classes=I;const Be={},H=D((o,n)=>{const{classNames:s,className:a,style:u,styles:t,vars:l,value:m,mod:p,...d}=S("AccordionItem",Be,o),i=k();return e.jsx(Ne,{value:{value:m},children:e.jsx(g,{ref:n,mod:[{active:i.isItemActive(m)},p],...i.getStyles("item",{className:a,classNames:s,styles:t,style:u,variant:i.variant}),...d})})});H.displayName="@mantine/core/AccordionItem";H.classes=I;const Me={},z=D((o,n)=>{const{classNames:s,className:a,style:u,styles:t,vars:l,children:m,...p}=S("AccordionPanel",Me,o),{value:d}=X(),i=k();return e.jsx(J,{ref:n,...i.getStyles("panel",{className:a,classNames:s,style:u,styles:t}),...p,in:i.isItemActive(d),transitionDuration:i.transitionDuration??200,role:"region",id:i.getRegionId(d),"aria-labelledby":i.getControlId(d),children:e.jsx("div",{...i.getStyles("content",{classNames:s,styles:t}),children:m})})});z.displayName="@mantine/core/AccordionPanel";z.classes=I;const ke={multiple:!1,disableChevronRotation:!1,chevronPosition:"right",variant:"default",chevron:e.jsx(q,{})},Ee=me((o,{transitionDuration:n,chevronSize:s,radius:a})=>({root:{"--accordion-transition-duration":n===void 0?void 0:`${n}ms`,"--accordion-chevron-size":s===void 0?void 0:ge(s),"--accordion-radius":a===void 0?void 0:pe(a)}}));function f(o){const n=S("Accordion",ke,o),{classNames:s,className:a,style:u,styles:t,unstyled:l,vars:m,children:p,multiple:d,value:i,defaultValue:y,onChange:C,id:x,loop:c,transitionDuration:h,disableChevronRotation:r,chevronPosition:A,chevronSize:U,order:N,chevron:P,variant:_,radius:ze,...V}=n,T=le(x),[j,Y]=de({value:i,defaultValue:y,finalValue:d?[]:null,onChange:C}),Z=v=>Array.isArray(j)?j.includes(v):v===j,ee=v=>{const te=Array.isArray(j)?j.includes(v)?j.filter(ne=>ne!==v):[...j,v]:v===j?null:v;Y(te)},F=ue({name:"Accordion",classes:I,props:n,className:a,style:u,classNames:s,styles:t,unstyled:l,vars:m,varsResolver:Ee});return e.jsx(De,{value:{isItemActive:Z,onChange:ee,getControlId:L(`${T}-control`,"Accordion.Item component was rendered with invalid value or without value"),getRegionId:L(`${T}-panel`,"Accordion.Item component was rendered with invalid value or without value"),transitionDuration:h,disableChevronRotation:r,chevronPosition:A,order:N,chevron:P,loop:c,getStyles:F,variant:_,unstyled:l},children:e.jsx(g,{...F("root"),id:T,...V,variant:_,"data-accordion":!0,children:p})})}const He=o=>o;f.extend=He;f.withProps=he(f);f.classes=I;f.displayName="@mantine/core/Accordion";f.Item=H;f.Panel=z;f.Control=E;f.Chevron=q;const Le=o=>{console.log(o);const{project:n,auth:s}=o,a=t=>{const l=t.trim().split(" ");return l.length===1?l[0][0].toUpperCase():`${l[0][0]}${l.at(-1)[0]}`.toUpperCase()},u=[{...n.manager,role:"Manager",color:"blue"},...n.working_on.map(t=>({...t,color:t.role==="Developer"?"teal":t.role==="Quality Assurance"?"orange":"gray"}))];return e.jsx(be,{title:"Project Details",user:s.user,children:e.jsxs(we,{size:"xl",py:32,w:"100%",children:[e.jsx(g,{children:e.jsx(ve,{title:n.title,description:`Created on ${new Date(n.created_at).toLocaleString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!0})}`,breadcrumbs:[{label:"Projects",onClick:()=>$.get(route("projects.index"))},{label:"Details",onClick:()=>$.get(route("projects.show",n.id))}]})}),e.jsxs(W,{gap:24,children:[e.jsxs(g,{children:[e.jsx(R,{order:3,children:"Description"}),e.jsx(B,{my:16}),e.jsx(b,{children:n.description})]}),e.jsxs(g,{children:[e.jsx(R,{order:3,children:"Team Members"}),e.jsx(B,{my:16}),e.jsx(Pe,{cols:{base:1,sm:2,md:3,lg:4},spacing:"lg",children:u.map((t,l)=>e.jsxs(G,{shadow:"xs",radius:"md",withBorder:!0,children:[e.jsx(fe,{mx:"auto",size:64,color:t.color,children:a(t.full_name)}),e.jsxs(g,{mt:8,align:"center",children:[e.jsx(R,{order:3,align:"center",mt:16,lineClamp:1,children:t.full_name}),e.jsx(b,{align:"center",c:"ghost",size:"sm",mb:16,children:t.email}),e.jsx(Se,{color:t.color,variant:"light",align:"center",children:t.role})]})]},l))})]}),e.jsxs(g,{children:[e.jsxs(xe,{justify:"space-between",children:[e.jsx(R,{order:3,children:"Bugs"}),o.auth.user.role==="Quality Assurance"&&e.jsxs(e.Fragment,{children:[e.jsx(Ie,{label:"Create Bug",children:e.jsx(ye,{display:{base:"block",xs:"none"},onClick:()=>$.get(route("projects.bugs.create",n)),children:e.jsx(K,{})})}),e.jsx(je,{leftSection:e.jsx(K,{}),display:{base:"none",xs:"block"},onClick:()=>$.get(route("projects.bugs.create",n)),children:"Create Bug"})]})]}),e.jsx(B,{my:16}),e.jsxs(f,{children:[(n.bugs||[]).map((t,l)=>e.jsxs(f.Item,{value:t.title,children:[e.jsx(f.Control,{children:t.title}),e.jsx(f.Panel,{children:e.jsx(G,{shadow:"xs",radius:"md",withBorder:!0,children:e.jsxs(W,{spacing:"md",children:[e.jsx(g,{children:e.jsx(b,{size:"sm",color:"dimmed",mb:8,children:t.description})}),t.assignee&&e.jsx(g,{children:e.jsxs(b,{size:"sm",weight:500,children:["Assigned to: ",t.assignee.full_name]})}),t.evidence_image&&e.jsx(g,{children:e.jsx("img",{src:t.evidence_image,alt:"Evidence",style:{width:"100%",maxWidth:"300px",borderRadius:"8px",objectFit:"cover",marginBottom:"8px"}})})]})})})]},l)),!n.bugs.length&&e.jsx(b,{align:"center",mt:16,color:"dimmed",children:"No bugs found."})]})]})]})]})})};export{Le as default};
