import{a8 as y,p as T,u as g,j as t,E as z,f as C,a as R,r as l,k as V,B as p,h as $,z as F}from"./app-uL56QGf8.js";import{T as x}from"./Text-C5tJwUvw.js";import{T as H}from"./AppLayout-DsLAsZh1.js";function M(e,s){return e in s?y(s[e]):y(e)}function L(e,s){const r=e.map(a=>({value:a,px:M(a,s)}));return r.sort((a,o)=>a.px-o.px),r}function O(e){return typeof e=="object"&&e!==null?"base"in e?e.base:void 0:e}var j={root:"m_849cf0da"};const q={underline:"hover"},b=T((e,s)=>{const{underline:r,className:a,unstyled:o,mod:i,...u}=g("Anchor",q,e);return t.jsx(x,{component:"a",ref:s,className:z({[j.root]:!o},a),...u,mod:[{underline:r},i],__staticSelector:"Anchor",unstyled:o})});b.classes=j;b.displayName="@mantine/core/Anchor";var B={root:"m_8b3717df",breadcrumb:"m_f678d540",separator:"m_3b8f2208"};const w={separator:"/"},D=$((e,{separatorMargin:s})=>({root:{"--bc-separator-margin":F(s)}})),f=C((e,s)=>{const r=g("Breadcrumbs",w,e),{classNames:a,className:o,style:i,styles:u,unstyled:N,vars:E,children:_,separator:k,separatorMargin:G,...v}=r,n=R({name:"Breadcrumbs",classes:B,props:r,className:o,style:i,classNames:a,styles:u,unstyled:N,vars:E,varsResolver:D}),A=l.Children.toArray(_).reduce((d,c,m,P)=>{var h;const S=V(c)?l.cloneElement(c,{...n("breadcrumb",{className:(h=c.props)==null?void 0:h.className}),key:m}):l.createElement("div",{...n("breadcrumb"),key:m},c);return d.push(S),m!==P.length-1&&d.push(l.createElement(p,{...n("separator"),key:`separator-${m}`},k)),d},[]);return t.jsx(p,{ref:s,...n("root"),...v,children:A})});f.classes=B;f.displayName="@mantine/core/Breadcrumbs";const Q=e=>t.jsxs(p,{mb:32,children:[e.breadcrumbs&&t.jsx(f,{separator:">",mb:16,children:e.breadcrumbs.map((s,r)=>t.jsx(b,{size:"sm",c:r===e.breadcrumbs.length-1?"dark":"ghost",onClick:s.onClick,children:s.label},r))}),t.jsx(H,{order:2,children:e.title}),e.description&&t.jsx(x,{size:"sm",c:"ghost",children:e.description})]});export{Q as P,L as a,O as g};
