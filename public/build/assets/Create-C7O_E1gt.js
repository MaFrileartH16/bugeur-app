import{b as i,j as e,T as l,P as m,c as o,h as c}from"./app-CrImoUcy.js";import{A as h,T as x,S as j}from"./AppLayout-Daupf-4s.js";import{S as v}from"./Select-DJLjwGrr.js";import{G as g}from"./Group-iTLsk5h_.js";import"./ScrollArea-C-CtZNB7.js";const C=()=>{const{data:a,setData:s,post:n,processing:u,errors:t,reset:p}=i({username:"",email:"",user_type:"",password:""}),d=r=>{r.preventDefault(),n(route("users.store"),{onSuccess:()=>p()})};return e.jsxs(h,{title:"Add User",children:[e.jsx(x,{order:2,mb:"md",children:"Add New User"}),e.jsx("form",{onSubmit:d,children:e.jsxs(j,{spacing:"md",children:[e.jsx(l,{label:"Username",placeholder:"Enter username",value:a.username,onChange:r=>s("username",r.target.value),error:t.username}),e.jsx(l,{label:"Email",placeholder:"Enter email",value:a.email,onChange:r=>s("email",r.target.value),error:t.email}),e.jsx(v,{label:"User Type",placeholder:"Select user type",data:[{value:"project_manager",label:"Project Manager"},{value:"developer",label:"Developer"},{value:"tester",label:"Tester"}],value:a.user_type,onChange:r=>s("user_type",r),error:t.user_type}),e.jsx(m,{label:"Password",placeholder:"Enter password",value:a.password,onChange:r=>s("password",r.target.value),error:t.password}),e.jsxs(g,{position:"right",children:[e.jsx(o,{type:"submit",color:"blue",loading:u,children:"Save"}),e.jsx(o,{variant:"default",onClick:()=>c.get(route("users.index")),children:"Cancel"})]})]})})]})};export{C as default};
