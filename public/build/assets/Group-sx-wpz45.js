import{c,w as be,j as m,u as M,e as L,B as H,f as V,a as J,k as K,r as me,q as Q}from"./app-BbeDIDnk.js";import{c as Z,k as pe}from"./AuthenticatedLayout-CLo5kxy8.js";function j(e){const t=c.useRef(e);return c.useEffect(()=>{t.current=e}),c.useMemo(()=>(...o)=>{var s;return(s=t.current)==null?void 0:s.call(t,...o)},[])}const Se=()=>{};function X(e,t){const o=typeof t=="number"?t:t.delay,s=typeof t=="number"?!1:t.flushOnUnmount,n=j(e),l=c.useRef(0),r=Object.assign(c.useCallback((...a)=>{window.clearTimeout(l.current);const d=()=>{l.current!==0&&(l.current=0,n(...a))};r.flush=d,l.current=window.setTimeout(d,o)},[n,o]),{flush:Se});return c.useEffect(()=>()=>{window.clearTimeout(l.current),s&&r.flush()},[r,s]),r}const[we,P]=Z("ScrollArea.Root component was not found in tree");function W(e,t){const o=j(t);be(()=>{let s=0;if(e){const n=new ResizeObserver(()=>{cancelAnimationFrame(s),s=window.requestAnimationFrame(o)});return n.observe(e),()=>{window.cancelAnimationFrame(s),n.unobserve(e)}}},[e,o])}const ve=c.forwardRef((e,t)=>{const{style:o,...s}=e,n=P(),[l,r]=c.useState(0),[a,d]=c.useState(0),u=!!(l&&a);return W(n.scrollbarX,()=>{var h;const i=((h=n.scrollbarX)==null?void 0:h.offsetHeight)||0;n.onCornerHeightChange(i),d(i)}),W(n.scrollbarY,()=>{var h;const i=((h=n.scrollbarY)==null?void 0:h.offsetWidth)||0;n.onCornerWidthChange(i),r(i)}),u?m.jsx("div",{...s,ref:t,style:{...o,width:l,height:a}}):null}),ge=c.forwardRef((e,t)=>{const o=P(),s=!!(o.scrollbarX&&o.scrollbarY);return o.type!=="scroll"&&s?m.jsx(ve,{...e,ref:t}):null}),ye={scrollHideDelay:1e3,type:"hover"},ee=c.forwardRef((e,t)=>{const o=M("ScrollAreaRoot",ye,e),{type:s,scrollHideDelay:n,scrollbars:l,...r}=o,[a,d]=c.useState(null),[u,i]=c.useState(null),[h,b]=c.useState(null),[f,S]=c.useState(null),[E,g]=c.useState(null),[w,R]=c.useState(0),[x,T]=c.useState(0),[A,C]=c.useState(!1),[y,p]=c.useState(!1),v=L(t,D=>d(D));return m.jsx(we,{value:{type:s,scrollHideDelay:n,scrollArea:a,viewport:u,onViewportChange:i,content:h,onContentChange:b,scrollbarX:f,onScrollbarXChange:S,scrollbarXEnabled:A,onScrollbarXEnabledChange:C,scrollbarY:E,onScrollbarYChange:g,scrollbarYEnabled:y,onScrollbarYEnabledChange:p,onCornerWidthChange:R,onCornerHeightChange:T},children:m.jsx(H,{...r,ref:v,__vars:{"--sa-corner-width":l!=="xy"?"0px":`${w}px`,"--sa-corner-height":l!=="xy"?"0px":`${x}px`}})})});ee.displayName="@mantine/core/ScrollAreaRoot";function te(e,t){const o=e/t;return Number.isNaN(o)?0:o}function Y(e){const t=te(e.viewport,e.content),o=e.scrollbar.paddingStart+e.scrollbar.paddingEnd,s=(e.scrollbar.size-o)*t;return Math.max(s,18)}function oe(e,t){return o=>{if(e[0]===e[1]||t[0]===t[1])return t[0];const s=(t[1]-t[0])/(e[1]-e[0]);return t[0]+s*(o-e[0])}}function xe(e,[t,o]){return Math.min(o,Math.max(t,e))}function q(e,t,o="ltr"){const s=Y(t),n=t.scrollbar.paddingStart+t.scrollbar.paddingEnd,l=t.scrollbar.size-n,r=t.content-t.viewport,a=l-s,d=o==="ltr"?[0,r]:[r*-1,0],u=xe(e,d);return oe([0,r],[0,a])(u)}function Ce(e,t,o,s="ltr"){const n=Y(o),l=n/2,r=t||l,a=n-r,d=o.scrollbar.paddingStart+r,u=o.scrollbar.size-o.scrollbar.paddingEnd-a,i=o.content-o.viewport,h=s==="ltr"?[0,i]:[i*-1,0];return oe([d,u],h)(e)}function re(e,t){return e>0&&e<t}function N(e){return e?parseInt(e,10):0}function z(e,t,{checkForDefaultPrevented:o=!0}={}){return s=>{e==null||e(s),(o===!1||!s.defaultPrevented)&&(t==null||t(s))}}const[Pe,ne]=Z("ScrollAreaScrollbar was not found in tree"),le=c.forwardRef((e,t)=>{const{sizes:o,hasThumb:s,onThumbChange:n,onThumbPointerUp:l,onThumbPointerDown:r,onThumbPositionChange:a,onDragScroll:d,onWheelScroll:u,onResize:i,...h}=e,b=P(),[f,S]=c.useState(null),E=L(t,p=>S(p)),g=c.useRef(null),w=c.useRef(""),{viewport:R}=b,x=o.content-o.viewport,T=j(u),A=j(a),C=X(i,10),y=p=>{if(g.current){const v=p.clientX-g.current.left,D=p.clientY-g.current.top;d({x:v,y:D})}};return c.useEffect(()=>{const p=v=>{const D=v.target;(f==null?void 0:f.contains(D))&&T(v,x)};return document.addEventListener("wheel",p,{passive:!1}),()=>document.removeEventListener("wheel",p,{passive:!1})},[R,f,x,T]),c.useEffect(A,[o,A]),W(f,C),W(b.content,C),m.jsx(Pe,{value:{scrollbar:f,hasThumb:s,onThumbChange:j(n),onThumbPointerUp:j(l),onThumbPositionChange:A,onThumbPointerDown:j(r)},children:m.jsx("div",{...h,ref:E,"data-mantine-scrollbar":!0,style:{position:"absolute",...h.style},onPointerDown:z(e.onPointerDown,p=>{p.preventDefault(),p.button===0&&(p.target.setPointerCapture(p.pointerId),g.current=f.getBoundingClientRect(),w.current=document.body.style.webkitUserSelect,document.body.style.webkitUserSelect="none",y(p))}),onPointerMove:z(e.onPointerMove,y),onPointerUp:z(e.onPointerUp,p=>{p.preventDefault();const v=p.target;v.hasPointerCapture(p.pointerId)&&v.releasePointerCapture(p.pointerId),document.body.style.webkitUserSelect=w.current,g.current=null})})})}),se=c.forwardRef((e,t)=>{const{sizes:o,onSizesChange:s,style:n,...l}=e,r=P(),[a,d]=c.useState(),u=c.useRef(null),i=L(t,u,r.onScrollbarXChange);return c.useEffect(()=>{u.current&&d(getComputedStyle(u.current))},[u]),m.jsx(le,{"data-orientation":"horizontal",...l,ref:i,sizes:o,style:{...n,"--sa-thumb-width":`${Y(o)}px`},onThumbPointerDown:h=>e.onThumbPointerDown(h.x),onDragScroll:h=>e.onDragScroll(h.x),onWheelScroll:(h,b)=>{if(r.viewport){const f=r.viewport.scrollLeft+h.deltaX;e.onWheelScroll(f),re(f,b)&&h.preventDefault()}},onResize:()=>{u.current&&r.viewport&&a&&s({content:r.viewport.scrollWidth,viewport:r.viewport.offsetWidth,scrollbar:{size:u.current.clientWidth,paddingStart:N(a.paddingLeft),paddingEnd:N(a.paddingRight)}})}})});se.displayName="@mantine/core/ScrollAreaScrollbarX";const ce=c.forwardRef((e,t)=>{const{sizes:o,onSizesChange:s,style:n,...l}=e,r=P(),[a,d]=c.useState(),u=c.useRef(null),i=L(t,u,r.onScrollbarYChange);return c.useEffect(()=>{u.current&&d(window.getComputedStyle(u.current))},[]),m.jsx(le,{...l,"data-orientation":"vertical",ref:i,sizes:o,style:{"--sa-thumb-height":`${Y(o)}px`,...n},onThumbPointerDown:h=>e.onThumbPointerDown(h.y),onDragScroll:h=>e.onDragScroll(h.y),onWheelScroll:(h,b)=>{if(r.viewport){const f=r.viewport.scrollTop+h.deltaY;e.onWheelScroll(f),re(f,b)&&h.preventDefault()}},onResize:()=>{u.current&&r.viewport&&a&&s({content:r.viewport.scrollHeight,viewport:r.viewport.offsetHeight,scrollbar:{size:u.current.clientHeight,paddingStart:N(a.paddingTop),paddingEnd:N(a.paddingBottom)}})}})});ce.displayName="@mantine/core/ScrollAreaScrollbarY";const U=c.forwardRef((e,t)=>{const{orientation:o="vertical",...s}=e,{dir:n}=pe(),l=P(),r=c.useRef(null),a=c.useRef(0),[d,u]=c.useState({content:0,viewport:0,scrollbar:{size:0,paddingStart:0,paddingEnd:0}}),i=te(d.viewport,d.content),h={...s,sizes:d,onSizesChange:u,hasThumb:i>0&&i<1,onThumbChange:f=>{r.current=f},onThumbPointerUp:()=>{a.current=0},onThumbPointerDown:f=>{a.current=f}},b=(f,S)=>Ce(f,a.current,d,S);return o==="horizontal"?m.jsx(se,{...h,ref:t,onThumbPositionChange:()=>{if(l.viewport&&r.current){const f=l.viewport.scrollLeft,S=q(f,d,n);r.current.style.transform=`translate3d(${S}px, 0, 0)`}},onWheelScroll:f=>{l.viewport&&(l.viewport.scrollLeft=f)},onDragScroll:f=>{l.viewport&&(l.viewport.scrollLeft=b(f,n))}}):o==="vertical"?m.jsx(ce,{...h,ref:t,onThumbPositionChange:()=>{if(l.viewport&&r.current){const f=l.viewport.scrollTop,S=q(f,d);d.scrollbar.size===0?r.current.style.setProperty("--thumb-opacity","0"):r.current.style.setProperty("--thumb-opacity","1"),r.current.style.transform=`translate3d(0, ${S}px, 0)`}},onWheelScroll:f=>{l.viewport&&(l.viewport.scrollTop=f)},onDragScroll:f=>{l.viewport&&(l.viewport.scrollTop=b(f))}}):null});U.displayName="@mantine/core/ScrollAreaScrollbarVisible";const k=c.forwardRef((e,t)=>{const o=P(),{forceMount:s,...n}=e,[l,r]=c.useState(!1),a=e.orientation==="horizontal",d=X(()=>{if(o.viewport){const u=o.viewport.offsetWidth<o.viewport.scrollWidth,i=o.viewport.offsetHeight<o.viewport.scrollHeight;r(a?u:i)}},10);return W(o.viewport,d),W(o.content,d),s||l?m.jsx(U,{"data-state":l?"visible":"hidden",...n,ref:t}):null});k.displayName="@mantine/core/ScrollAreaScrollbarAuto";const ae=c.forwardRef((e,t)=>{const{forceMount:o,...s}=e,n=P(),[l,r]=c.useState(!1);return c.useEffect(()=>{const{scrollArea:a}=n;let d=0;if(a){const u=()=>{window.clearTimeout(d),r(!0)},i=()=>{d=window.setTimeout(()=>r(!1),n.scrollHideDelay)};return a.addEventListener("pointerenter",u),a.addEventListener("pointerleave",i),()=>{window.clearTimeout(d),a.removeEventListener("pointerenter",u),a.removeEventListener("pointerleave",i)}}},[n.scrollArea,n.scrollHideDelay]),o||l?m.jsx(k,{"data-state":l?"visible":"hidden",...s,ref:t}):null});ae.displayName="@mantine/core/ScrollAreaScrollbarHover";const Re=c.forwardRef((e,t)=>{const{forceMount:o,...s}=e,n=P(),l=e.orientation==="horizontal",[r,a]=c.useState("hidden"),d=X(()=>a("idle"),100);return c.useEffect(()=>{if(r==="idle"){const u=window.setTimeout(()=>a("hidden"),n.scrollHideDelay);return()=>window.clearTimeout(u)}},[r,n.scrollHideDelay]),c.useEffect(()=>{const{viewport:u}=n,i=l?"scrollLeft":"scrollTop";if(u){let h=u[i];const b=()=>{const f=u[i];h!==f&&(a("scrolling"),d()),h=f};return u.addEventListener("scroll",b),()=>u.removeEventListener("scroll",b)}},[n.viewport,l,d]),o||r!=="hidden"?m.jsx(U,{"data-state":r==="hidden"?"hidden":"visible",...s,ref:t,onPointerEnter:z(e.onPointerEnter,()=>a("interacting")),onPointerLeave:z(e.onPointerLeave,()=>a("idle"))}):null}),O=c.forwardRef((e,t)=>{const{forceMount:o,...s}=e,n=P(),{onScrollbarXEnabledChange:l,onScrollbarYEnabledChange:r}=n,a=e.orientation==="horizontal";return c.useEffect(()=>(a?l(!0):r(!0),()=>{a?l(!1):r(!1)}),[a,l,r]),n.type==="hover"?m.jsx(ae,{...s,ref:t,forceMount:o}):n.type==="scroll"?m.jsx(Re,{...s,ref:t,forceMount:o}):n.type==="auto"?m.jsx(k,{...s,ref:t,forceMount:o}):n.type==="always"?m.jsx(U,{...s,ref:t}):null});O.displayName="@mantine/core/ScrollAreaScrollbar";function Te(e,t=()=>{}){let o={left:e.scrollLeft,top:e.scrollTop},s=0;return function n(){const l={left:e.scrollLeft,top:e.scrollTop},r=o.left!==l.left,a=o.top!==l.top;(r||a)&&t(),o=l,s=window.requestAnimationFrame(n)}(),()=>window.cancelAnimationFrame(s)}const ie=c.forwardRef((e,t)=>{const{style:o,...s}=e,n=P(),l=ne(),{onThumbPositionChange:r}=l,a=L(t,i=>l.onThumbChange(i)),d=c.useRef(void 0),u=X(()=>{d.current&&(d.current(),d.current=void 0)},100);return c.useEffect(()=>{const{viewport:i}=n;if(i){const h=()=>{if(u(),!d.current){const b=Te(i,r);d.current=b,r()}};return r(),i.addEventListener("scroll",h),()=>i.removeEventListener("scroll",h)}},[n.viewport,u,r]),m.jsx("div",{"data-state":l.hasThumb?"visible":"hidden",...s,ref:a,style:{width:"var(--sa-thumb-width)",height:"var(--sa-thumb-height)",...o},onPointerDownCapture:z(e.onPointerDownCapture,i=>{const b=i.target.getBoundingClientRect(),f=i.clientX-b.left,S=i.clientY-b.top;l.onThumbPointerDown({x:f,y:S})}),onPointerUp:z(e.onPointerUp,l.onThumbPointerUp)})});ie.displayName="@mantine/core/ScrollAreaThumb";const _=c.forwardRef((e,t)=>{const{forceMount:o,...s}=e,n=ne();return o||n.hasThumb?m.jsx(ie,{ref:t,...s}):null});_.displayName="@mantine/core/ScrollAreaThumb";const ue=c.forwardRef(({children:e,style:t,...o},s)=>{const n=P(),l=L(s,n.onViewportChange);return m.jsx(H,{...o,ref:l,style:{overflowX:n.scrollbarXEnabled?"scroll":"hidden",overflowY:n.scrollbarYEnabled?"scroll":"hidden",...t},children:m.jsx("div",{style:{minWidth:"100%",display:"table"},ref:n.onContentChange,children:e})})});ue.displayName="@mantine/core/ScrollAreaViewport";var B={root:"m_d57069b5",viewport:"m_c0783ff9",viewportInner:"m_f8f631dd",scrollbar:"m_c44ba933",thumb:"m_d8b5e363",corner:"m_21657268"};const de={scrollHideDelay:1e3,type:"hover",scrollbars:"xy"},Ae=K((e,{scrollbarSize:t})=>({root:{"--scrollarea-scrollbar-size":me(t)}})),$=V((e,t)=>{const o=M("ScrollArea",de,e),{classNames:s,className:n,style:l,styles:r,unstyled:a,scrollbarSize:d,vars:u,type:i,scrollHideDelay:h,viewportProps:b,viewportRef:f,onScrollPositionChange:S,children:E,offsetScrollbars:g,scrollbars:w,onBottomReached:R,onTopReached:x,...T}=o,[A,C]=c.useState(!1),y=J({name:"ScrollArea",props:o,classes:B,className:n,style:l,classNames:s,styles:r,unstyled:a,vars:u,varsResolver:Ae});return m.jsxs(ee,{type:i==="never"?"always":i,scrollHideDelay:h,ref:t,scrollbars:w,...y("root"),...T,children:[m.jsx(ue,{...b,...y("viewport",{style:b==null?void 0:b.style}),ref:f,"data-offset-scrollbars":g===!0?"xy":g||void 0,"data-scrollbars":w||void 0,onScroll:p=>{var G;(G=b==null?void 0:b.onScroll)==null||G.call(b,p),S==null||S({x:p.currentTarget.scrollLeft,y:p.currentTarget.scrollTop});const{scrollTop:v,scrollHeight:D,clientHeight:I}=p.currentTarget;v-(D-I)>=0&&(R==null||R()),v===0&&(x==null||x())},children:E}),(w==="xy"||w==="x")&&m.jsx(O,{...y("scrollbar"),orientation:"horizontal","data-hidden":i==="never"||void 0,forceMount:!0,onMouseEnter:()=>C(!0),onMouseLeave:()=>C(!1),children:m.jsx(_,{...y("thumb")})}),(w==="xy"||w==="y")&&m.jsx(O,{...y("scrollbar"),orientation:"vertical","data-hidden":i==="never"||void 0,forceMount:!0,onMouseEnter:()=>C(!0),onMouseLeave:()=>C(!1),children:m.jsx(_,{...y("thumb")})}),m.jsx(ge,{...y("corner"),"data-hovered":A||void 0,"data-hidden":i==="never"||void 0})]})});$.displayName="@mantine/core/ScrollArea";const F=V((e,t)=>{const{children:o,classNames:s,styles:n,scrollbarSize:l,scrollHideDelay:r,type:a,dir:d,offsetScrollbars:u,viewportRef:i,onScrollPositionChange:h,unstyled:b,variant:f,viewportProps:S,scrollbars:E,style:g,vars:w,onBottomReached:R,onTopReached:x,...T}=M("ScrollAreaAutosize",de,e);return m.jsx(H,{...T,ref:t,style:[{display:"flex",overflow:"auto"},g],children:m.jsx(H,{style:{display:"flex",flexDirection:"column",flex:1},children:m.jsx($,{classNames:s,styles:n,scrollHideDelay:r,scrollbarSize:l,type:a,dir:d,offsetScrollbars:u,viewportRef:i,onScrollPositionChange:h,unstyled:b,variant:f,viewportProps:S,vars:w,scrollbars:E,onBottomReached:R,onTopReached:x,children:o})})})});$.classes=B;F.displayName="@mantine/core/ScrollAreaAutosize";F.classes=B;$.Autosize=F;function Ee(e){return c.Children.toArray(e).filter(Boolean)}var fe={root:"m_4081bf90"};const De={preventGrowOverflow:!0,gap:"md",align:"center",justify:"flex-start",wrap:"wrap"},je=K((e,{grow:t,preventGrowOverflow:o,gap:s,align:n,justify:l,wrap:r},{childWidth:a})=>({root:{"--group-child-width":t&&o?a:void 0,"--group-gap":Q(s),"--group-align":n,"--group-justify":l,"--group-wrap":r}})),he=V((e,t)=>{const o=M("Group",De,e),{classNames:s,className:n,style:l,styles:r,unstyled:a,children:d,gap:u,align:i,justify:h,wrap:b,grow:f,preventGrowOverflow:S,vars:E,variant:g,__size:w,mod:R,...x}=o,T=Ee(d),A=T.length,C=Q(u??"md"),p={childWidth:`calc(${100/A}% - (${C} - ${C} / ${A}))`},v=J({name:"Group",props:o,stylesCtx:p,className:n,style:l,classes:fe,classNames:s,styles:r,unstyled:a,vars:E,varsResolver:je});return m.jsx(H,{...v("root"),ref:t,variant:g,mod:[{grow:f},R],size:w,...x,children:T})});he.classes=fe;he.displayName="@mantine/core/Group";export{he as G,$ as S};