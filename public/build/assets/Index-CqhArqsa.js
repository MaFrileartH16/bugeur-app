import{p as se,u as C,r as P,a as I,j as e,B as x,n as _,x as te,y as re,g as A,z as ae,d as G,s as M,A as w,G as k,c as oe,D as F,h as N}from"./app-l3PHe4uA.js";import{c as ne,A as le,T as ie}from"./AppLayout-C8W-FPwP.js";import{I as ce}from"./IconTrash-Bj_WYK42.js";var U={root:"m_9e117634"};const de={},he=_((s,{radius:r,fit:t})=>({root:{"--image-radius":r===void 0?void 0:te(r),"--image-object-fit":t}})),H=se((s,r)=>{const t=C("Image",de,s),{classNames:l,className:i,style:o,styles:n,unstyled:c,vars:u,onError:d,src:h,radius:m,fit:T,fallbackSrc:b,mod:f,...y}=t,[B,g]=P.useState(!h);P.useEffect(()=>g(!h),[h]);const v=I({name:"Image",classes:U,props:t,className:i,style:o,classNames:l,styles:n,unstyled:c,vars:u,varsResolver:he});return B&&b?e.jsx(x,{component:"img",ref:r,src:b,...v("root"),onError:d,mod:["fallback",f],...y}):e.jsx(x,{component:"img",ref:r,...v("root"),src:h,onError:E=>{d==null||d(E),g(!0)},mod:f,...y})});H.classes=U;H.displayName="@mantine/core/Image";const[ue,me]=re("Table component was not found in the tree");var j={table:"m_b23fa0ef",th:"m_4e7aa4f3",tr:"m_4e7aa4fd",td:"m_4e7aa4ef",tbody:"m_b2404537",thead:"m_b242d975",caption:"m_9e5a3ac7",scrollContainer:"m_a100c15",scrollContainerInner:"m_62259741"};function pe(s,r){if(!r)return;const t={};return r.columnBorder&&s.withColumnBorders&&(t["data-with-column-border"]=!0),r.rowBorder&&s.withRowBorders&&(t["data-with-row-border"]=!0),r.striped&&s.striped&&(t["data-striped"]=s.striped),r.highlightOnHover&&s.highlightOnHover&&(t["data-hover"]=!0),r.captionSide&&s.captionSide&&(t["data-side"]=s.captionSide),r.stickyHeader&&s.stickyHeader&&(t["data-sticky"]=!0),t}function p(s,r){const t=`Table${s.charAt(0).toUpperCase()}${s.slice(1)}`,l=A((i,o)=>{const n=C(t,{},i),{classNames:c,className:u,style:d,styles:h,...m}=n,T=me();return e.jsx(x,{component:s,ref:o,...pe(T,r),...T.getStyles(s,{className:u,classNames:c,style:d,styles:h,props:n}),...m})});return l.displayName=`@mantine/core/${t}`,l.classes=j,l}const R=p("th",{columnBorder:!0}),L=p("td",{columnBorder:!0}),S=p("tr",{rowBorder:!0,striped:!0,highlightOnHover:!0}),V=p("thead",{stickyHeader:!0}),W=p("tbody"),q=p("tfoot"),J=p("caption",{captionSide:!0});function $({data:s}){return e.jsxs(e.Fragment,{children:[s.caption&&e.jsx(J,{children:s.caption}),s.head&&e.jsx(V,{children:e.jsx(S,{children:s.head.map((r,t)=>e.jsx(R,{children:r},t))})}),s.body&&e.jsx(W,{children:s.body.map((r,t)=>e.jsx(S,{children:r.map((l,i)=>e.jsx(L,{children:l},i))},t))}),s.foot&&e.jsx(q,{children:e.jsx(S,{children:s.foot.map((r,t)=>e.jsx(R,{children:r},t))})})]})}$.displayName="@mantine/core/TableDataRenderer";const Te={type:"scrollarea"},be=_((s,{minWidth:r,type:t})=>({scrollContainer:{"--table-min-width":G(r),"--table-overflow":t==="native"?"auto":void 0}})),D=A((s,r)=>{const t=C("TableScrollContainer",Te,s),{classNames:l,className:i,style:o,styles:n,unstyled:c,vars:u,children:d,minWidth:h,type:m,...T}=t,b=I({name:"TableScrollContainer",classes:j,props:t,className:i,style:o,classNames:l,styles:n,unstyled:c,vars:u,varsResolver:be,rootSelector:"scrollContainer"});return e.jsx(x,{component:m==="scrollarea"?ae:"div",...m==="scrollarea"?{offsetScrollbars:"x"}:{},ref:r,...b("scrollContainer"),...T,children:e.jsx("div",{...b("scrollContainerInner"),children:d})})});D.classes=j;D.displayName="@mantine/core/TableScrollContainer";const fe={withRowBorders:!0,verticalSpacing:7},xe=_((s,{layout:r,captionSide:t,horizontalSpacing:l,verticalSpacing:i,borderColor:o,stripedColor:n,highlightOnHoverColor:c,striped:u,highlightOnHover:d,stickyHeaderOffset:h,stickyHeader:m})=>({table:{"--table-layout":r,"--table-caption-side":t,"--table-horizontal-spacing":M(l),"--table-vertical-spacing":M(i),"--table-border-color":o?w(o,s):void 0,"--table-striped-color":u&&n?w(n,s):void 0,"--table-highlight-on-hover-color":d&&c?w(c,s):void 0,"--table-sticky-header-offset":m?G(h):void 0}})),a=A((s,r)=>{const t=C("Table",fe,s),{classNames:l,className:i,style:o,styles:n,unstyled:c,vars:u,horizontalSpacing:d,verticalSpacing:h,captionSide:m,stripedColor:T,highlightOnHoverColor:b,striped:f,highlightOnHover:y,withColumnBorders:B,withRowBorders:g,withTableBorder:v,borderColor:E,layout:ye,variant:K,data:z,children:Q,stickyHeader:X,stickyHeaderOffset:ge,mod:Y,tabularNums:Z,...ee}=t,O=I({name:"Table",props:t,className:i,style:o,classes:j,classNames:l,styles:n,unstyled:c,rootSelector:"table",vars:u,varsResolver:xe});return e.jsx(ue,{value:{getStyles:O,stickyHeader:X,striped:f===!0?"odd":f||void 0,highlightOnHover:y,withColumnBorders:B,withRowBorders:g,captionSide:m||"bottom"},children:e.jsx(x,{component:"table",variant:K,ref:r,mod:[{"data-with-table-border":v,"data-tabular-nums":Z},Y],...O("table"),...ee,children:Q||!!z&&e.jsx($,{data:z})})})});a.classes=j;a.displayName="@mantine/core/Table";a.Td=L;a.Th=R;a.Tr=S;a.Thead=V;a.Tbody=W;a.Tfoot=q;a.Caption=J;a.ScrollContainer=D;a.DataRenderer=$;/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var je=ne("outline","edit","IconEdit",[["path",{d:"M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1",key:"svg-0"}],["path",{d:"M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z",key:"svg-1"}],["path",{d:"M16 5l3 3",key:"svg-2"}]]);const Be=({project:s,bugs:r})=>{console.log(r);const t=()=>{N.get(route("projects.bugs.create",s.id))},l=(o,n)=>{N.get(route("projects.bugs.edit",[o,n]))},i=(o,n)=>{confirm("Are you sure you want to delete this bug?")&&N.delete(route("projects.bugs.destroy",[o,n]),{onSuccess:()=>{alert("Bug deleted successfully.")}})};return e.jsxs(le,{title:`Bugs for ${s.title}`,children:[e.jsxs(k,{position:"apart",mb:"md",children:[e.jsxs(ie,{order:2,children:["Bugs for ",s.title]}),e.jsx(oe,{onClick:t,color:"blue",children:"Add Bug"})]}),e.jsxs(a,{highlightOnHover:!0,children:[e.jsx(a.Thead,{children:e.jsxs(a.Tr,{children:[e.jsx(a.Th,{children:"ID"}),e.jsx(a.Th,{children:"Title"}),e.jsx(a.Th,{children:"Type"}),e.jsx(a.Th,{children:"Status"}),e.jsx(a.Th,{children:"Assignee"}),e.jsx(a.Th,{children:"Deadline"}),e.jsx(a.Th,{children:"Screenshots"}),e.jsx(a.Th,{children:"Actions"})]})}),e.jsx(a.Tbody,{children:r.map(o=>e.jsxs(a.Tr,{children:[e.jsx(a.Td,{children:o.id}),e.jsx(a.Td,{children:o.title}),e.jsx(a.Td,{children:o.bug_type}),e.jsx(a.Td,{children:o.status}),e.jsx(a.Td,{children:o.assignee?o.assignee.username:"Unassigned"}),e.jsx(a.Td,{children:o.deadline}),e.jsx(a.Td,{children:o.screenshots.length>0?e.jsx(k,{spacing:"xs",children:o.screenshots.map((n,c)=>e.jsx(H,{src:n.images,alt:`Screenshot ${c+1}`,width:50,height:50,withPlaceholder:!0},c))}):"No screenshots"}),e.jsx(a.Td,{children:e.jsxs(k,{spacing:"sm",children:[e.jsx(F,{color:"blue",onClick:()=>l(s.id,o.id),children:e.jsx(je,{size:16})}),e.jsx(F,{color:"red",onClick:()=>i(s.id,o.id),children:e.jsx(ce,{size:16})})]})})]},o.id))})]})]})};export{Be as default};
