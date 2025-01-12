import{b as m,j as e,h as d}from"./app-CwXZ0I_k.js";import{A as c}from"./AuthenticatedLayout-75b7ClUc.js";import{T as h}from"./Title-0k7W6g11.js";import{S as x,B as o}from"./AppLayout-DcDpKpJS.js";import{T as n}from"./TextInput-9Nlb-3KF.js";import{S as g}from"./Select-F6ouLGrG.js";import{P as j}from"./PasswordInput-Dg0RuVfO.js";import{G as f}from"./Group-BpU2ioX9.js";const _=({user:a})=>{const{data:s,setData:t,put:u,processing:i,errors:l}=m({username:a.username||"",email:a.email||"",user_type:a.user_type||"",password:""}),p=r=>{r.preventDefault(),u(route("users.update",a.id),{onSuccess:()=>{alert("User updated successfully.")}})};return e.jsxs(c,{title:"Edit User",children:[e.jsx(h,{order:2,mb:"md",children:"Edit User"}),e.jsx("form",{onSubmit:p,children:e.jsxs(x,{spacing:"md",children:[e.jsx(n,{label:"Username",placeholder:"Enter username",value:s.username,onChange:r=>t("username",r.target.value),error:l.username}),e.jsx(n,{label:"Email",placeholder:"Enter email",value:s.email,onChange:r=>t("email",r.target.value),error:l.email}),e.jsx(g,{label:"User Type",placeholder:"Select user type",data:[{value:"project_manager",label:"Project Manager"},{value:"developer",label:"Developer"},{value:"tester",label:"Tester"}],defaultValue:s.user_type,onChange:r=>t("user_type",r),error:l.user_type}),e.jsx(j,{label:"Password",placeholder:"Enter new password (optional)",value:s.password,onChange:r=>t("password",r.target.value),error:l.password}),e.jsxs(f,{position:"right",children:[e.jsx(o,{type:"submit",color:"blue",loading:i,children:"Save Changes"}),e.jsx(o,{variant:"default",onClick:()=>d.get(route("users.index")),children:"Cancel"})]})]})})]})};export{_ as default};