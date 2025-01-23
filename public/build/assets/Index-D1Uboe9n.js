import{r as c,j as e,M as $,c as d,J as y,o as a,q as F,X as Q,G as N,a0 as q}from"./app-CyMXSHX-.js";import{P as V}from"./PageHeadings-CRWwvvq7.js";import{u as H,A as J,F as O,e as R,M as n,T as u,B as X,S as C}from"./AppLayout-BKkaJ9A7.js";import{T as h}from"./Text-Doc7j4At.js";import{S as K,I as S,C as x}from"./IconPlus-DfgUsiwL.js";import{I as W,a as Y,b as Z,c as ee}from"./IconSearch-D-ZhcSq7.js";import{G as w}from"./Grid-C1MBfdEw.js";import{I as se}from"./IconTrash-D1EFCy0r.js";import{I as te}from"./IconUsers-bXYDS3b3.js";const he=o=>{const[m,b]=c.useState(""),[I,{open:v,close:l}]=H(!1),[r,P]=c.useState(null),[i,D]=c.useState(o.users.current_page),{data:g,last_page:T,total:p,per_page:j}=o.users,k=s=>{const t=s.trim().split(" ");return t.length===1?t[0][0].toUpperCase():`${t[0][0]}${t.at(-1)[0]}`.toUpperCase()},A=s=>{a.get(route("users.edit",s.id))},U=()=>{r&&a.delete(route("users.destroy",r.id),{onSuccess:l})},M=s=>{P(s),v()},_=[{label:"Edit",action:A,leftSection:e.jsx(Z,{}),color:"yellow"},{label:"Delete",action:M,leftSection:e.jsx(se,{}),color:"red"}],f=g.filter(s=>{const t=m.toLowerCase();return s.full_name.toLowerCase().includes(t)||s.role.toLowerCase().includes(t)||s.email.toLowerCase().includes(t)}),B=s=>{D(s),a.get(route("users.index"),{page:s})},z=`Showing ${j*(i-1)+1} – ${Math.min(p,j*i)} of ${p}`,E=()=>e.jsxs(C,{align:"center",py:32,spacing:"xs",children:[e.jsx(te,{size:48,color:"gray"}),e.jsx(u,{order:3,c:"gray",children:"No users available yet."})]}),G=()=>e.jsxs(C,{align:"center",py:32,spacing:"xs",children:[e.jsx(ee,{size:48,color:"gray"}),e.jsx(u,{order:3,c:"gray",children:"User Not Found"})]});return e.jsxs(J,{title:o.title,user:o.auth.user,notification:o.notification,children:[e.jsxs($,{opened:I,onClose:l,title:"Confirm Deletion",centered:!0,children:[e.jsxs(h,{children:["Are you sure you want to delete"," ",e.jsx("strong",{children:r==null?void 0:r.full_name}),"? This action cannot be undone."]}),e.jsxs(K,{cols:2,mt:"md",children:[e.jsx(d,{variant:"default",onClick:l,children:"Cancel"}),e.jsx(d,{color:"red",onClick:U,children:"Delete"})]})]}),e.jsxs(O,{justify:"space-between",align:"start",gap:16,children:[e.jsx(V,{title:"Users",description:"View, manage, and assign roles to user accounts within the system."}),e.jsx(R,{label:"Craete User",children:e.jsx(y,{display:{base:"block",xs:"none"},onClick:()=>a.get(route("users.create")),children:e.jsx(S,{})})}),e.jsx(d,{leftSection:e.jsx(S,{}),display:{base:"none",xs:"block"},onClick:()=>a.get(route("users.create")),children:"Create User"})]}),e.jsxs(x,{withBorder:!0,shadow:"xs",children:[e.jsx(x.Section,{withBorder:!0,p:16,children:e.jsx(F,{leftSection:e.jsx(W,{}),placeholder:"Search by name, email, or role...",value:m,onChange:s=>b(s.target.value)})}),g.length===0?E():f.length===0?G():e.jsx(w,{pt:16,gutter:"lg",children:f.map(s=>e.jsx(w.Col,{span:{base:12,sm:6,md:4,lg:3},children:e.jsxs(x,{shadow:"xs",radius:"md",withBorder:!0,children:[e.jsxs(n,{shadow:"xl",position:"bottom-end",withArrow:!0,arrowPosition:"center",children:[e.jsx(n.Target,{children:e.jsx(y,{pos:"absolute",variant:"subtle",color:"ghost",right:16,children:e.jsx(Y,{})})}),e.jsx(n.Dropdown,{p:0,children:_.map((t,L)=>e.jsx(n.Item,{leftSection:t.leftSection,onClick:()=>t.action(s),color:t.color||void 0,h:48,children:t.label},L))})]}),e.jsx(Q,{mx:"auto",size:64,color:s.role==="Project Manager"?"magic":s.role==="Developer"?"peach":s.role==="Quality Assurance"?"soap":"default",children:k(s.full_name)}),e.jsx(u,{order:3,align:"center",mt:16,lineClamp:1,children:s.full_name}),e.jsx(h,{align:"center",c:"ghost",size:"sm",mb:16,children:s.email}),e.jsx(X,{mx:"auto",color:s.role==="Project Manager"?"magic":s.role==="Developer"?"peach":s.role==="Quality Assurance"?"soap":"default",variant:"light",children:s.role})]})},s.id))}),e.jsxs(N,{justify:"space-between",align:"center",mt:16,children:[e.jsx(h,{size:"sm",children:z}),e.jsx(q,{value:i,onChange:B,total:T,radius:"xs"})]})]})]})};export{he as default};
