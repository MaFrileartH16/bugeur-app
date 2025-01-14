import{p as k,u as N,d as y,a as R,j as s,B,o as w,q as C,c as D,A as I,h as x}from"./app-qtcasp3t.js";import{A as P,T as _}from"./AppLayout-iONTU9Cg.js";import{G as u}from"./Group-B5S1gmR0.js";import{T as e,I as z,a as G}from"./IconTrash-CRaDVV_G.js";var A={root:"m_9e117634"};const $={},b=w((t,{radius:o,fit:i})=>({root:{"--image-radius":o===void 0?void 0:C(o),"--image-object-fit":i}})),j=k((t,o)=>{const i=N("Image",$,t),{classNames:a,className:h,style:r,styles:n,unstyled:c,vars:S,onError:d,src:l,radius:q,fit:F,fallbackSrc:m,mod:p,...T}=i,[v,g]=y.useState(!l);y.useEffect(()=>g(!l),[l]);const f=R({name:"Image",classes:A,props:i,className:h,style:r,classNames:a,styles:n,unstyled:c,vars:S,varsResolver:b});return v&&m?s.jsx(B,{component:"img",ref:o,src:m,...f("root"),onError:d,mod:["fallback",p],...T}):s.jsx(B,{component:"img",ref:o,...f("root"),src:l,onError:E=>{d==null||d(E),g(!0)},mod:p,...T})});j.classes=A;j.displayName="@mantine/core/Image";const V=({project:t,bugs:o})=>{console.log(o);const i=()=>{x.get(route("projects.bugs.create",t.id))},a=(r,n)=>{x.get(route("projects.bugs.edit",[r,n]))},h=(r,n)=>{confirm("Are you sure you want to delete this bug?")&&x.delete(route("projects.bugs.destroy",[r,n]),{onSuccess:()=>{alert("Bug deleted successfully.")}})};return s.jsxs(P,{title:`Bugs for ${t.title}`,children:[s.jsxs(u,{position:"apart",mb:"md",children:[s.jsxs(_,{order:2,children:["Bugs for ",t.title]}),s.jsx(D,{onClick:i,color:"blue",children:"Add Bug"})]}),s.jsxs(e,{highlightOnHover:!0,children:[s.jsx(e.Thead,{children:s.jsxs(e.Tr,{children:[s.jsx(e.Th,{children:"ID"}),s.jsx(e.Th,{children:"Title"}),s.jsx(e.Th,{children:"Type"}),s.jsx(e.Th,{children:"Status"}),s.jsx(e.Th,{children:"Assignee"}),s.jsx(e.Th,{children:"Deadline"}),s.jsx(e.Th,{children:"Screenshots"}),s.jsx(e.Th,{children:"Actions"})]})}),s.jsx(e.Tbody,{children:o.map(r=>s.jsxs(e.Tr,{children:[s.jsx(e.Td,{children:r.id}),s.jsx(e.Td,{children:r.title}),s.jsx(e.Td,{children:r.bug_type}),s.jsx(e.Td,{children:r.status}),s.jsx(e.Td,{children:r.assignee?r.assignee.username:"Unassigned"}),s.jsx(e.Td,{children:r.deadline}),s.jsx(e.Td,{children:r.screenshots.length>0?s.jsx(u,{spacing:"xs",children:r.screenshots.map((n,c)=>s.jsx(j,{src:n.images,alt:`Screenshot ${c+1}`,width:50,height:50,withPlaceholder:!0},c))}):"No screenshots"}),s.jsx(e.Td,{children:s.jsxs(u,{spacing:"sm",children:[s.jsx(I,{color:"blue",onClick:()=>a(t.id,r.id),children:s.jsx(z,{size:16})}),s.jsx(I,{color:"red",onClick:()=>h(t.id,r.id),children:s.jsx(G,{size:16})})]})})]},r.id))})]})]})};export{V as default};