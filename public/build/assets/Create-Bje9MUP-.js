import{b as p,j as e,T as m,c as l,h as u}from"./app-CrImoUcy.js";import{A as j,T as h,S as g}from"./AppLayout-Daupf-4s.js";import{S as x}from"./Select-DJLjwGrr.js";import{G as S}from"./Group-iTLsk5h_.js";import"./ScrollArea-C-CtZNB7.js";const A=({managers:r})=>{console.log(r);const{data:a,setData:o,post:i,processing:n,errors:s,reset:c}=p({title:"",manager_id:""}),d=t=>{t.preventDefault(),i(route("projects.store"),{onSuccess:()=>c()})};return e.jsxs(j,{title:"Add Project",children:[e.jsx(h,{order:2,mb:"md",children:"Add New Project"}),e.jsx("form",{onSubmit:d,children:e.jsxs(g,{spacing:"md",children:[e.jsx(m,{label:"Title",placeholder:"Enter project title",value:a.title,onChange:t=>o("title",t.target.value),error:s.title}),e.jsx(x,{label:"Manager",placeholder:"Select a manager",data:r.map(t=>({value:t.id.toString(),label:t.username})),value:a.manager_id,onChange:t=>o("manager_id",t),error:s.manager_id}),e.jsxs(S,{position:"right",children:[e.jsx(l,{type:"submit",color:"blue",loading:n,children:"Save"}),e.jsx(l,{variant:"default",onClick:()=>u.get(route("projects.index")),children:"Cancel"})]})]})})]})};export{A as default};
