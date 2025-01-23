import{b as v,j as e,G as b,X as C,c}from"./app-D3R6lm7F.js";import{P as y}from"./PageHeadings-psyFkYvz.js";import{T as i,P}from"./TextInput-CbwTZIg6.js";import{c as w,A as E,T as l,a as I}from"./AppLayout-B3HIGmJ6.js";import{G as a}from"./Grid-C0iy7L3J.js";import{F as k}from"./FileButton-C7dLhrbe.js";import{T as S}from"./Text-BxAYQD4o.js";import{I as M}from"./IconKey-C1XLFxFD.js";import{I as G}from"./IconMail-BJ4Rn4LR.js";import{I as O}from"./IconPassword--c8nw3to.js";import{I as U}from"./IconCornerDownLeft-DgwkMie4.js";/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var D=w("outline","photo-up","IconPhotoUp",[["path",{d:"M15 8h.01",key:"svg-0"}],["path",{d:"M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5",key:"svg-1"}],["path",{d:"M3 16l5 -5c.928 -.893 2.072 -.893 3 0l3.5 3.5",key:"svg-2"}],["path",{d:"M14 14l1 -1c.679 -.653 1.473 -.829 2.214 -.526",key:"svg-3"}],["path",{d:"M19 22v-6",key:"svg-4"}],["path",{d:"M22 19l-3 -3l-3 3",key:"svg-5"}]]);const W=d=>{const{user:o}=d.auth,r=v({_method:"put",avatar:o.avatar||"",full_name:o.full_name||"",email:o.email||"",password:""}),p=s=>s&&!["image/png","image/jpeg","image/jpg"].includes(s.type)?"Only PNG, JPEG, and JPG formats are allowed.":s&&s.size>2*1024*1024?"File size must not exceed 2 MB.":null,u=s=>{const t=p(s);if(t){r.setError("avatar",t);return}r.setData("avatar",s),r.clearErrors("avatar")},m=s=>s?s.endsWith("@bugeur.id")?null:"Email must end with @bugeur.id.":"Email is required.",h=s=>s&&s.length<8?"Password must be at least 8 characters.":null,j=s=>{const t=s.target.value;r.setData("email",t);const n=m(t);n?r.setError("email",n):r.clearErrors("email")},x=s=>{const t=s.target.value;r.setData("password",t);const n=h(t);n?r.setError("password",n):r.clearErrors("password")},g=s=>{s.preventDefault(),r.post(route("profile.update",o),{onFinish:()=>r.reset("password")})},f=Object.keys(r.errors).length>0;return e.jsx("form",{onSubmit:g,children:e.jsxs(E,{title:"Edit Profile",user:o,notification:d.notification,children:[e.jsx(y,{title:"Edit Profile",description:"Update your profile details and preferences."}),e.jsxs(a,{gutter:16,justify:"flex-end",children:[e.jsx(a.Col,{span:{base:12},children:e.jsxs(a,{gutter:8,align:"start",children:[e.jsx(a.Col,{span:{base:12,sm:4},children:e.jsx(l,{order:5,children:"Profile Picture"})}),e.jsxs(a.Col,{span:{base:12,sm:8},children:[e.jsxs(b,{align:"flex-start",spacing:"sm",children:[e.jsx(C,{src:r.data.avatar instanceof File?URL.createObjectURL(r.data.avatar):r.data.avatar,alt:"Profile Picture",size:80}),e.jsx(k,{onChange:u,accept:"image/png,image/jpeg,image/jpg",children:s=>e.jsx(c,{variant:"subtle",...s,leftSection:e.jsx(D,{}),children:"Upload"})})]}),r.errors.avatar&&e.jsx(S,{color:"red",size:"sm",children:r.errors.avatar})]})]})}),e.jsx(a.Col,{span:{base:12},children:e.jsxs(a,{gutter:8,align:"start",children:[e.jsx(a.Col,{span:{base:12,sm:4},children:e.jsx(l,{order:5,children:"Full Name"})}),e.jsx(a.Col,{span:{base:12,sm:8},children:e.jsx(i,{value:r.data.full_name,placeholder:"John Doe",description:"Your full name as displayed on your profile.",leftSection:e.jsx(I,{}),readOnly:!0,disabled:!0})})]})}),e.jsx(a.Col,{span:{base:12},children:e.jsxs(a,{gutter:8,align:"start",children:[e.jsx(a.Col,{span:{base:12,sm:4},children:e.jsx(l,{order:5,children:"Role"})}),e.jsx(a.Col,{span:{base:12,sm:8},children:e.jsx(i,{value:o.role,placeholder:"Role",description:"Your system role.",leftSection:e.jsx(M,{}),readOnly:!0,disabled:!0})})]})}),e.jsx(a.Col,{span:{base:12},children:e.jsxs(a,{gutter:8,align:"start",children:[e.jsx(a.Col,{span:{base:12,sm:4},children:e.jsx(l,{order:5,children:"Email"})}),e.jsx(a.Col,{span:{base:12,sm:8},children:e.jsx(i,{value:r.data.email,onChange:j,error:r.errors.email,placeholder:"example@bugeur.id",description:"Your email address.",leftSection:e.jsx(G,{}),readOnly:!0,disabled:!0})})]})}),e.jsx(a.Col,{span:{base:12},children:e.jsxs(a,{gutter:8,align:"start",children:[e.jsx(a.Col,{span:{base:12,sm:4},children:e.jsx(l,{order:5,children:"Password"})}),e.jsx(a.Col,{span:{base:12,sm:8},children:e.jsx(P,{value:r.data.password,onChange:x,error:r.errors.password,placeholder:"Enter new password",description:"Leave blank to keep current password.",leftSection:e.jsx(O,{})})})]})}),e.jsx(a.Col,{span:{base:12,sm:8,smOffset:4},children:e.jsx(c,{type:"submit",fullWidth:!0,leftSection:e.jsx(U,{}),disabled:r.processing||f,loading:r.processing,children:"Save Changes"})})]})]})})};export{W as default};
