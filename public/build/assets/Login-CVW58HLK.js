import{p as g,u as f,a as y,j as s,B as j,b as k,T as b,P as w,c as S}from"./app-qtcasp3t.js";import{c as m,A as C,C as I,T as P,S as L}from"./AppLayout-iONTU9Cg.js";import{I as E,a as M}from"./IconPassword-BMoPBZW2.js";var h={root:"m_4451eb3a"};const F={},p=g((t,e)=>{const o=f("Center",F,t),{classNames:n,className:u,style:l,styles:i,unstyled:a,vars:r,inline:c,mod:d,...v}=o,x=y({name:"Center",props:o,classes:h,className:u,style:l,classNames:n,styles:i,unstyled:a,vars:r});return s.jsx(j,{ref:e,mod:[{inline:c},d],...x("root"),...v})});p.classes=h;p.displayName="@mantine/core/Center";/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var O=m("outline","lock-open-2","IconLockOpen2",[["path",{d:"M3 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2z",key:"svg-0"}],["path",{d:"M9 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",key:"svg-1"}],["path",{d:"M13 11v-4a4 4 0 1 1 8 0v4",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var T=m("outline","lock","IconLock",[["path",{d:"M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z",key:"svg-0"}],["path",{d:"M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0",key:"svg-1"}],["path",{d:"M8 11v-4a4 4 0 1 1 8 0v4",key:"svg-2"}]]);const N=t=>{console.log(t);const e=k({email:"",password:""}),o=(a,r)=>{switch(a){case"email":return r?/\S+@\S+\.\S+/.test(r)?null:"Please enter a valid email address.":"Email is required.";case"password":return r?r.length<6?"Password must be at least 6 characters.":null:"Password is required.";default:return null}},n=a=>r=>{const c=r.target.value;e.setData(a,c);const d=o(a,c);d?e.setError(a,d):e.clearErrors(a)},u=a=>{a.preventDefault(),e.post(route("login"),{onFinish:()=>e.clearErrors("password")})},l=Object.values(e.data).every(a=>a.trim()!==""),i=Object.keys(e.errors).length>0;return s.jsx("form",{onSubmit:u,children:s.jsx(C,{title:t.title,notification:t.notification,children:s.jsx(p,{flex:1,children:s.jsxs(I,{flex:1,size:"xs",children:[s.jsx(P,{order:1,children:"Login to account"}),s.jsxs(L,{my:32,children:[s.jsx(b,{leftSection:s.jsx(E,{}),label:"Email Address",placeholder:"username@bugeur.id",value:e.data.email,onChange:n("email"),error:e.errors.email}),s.jsx(w,{leftSection:s.jsx(M,{}),label:"Password",placeholder:"********",value:e.data.password,onChange:n("password"),error:e.errors.password})]}),s.jsx(S,{fullWidth:!0,type:"submit",leftSection:!l||i?s.jsx(T,{}):s.jsx(O,{}),loading:e.processing,disabled:!l||i,children:"Login"})]})})})})};export{N as default};
