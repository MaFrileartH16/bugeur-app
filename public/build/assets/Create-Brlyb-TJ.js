import{b as P,j as e,h as i,G as _,L as v,d,S as w}from"./app-D1ROa2dk.js";import{P as E,G as s}from"./PageHeadings-CXlcB1tZ.js";import{I as y,P as I,a as S}from"./IconPassword-DnG6uL1U.js";import{T as c}from"./TextInput-DoMuMr3T.js";import{A as U,T as t,a as F,b as D}from"./AppLayout-6WbUBhn6.js";import{F as A}from"./FileButton-fRe6bWuF.js";import{I as G}from"./IconUpload-C8NJVJfc.js";import{I as T}from"./IconKey-C8cnS4ze.js";import{I as L}from"./IconCornerDownLeft-WUnmPxyi.js";const q=({auth:p})=>{const{user:h}=p,r=P({profile_photo:"",full_name:"",email:"",role:"",password:""});console.log(r.data);const n=(a,l)=>l?a==="email"&&!l.endsWith("@bugeur.id")?"Email must use @bugeur.id.":null:`${a.replace("_"," ").replace(/^\w/,o=>o.toUpperCase())} is required.`,m=a=>{const l=a.target.value;r.setData("full_name",l);const o=n("full_name",l);o?r.setError("full_name",o):r.clearErrors("full_name")},u=a=>{const l=a.target.value;r.setData("email",l),r.setData("password",l);const o=n("email",l);o?r.setError("email",o):r.clearErrors("email")},j=a=>{r.setData("role",a);const l=n("role",a);l?r.setError("role",l):r.clearErrors("role")},f=a=>{a.preventDefault(),r.post(route("users.store"),{onFinish:()=>r.reset()})},g=a=>a&&!["image/png","image/jpeg","image/jpg"].includes(a.type)?"Only PNG, JPEG, and JPG formats are allowed.":a&&a.size>2*1024*1024?"File size must not exceed 2 MB.":null,x=a=>{const l=g(a);if(l){r.setError("profile_photo",l);return}r.setData("profile_photo",a),r.clearErrors("profile_photo")},b=Object.keys(r.errors).length>0,C=!r.data.full_name||!r.data.email||!r.data.role;return e.jsx("form",{onSubmit:f,children:e.jsxs(U,{title:"Create New User",user:h,children:[e.jsx(E,{title:"Create a New User",description:"Fill in the details below to create a new user account.",breadcrumbs:[{label:"Users",onClick:()=>i.get(route("users.index",{page:1}))},{label:"Create",onClick:()=>i.get(route("users.create"))}]}),e.jsxs(s,{gutter:32,justify:"flex-end",children:[e.jsx(s.Col,{span:{base:12},children:e.jsxs(s,{gutter:8,align:"start",children:[e.jsx(s.Col,{span:{base:12,sm:4},children:e.jsx(t,{order:5,children:"Profile Photo"})}),e.jsxs(s.Col,{span:{base:12,sm:8},children:[e.jsxs(_,{align:"flex-start",spacing:"sm",children:[e.jsx(v,{src:r.data.profile_photo instanceof File?URL.createObjectURL(r.data.profile_photo):r.data.profile_photo,alt:"Profile Photo",size:80}),e.jsx(A,{onChange:x,accept:"image/png,image/jpeg,image/jpg",children:a=>e.jsxs(d,{variant:"subtle",...a,leftSection:e.jsx(G,{}),children:[r.data.profile_photo?"Change":"Upload"," Profile Photo"]})})]}),r.errors.profile_photo&&e.jsx(F,{color:"red",size:"sm",children:r.errors.profile_photo})]})]})}),e.jsx(s.Col,{span:{base:12},children:e.jsxs(s,{gutter:{base:8,sm:0},align:"start",children:[e.jsx(s.Col,{span:{base:12,sm:4},children:e.jsx(t,{order:5,children:"Full Name"})}),e.jsx(s.Col,{span:{base:12,sm:8},children:e.jsx(c,{value:r.data.full_name,onChange:m,error:r.errors.full_name,placeholder:"Enter full name",leftSection:e.jsx(D,{}),description:"The user's full name as it will appear in the system."})})]})}),e.jsx(s.Col,{span:{base:12},children:e.jsxs(s,{gutter:{base:8,sm:0},align:"start",children:[e.jsx(s.Col,{span:{base:12,sm:4},children:e.jsx(t,{order:5,children:"Email Address"})}),e.jsx(s.Col,{span:{base:12,sm:8},children:e.jsx(c,{value:r.data.email,onChange:u,error:r.errors.email,placeholder:"Enter email address",leftSection:e.jsx(y,{}),description:"  Use a valid email address ending with @bugeur.id."})})]})}),e.jsx(s.Col,{span:{base:12},children:e.jsxs(s,{gutter:{base:8,sm:0},align:"start",children:[e.jsx(s.Col,{span:{base:12,sm:4},children:e.jsx(t,{order:5,children:"Role"})}),e.jsx(s.Col,{span:{base:12,sm:8},children:e.jsx(w,{value:r.data.role,onChange:j,error:r.errors.role,placeholder:"Select a role",leftSection:e.jsx(T,{}),description:"Choose the role that best fits the user's responsibilities.",data:[{value:"Project Manager",label:"Project Manager"},{value:"Developer",label:"Developer"},{value:"Quality Assurance",label:"Quality Assurance"}]})})]})}),e.jsx(s.Col,{span:{base:12},children:e.jsxs(s,{gutter:{base:8,sm:0},align:"start",children:[e.jsx(s.Col,{span:{base:12,sm:4},children:e.jsx(t,{order:5,children:"Password"})}),e.jsx(s.Col,{span:{base:12,sm:8},children:e.jsx(I,{value:r.data.password,placeholder:"Auto-generated",leftSection:e.jsx(S,{}),readOnly:!0,disabled:!0,description:"The password will be automatically generated from the email."})})]})}),e.jsx(s.Col,{span:{base:12,sm:8},align:"end",children:e.jsx(d,{type:"submit",leftSection:e.jsx(L,{}),disabled:r.processing||b||C,loading:r.processing,children:"Create User"})})]})]})})};export{q as default};
