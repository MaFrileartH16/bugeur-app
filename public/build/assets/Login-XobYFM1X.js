import{a as x,j as r,B as c,b as f}from"./app-7YMc50Dg.js";import{P as v}from"./PasswordInput-DrxvVH_r.js";import{T as w}from"./TextInput-BLQgohKo.js";import{c as p,A as j,C as y,T as b,a as t,S as E}from"./AppLayout-CEt-gjRC.js";import{C as k}from"./Container-P9BM_Rpc.js";import{I as L}from"./IconMail-DqyQcshX.js";import{I as C}from"./IconPassword-BYDqBUwG.js";/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var I=p("outline","lock-open-2","IconLockOpen2",[["path",{d:"M3 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z",key:"svg-0"}],["path",{d:"M9 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",key:"svg-1"}],["path",{d:"M13 11v-4a4 4 0 1 1 8 0v4",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var P=p("outline","lock","IconLock",[["path",{d:"M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z",key:"svg-0"}],["path",{d:"M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",key:"svg-1"}],["path",{d:"M8 11v-4a4 4 0 1 1 8 0v4",key:"svg-2"}]]);const B=u=>{const e=x({email:"",password:""}),n=a=>a?/@bugeur\.id$/.test(a)?null:"Email must end with @bugeur.id.":"Please enter your email address.",i=a=>a?null:"Please enter your password.",m=a=>{const s=a.target.value;e.setData("email",s);const o=n(s);o?e.setError("email",o):e.clearErrors("email")},h=a=>{const s=a.target.value;e.setData("password",s);const o=i(s);o?e.setError("password",o):e.clearErrors("password")},g=a=>{a.preventDefault();const s=n(e.data.email),o=i(e.data.password);if(s||o){e.setErrors({email:s,password:o});return}e.post(route("login"),{onFinish:()=>e.clearErrors("password")})},l=Object.values(e.data).every(a=>a.trim()!==""),d=Object.keys(e.errors).length>0;return r.jsx("form",{onSubmit:g,"aria-label":"Login Form",children:r.jsx(j,{title:"Login",notification:u.notification,children:r.jsx(y,{flex:1,children:r.jsxs(k,{flex:1,size:"xs",px:16,py:16,children:[r.jsx(b,{order:2,component:"h2",mb:8,children:"Login to Your Account"}),r.jsx(t,{mb:32,children:"Access your account by logging in with your registered email and password."}),r.jsxs(E,{gap:16,component:"section","aria-labelledby":"login-fields",children:[r.jsxs(c,{children:[r.jsx(t,{fw:500,children:"Email Address"}),r.jsx(w,{value:e.data.email,onChange:m,error:e.errors.email,placeholder:"Enter your email address",description:"Use a valid email address ending with @bugeur.id.",leftSection:r.jsx(L,{}),autoFocus:!0,autoComplete:"email"})]}),r.jsxs(c,{children:[r.jsx(t,{fw:500,children:"Password"}),r.jsx(v,{id:"password",value:e.data.password,onChange:h,error:e.errors.password,placeholder:"Enter your password",leftSection:r.jsx(C,{})})]})]}),r.jsx(f,{fullWidth:!0,type:"submit",leftSection:!l||d?r.jsx(P,{}):r.jsx(I,{}),loading:e.processing,disabled:!l||d,"aria-label":"Submit Login",mt:16,children:"Login"})]})})})})};export{B as default};
