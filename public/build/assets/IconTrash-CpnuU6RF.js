import{l as S,u as C,j as r,B as j,a as _,q as H,f as M,x as N,D as T}from"./app-BFxEyWYY.js";import{c as L}from"./AuthenticatedLayout-DBPGHiMl.js";import{S as Q}from"./Group-ByBicUXm.js";import{c as I}from"./createReactComponent-B1rNj-2n.js";const[X,Y]=L("Table component was not found in the tree");var f={table:"m_b23fa0ef",th:"m_4e7aa4f3",tr:"m_4e7aa4fd",td:"m_4e7aa4ef",tbody:"m_b2404537",thead:"m_b242d975",caption:"m_9e5a3ac7",scrollContainer:"m_a100c15",scrollContainerInner:"m_62259741"};function Z(e,a){if(!a)return;const t={};return a.columnBorder&&e.withColumnBorders&&(t["data-with-column-border"]=!0),a.rowBorder&&e.withRowBorders&&(t["data-with-row-border"]=!0),a.striped&&e.striped&&(t["data-striped"]=e.striped),a.highlightOnHover&&e.highlightOnHover&&(t["data-hover"]=!0),a.captionSide&&e.captionSide&&(t["data-side"]=e.captionSide),a.stickyHeader&&e.stickyHeader&&(t["data-sticky"]=!0),t}function p(e,a){const t=`Table${e.charAt(0).toUpperCase()}${e.slice(1)}`,o=S((n,i)=>{const l=C(t,{},n),{classNames:c,className:h,style:b,styles:m,...d}=l,u=Y();return r.jsx(j,{component:e,ref:i,...Z(u,a),...u.getStyles(e,{className:h,classNames:c,style:b,styles:m,props:l}),...d})});return o.displayName=`@mantine/core/${t}`,o.classes=f,o}const g=p("th",{columnBorder:!0}),D=p("td",{columnBorder:!0}),y=p("tr",{rowBorder:!0,striped:!0,highlightOnHover:!0}),O=p("thead",{stickyHeader:!0}),$=p("tbody"),E=p("tfoot"),P=p("caption",{captionSide:!0});function x({data:e}){return r.jsxs(r.Fragment,{children:[e.caption&&r.jsx(P,{children:e.caption}),e.head&&r.jsx(O,{children:r.jsx(y,{children:e.head.map((a,t)=>r.jsx(g,{children:a},t))})}),e.body&&r.jsx($,{children:e.body.map((a,t)=>r.jsx(y,{children:a.map((o,n)=>r.jsx(D,{children:o},n))},t))}),e.foot&&r.jsx(E,{children:r.jsx(y,{children:e.foot.map((a,t)=>r.jsx(g,{children:a},t))})})]})}x.displayName="@mantine/core/TableDataRenderer";const ee={type:"scrollarea"},te=H((e,{minWidth:a,type:t})=>({scrollContainer:{"--table-min-width":M(a),"--table-overflow":t==="native"?"auto":void 0}})),w=S((e,a)=>{const t=C("TableScrollContainer",ee,e),{classNames:o,className:n,style:i,styles:l,unstyled:c,vars:h,children:b,minWidth:m,type:d,...u}=t,v=_({name:"TableScrollContainer",classes:f,props:t,className:n,style:i,classNames:o,styles:l,unstyled:c,vars:h,varsResolver:te,rootSelector:"scrollContainer"});return r.jsx(j,{component:d==="scrollarea"?Q:"div",...d==="scrollarea"?{offsetScrollbars:"x"}:{},ref:a,...v("scrollContainer"),...u,children:r.jsx("div",{...v("scrollContainerInner"),children:b})})});w.classes=f;w.displayName="@mantine/core/TableScrollContainer";const ae={withRowBorders:!0,verticalSpacing:7},re=H((e,{layout:a,captionSide:t,horizontalSpacing:o,verticalSpacing:n,borderColor:i,stripedColor:l,highlightOnHoverColor:c,striped:h,highlightOnHover:b,stickyHeaderOffset:m,stickyHeader:d})=>({table:{"--table-layout":a,"--table-caption-side":t,"--table-horizontal-spacing":N(o),"--table-vertical-spacing":N(n),"--table-border-color":i?T(i,e):void 0,"--table-striped-color":h&&l?T(l,e):void 0,"--table-highlight-on-hover-color":b&&c?T(c,e):void 0,"--table-sticky-header-offset":d?M(m):void 0}})),s=S((e,a)=>{const t=C("Table",ae,e),{classNames:o,className:n,style:i,styles:l,unstyled:c,vars:h,horizontalSpacing:b,verticalSpacing:m,captionSide:d,stripedColor:u,highlightOnHoverColor:v,striped:k,highlightOnHover:z,withColumnBorders:A,withRowBorders:q,withTableBorder:F,borderColor:oe,layout:se,variant:U,data:B,children:V,stickyHeader:W,stickyHeaderOffset:ne,mod:G,tabularNums:J,...K}=t,R=_({name:"Table",props:t,className:n,style:i,classes:f,classNames:o,styles:l,unstyled:c,rootSelector:"table",vars:h,varsResolver:re});return r.jsx(X,{value:{getStyles:R,stickyHeader:W,striped:k===!0?"odd":k||void 0,highlightOnHover:z,withColumnBorders:A,withRowBorders:q,captionSide:d||"bottom"},children:r.jsx(j,{component:"table",variant:U,ref:a,mod:[{"data-with-table-border":F,"data-tabular-nums":J},G],...R("table"),...K,children:V||!!B&&r.jsx(x,{data:B})})})});s.classes=f;s.displayName="@mantine/core/Table";s.Td=D;s.Th=g;s.Tr=y;s.Thead=O;s.Tbody=$;s.Tfoot=E;s.Caption=P;s.ScrollContainer=w;s.DataRenderer=x;/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var he=I("outline","edit","IconEdit",[["path",{d:"M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1",key:"svg-0"}],["path",{d:"M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z",key:"svg-1"}],["path",{d:"M16 5l3 3",key:"svg-2"}]]);/**
 * @license @tabler/icons-react v3.28.1 - MIT
 *
 * This source code is licensed under the MIT license.
 * See the LICENSE file in the root directory of this source tree.
 */var pe=I("outline","trash","IconTrash",[["path",{d:"M4 7l16 0",key:"svg-0"}],["path",{d:"M10 11l0 6",key:"svg-1"}],["path",{d:"M14 11l0 6",key:"svg-2"}],["path",{d:"M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12",key:"svg-3"}],["path",{d:"M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3",key:"svg-4"}]]);export{he as I,s as T,pe as a};