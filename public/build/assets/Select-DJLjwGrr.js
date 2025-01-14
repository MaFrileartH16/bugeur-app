import{d as p,g as E,u as N,a as De,j as d,B,o as je,s as le,C as tt,f as de,E as Pe,l as ot,k as ce,w as Ie,r as ie,z as nt,i as rt,I as ke}from"./app-CrImoUcy.js";import{a as st,P as Z,i as ue,j as at}from"./AppLayout-Daupf-4s.js";import{S as lt}from"./ScrollArea-C-CtZNB7.js";function ct(e){const t=p.useRef(void 0);return p.useEffect(()=>{t.current=e},[e]),t.current}function Te(e){return typeof e=="string"?{value:e,label:e}:"value"in e&&!("label"in e)?{value:e.value,label:e.value,disabled:e.disabled}:typeof e=="number"?{value:e.toString(),label:e.toString()}:"group"in e?{group:e.group,items:e.items.map(t=>Te(t))}:e}function it(e){return e?e.map(t=>Te(t)):[]}function _e(e){return e.reduce((t,o)=>"group"in o?{...t,..._e(o.items)}:(t[o.value]=o,t),{})}var A={dropdown:"m_88b62a41",search:"m_985517d8",options:"m_b2821a6e",option:"m_92253aa5",empty:"m_2530cd1d",header:"m_858f94bd",footer:"m_82b967cb",group:"m_254f3e4f",groupLabel:"m_2bb2e9e5",chevron:"m_2943220b",optionsDropdownOption:"m_390b5f4",optionsDropdownCheckIcon:"m_8ee53fc2"};const dt={error:null},ut=je((e,{size:t})=>({chevron:{"--combobox-chevron-size":le(t,"combobox-chevron-size")}})),pe=E((e,t)=>{const o=N("ComboboxChevron",dt,e),{size:n,error:s,style:a,className:r,classNames:l,styles:c,unstyled:i,vars:b,mod:u,...f}=o,g=De({name:"ComboboxChevron",classes:A,props:o,style:a,className:r,classNames:l,styles:c,unstyled:i,vars:b,varsResolver:ut,rootSelector:"chevron"});return d.jsx(B,{component:"svg",...f,...g("chevron"),size:n,viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg",mod:["combobox-chevron",{error:s},u],ref:t,children:d.jsx("path",{d:"M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})});pe.classes=A;pe.displayName="@mantine/core/ComboboxChevron";const[pt,P]=st("Combobox component was not found in tree"),Re=p.forwardRef(({size:e,onMouseDown:t,onClick:o,onClear:n,...s},a)=>d.jsx(tt,{ref:a,size:e||"sm",variant:"transparent",tabIndex:-1,"aria-hidden":!0,...s,onMouseDown:r=>{r.preventDefault(),t==null||t(r)},onClick:r=>{n(),o==null||o(r)}}));Re.displayName="@mantine/core/ComboboxClearButton";const bt={},be=E((e,t)=>{const{classNames:o,styles:n,className:s,style:a,hidden:r,...l}=N("ComboboxDropdown",bt,e),c=P();return d.jsx(Z.Dropdown,{...l,ref:t,role:"presentation","data-hidden":r||void 0,...c.getStyles("dropdown",{className:s,style:a,classNames:o,styles:n})})});be.classes=A;be.displayName="@mantine/core/ComboboxDropdown";const mt={refProp:"ref"},$e=E((e,t)=>{const{children:o,refProp:n}=N("ComboboxDropdownTarget",mt,e);if(P(),!ue(o))throw new Error("Combobox.DropdownTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");return d.jsx(Z.Target,{ref:t,refProp:n,children:o})});$e.displayName="@mantine/core/ComboboxDropdownTarget";const ft={},me=E((e,t)=>{const{classNames:o,className:n,style:s,styles:a,vars:r,...l}=N("ComboboxEmpty",ft,e),c=P();return d.jsx(B,{ref:t,...c.getStyles("empty",{className:n,classNames:o,styles:a,style:s}),...l})});me.classes=A;me.displayName="@mantine/core/ComboboxEmpty";function fe({onKeyDown:e,withKeyboardNavigation:t,withAriaAttributes:o,withExpandedAttribute:n,targetType:s,autoComplete:a}){const r=P(),[l,c]=p.useState(null),i=u=>{if(e==null||e(u),!r.readOnly&&t){if(u.nativeEvent.isComposing)return;if(u.nativeEvent.code==="ArrowDown"&&(u.preventDefault(),r.store.dropdownOpened?c(r.store.selectNextOption()):(r.store.openDropdown("keyboard"),c(r.store.selectActiveOption()),r.store.updateSelectedOptionIndex("selected",{scrollIntoView:!0}))),u.nativeEvent.code==="ArrowUp"&&(u.preventDefault(),r.store.dropdownOpened?c(r.store.selectPreviousOption()):(r.store.openDropdown("keyboard"),c(r.store.selectActiveOption()),r.store.updateSelectedOptionIndex("selected",{scrollIntoView:!0}))),u.nativeEvent.code==="Enter"||u.nativeEvent.code==="NumpadEnter"){if(u.nativeEvent.keyCode===229)return;const f=r.store.getSelectedOptionIndex();r.store.dropdownOpened&&f!==-1?(u.preventDefault(),r.store.clickSelectedOption()):s==="button"&&(u.preventDefault(),r.store.openDropdown("keyboard"))}u.nativeEvent.code==="Escape"&&r.store.closeDropdown("keyboard"),u.nativeEvent.code==="Space"&&s==="button"&&(u.preventDefault(),r.store.toggleDropdown("keyboard"))}};return{...o?{"aria-haspopup":"listbox","aria-expanded":n&&!!(r.store.listId&&r.store.dropdownOpened)||void 0,"aria-controls":r.store.dropdownOpened?r.store.listId:void 0,"aria-activedescendant":r.store.dropdownOpened&&l||void 0,autoComplete:a,"data-expanded":r.store.dropdownOpened||void 0,"data-mantine-stop-propagation":r.store.dropdownOpened||void 0}:{},onKeyDown:i}}const xt={refProp:"ref",targetType:"input",withKeyboardNavigation:!0,withAriaAttributes:!0,withExpandedAttribute:!1,autoComplete:"off"},Fe=E((e,t)=>{const{children:o,refProp:n,withKeyboardNavigation:s,withAriaAttributes:a,withExpandedAttribute:r,targetType:l,autoComplete:c,...i}=N("ComboboxEventsTarget",xt,e);if(!ue(o))throw new Error("Combobox.EventsTarget component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const b=P(),u=fe({targetType:l,withAriaAttributes:a,withKeyboardNavigation:s,withExpandedAttribute:r,onKeyDown:o.props.onKeyDown,autoComplete:c});return p.cloneElement(o,{...u,...i,[n]:de(t,b.store.targetRef,at(o))})});Fe.displayName="@mantine/core/ComboboxEventsTarget";const ht={},xe=E((e,t)=>{const{classNames:o,className:n,style:s,styles:a,vars:r,...l}=N("ComboboxFooter",ht,e),c=P();return d.jsx(B,{ref:t,...c.getStyles("footer",{className:n,classNames:o,style:s,styles:a}),...l,onMouseDown:i=>{i.preventDefault()}})});xe.classes=A;xe.displayName="@mantine/core/ComboboxFooter";const gt={},he=E((e,t)=>{const{classNames:o,className:n,style:s,styles:a,vars:r,children:l,label:c,...i}=N("ComboboxGroup",gt,e),b=P();return d.jsxs(B,{ref:t,...b.getStyles("group",{className:n,classNames:o,style:s,styles:a}),...i,children:[c&&d.jsx("div",{...b.getStyles("groupLabel",{classNames:o,styles:a}),children:c}),l]})});he.classes=A;he.displayName="@mantine/core/ComboboxGroup";const yt={},ge=E((e,t)=>{const{classNames:o,className:n,style:s,styles:a,vars:r,...l}=N("ComboboxHeader",yt,e),c=P();return d.jsx(B,{ref:t,...c.getStyles("header",{className:n,classNames:o,style:s,styles:a}),...l,onMouseDown:i=>{i.preventDefault()}})});ge.classes=A;ge.displayName="@mantine/core/ComboboxHeader";function Le({value:e,valuesDivider:t=",",...o}){return d.jsx("input",{type:"hidden",value:Array.isArray(e)?e.join(t):e||"",...o})}Le.displayName="@mantine/core/ComboboxHiddenInput";const vt={},ye=E((e,t)=>{const o=N("ComboboxOption",vt,e),{classNames:n,className:s,style:a,styles:r,vars:l,onClick:c,id:i,active:b,onMouseDown:u,onMouseOver:f,disabled:g,selected:I,mod:k,...S}=o,y=P(),$=p.useId(),w=i||$;return d.jsx(B,{...y.getStyles("option",{className:s,classNames:n,styles:r,style:a}),...S,ref:t,id:w,mod:["combobox-option",{"combobox-active":b,"combobox-disabled":g,"combobox-selected":I},k],role:"option",onClick:h=>{var D;g?h.preventDefault():((D=y.onOptionSubmit)==null||D.call(y,o.value,o),c==null||c(h))},onMouseDown:h=>{h.preventDefault(),u==null||u(h)},onMouseOver:h=>{y.resetSelectionOnOptionHover&&y.store.resetSelectedOption(),f==null||f(h)}})});ye.classes=A;ye.displayName="@mantine/core/ComboboxOption";const wt={},ve=E((e,t)=>{const o=N("ComboboxOptions",wt,e),{classNames:n,className:s,style:a,styles:r,id:l,onMouseDown:c,labelledBy:i,...b}=o,u=P(),f=Pe(l);return p.useEffect(()=>{u.store.setListId(f)},[f]),d.jsx(B,{ref:t,...u.getStyles("options",{className:s,style:a,classNames:n,styles:r}),...b,id:f,role:"listbox","aria-labelledby":i,onMouseDown:g=>{g.preventDefault(),c==null||c(g)}})});ve.classes=A;ve.displayName="@mantine/core/ComboboxOptions";const Ct={withAriaAttributes:!0,withKeyboardNavigation:!0},we=E((e,t)=>{const o=N("ComboboxSearch",Ct,e),{classNames:n,styles:s,unstyled:a,vars:r,withAriaAttributes:l,onKeyDown:c,withKeyboardNavigation:i,size:b,...u}=o,f=P(),g=f.getStyles("search"),I=fe({targetType:"input",withAriaAttributes:l,withKeyboardNavigation:i,withExpandedAttribute:!1,onKeyDown:c,autoComplete:"off"});return d.jsx(ot,{ref:de(t,f.store.searchRef),classNames:[{input:g.className},n],styles:[{input:g.style},s],size:b||f.size,...I,...u,__staticSelector:"Combobox"})});we.classes=A;we.displayName="@mantine/core/ComboboxSearch";const St={refProp:"ref",targetType:"input",withKeyboardNavigation:!0,withAriaAttributes:!0,withExpandedAttribute:!1,autoComplete:"off"},Ve=E((e,t)=>{const{children:o,refProp:n,withKeyboardNavigation:s,withAriaAttributes:a,withExpandedAttribute:r,targetType:l,autoComplete:c,...i}=N("ComboboxTarget",St,e);if(!ue(o))throw new Error("Combobox.Target component children should be an element or a component that accepts ref. Fragments, strings, numbers and other primitive values are not supported");const b=P(),u=fe({targetType:l,withAriaAttributes:a,withKeyboardNavigation:s,withExpandedAttribute:r,onKeyDown:o.props.onKeyDown,autoComplete:c}),f=p.cloneElement(o,{...u,...i});return d.jsx(Z.Target,{ref:de(t,b.store.targetRef),children:f})});Ve.displayName="@mantine/core/ComboboxTarget";function Ot(e,t,o){for(let n=e-1;n>=0;n-=1)if(!t[n].hasAttribute("data-combobox-disabled"))return n;if(o){for(let n=t.length-1;n>-1;n-=1)if(!t[n].hasAttribute("data-combobox-disabled"))return n}return e}function At(e,t,o){for(let n=e+1;n<t.length;n+=1)if(!t[n].hasAttribute("data-combobox-disabled"))return n;if(o){for(let n=0;n<t.length;n+=1)if(!t[n].hasAttribute("data-combobox-disabled"))return n}return e}function Nt(e){for(let t=0;t<e.length;t+=1)if(!e[t].hasAttribute("data-combobox-disabled"))return t;return-1}function Be({defaultOpened:e,opened:t,onOpenedChange:o,onDropdownClose:n,onDropdownOpen:s,loop:a=!0,scrollBehavior:r="instant"}={}){const[l,c]=ce({value:t,defaultValue:e,finalValue:!1,onChange:o}),i=p.useRef(null),b=p.useRef(-1),u=p.useRef(null),f=p.useRef(null),g=p.useRef(-1),I=p.useRef(-1),k=p.useRef(-1),S=p.useCallback((m="unknown")=>{l||(c(!0),s==null||s(m))},[c,s,l]),y=p.useCallback((m="unknown")=>{l&&(c(!1),n==null||n(m))},[c,n,l]),$=p.useCallback((m="unknown")=>{l?y(m):S(m)},[y,S,l]),w=p.useCallback(()=>{const m=document.querySelector(`#${i.current} [data-combobox-selected]`);m==null||m.removeAttribute("data-combobox-selected"),m==null||m.removeAttribute("aria-selected")},[]),h=p.useCallback(m=>{const C=document.getElementById(i.current),v=C==null?void 0:C.querySelectorAll("[data-combobox-option]");if(!v)return null;const O=m>=v.length?0:m<0?v.length-1:m;return b.current=O,v!=null&&v[O]&&!v[O].hasAttribute("data-combobox-disabled")?(w(),v[O].setAttribute("data-combobox-selected","true"),v[O].setAttribute("aria-selected","true"),v[O].scrollIntoView({block:"nearest",behavior:r}),v[O].id):null},[r,w]),D=p.useCallback(()=>{const m=document.querySelector(`#${i.current} [data-combobox-active]`);if(m){const C=document.querySelectorAll(`#${i.current} [data-combobox-option]`),v=Array.from(C).findIndex(O=>O===m);return h(v)}return h(0)},[h]),T=p.useCallback(()=>h(At(b.current,document.querySelectorAll(`#${i.current} [data-combobox-option]`),a)),[h,a]),W=p.useCallback(()=>h(Ot(b.current,document.querySelectorAll(`#${i.current} [data-combobox-option]`),a)),[h,a]),J=p.useCallback(()=>h(Nt(document.querySelectorAll(`#${i.current} [data-combobox-option]`))),[h]),Q=p.useCallback((m="selected",C)=>{k.current=window.setTimeout(()=>{var M;const v=document.querySelectorAll(`#${i.current} [data-combobox-option]`),O=Array.from(v).findIndex(oe=>oe.hasAttribute(`data-combobox-${m}`));b.current=O,C!=null&&C.scrollIntoView&&((M=v[O])==null||M.scrollIntoView({block:"nearest",behavior:r}))},0)},[]),X=p.useCallback(()=>{b.current=-1,w()},[w]),z=p.useCallback(()=>{const m=document.querySelectorAll(`#${i.current} [data-combobox-option]`),C=m==null?void 0:m[b.current];C==null||C.click()},[]),L=p.useCallback(m=>{i.current=m},[]),Y=p.useCallback(()=>{g.current=window.setTimeout(()=>u.current.focus(),0)},[]),ee=p.useCallback(()=>{I.current=window.setTimeout(()=>f.current.focus(),0)},[]),te=p.useCallback(()=>b.current,[]);return p.useEffect(()=>()=>{window.clearTimeout(g.current),window.clearTimeout(I.current),window.clearTimeout(k.current)},[]),{dropdownOpened:l,openDropdown:S,closeDropdown:y,toggleDropdown:$,selectedOptionIndex:b.current,getSelectedOptionIndex:te,selectOption:h,selectFirstOption:J,selectActiveOption:D,selectNextOption:T,selectPreviousOption:W,resetSelectedOption:X,updateSelectedOptionIndex:Q,listId:i.current,setListId:L,clickSelectedOption:z,searchRef:u,focusSearchInput:Y,targetRef:f,focusTarget:ee}}const Et={keepMounted:!0,withinPortal:!0,resetSelectionOnOptionHover:!1,width:"target",transitionProps:{transition:"fade",duration:0}},It=je((e,{size:t,dropdownPadding:o})=>({options:{"--combobox-option-fz":Ie(t),"--combobox-option-padding":le(t,"combobox-option-padding")},dropdown:{"--combobox-padding":o===void 0?void 0:ie(o),"--combobox-option-fz":Ie(t),"--combobox-option-padding":le(t,"combobox-option-padding")}}));function x(e){const t=N("Combobox",Et,e),{classNames:o,styles:n,unstyled:s,children:a,store:r,vars:l,onOptionSubmit:c,onClose:i,size:b,dropdownPadding:u,resetSelectionOnOptionHover:f,__staticSelector:g,readOnly:I,...k}=t,S=Be(),y=r||S,$=De({name:g||"Combobox",classes:A,props:t,classNames:o,styles:n,unstyled:s,vars:l,varsResolver:It}),w=()=>{i==null||i(),y.closeDropdown()};return d.jsx(pt,{value:{getStyles:$,store:y,onOptionSubmit:c,size:b,resetSelectionOnOptionHover:f,readOnly:I},children:d.jsx(Z,{opened:y.dropdownOpened,...k,onChange:h=>!h&&w(),withRoles:!1,unstyled:s,children:a})})}const Dt=e=>e;x.extend=Dt;x.classes=A;x.displayName="@mantine/core/Combobox";x.Target=Ve;x.Dropdown=be;x.Options=ve;x.Option=ye;x.Search=we;x.Empty=me;x.Chevron=pe;x.Footer=xe;x.Header=ge;x.EventsTarget=Fe;x.DropdownTarget=$e;x.Group=he;x.ClearButton=Re;x.HiddenInput=Le;function jt({size:e,style:t,...o}){const n=e!==void 0?{width:ie(e),height:ie(e),...t}:t;return d.jsx("svg",{viewBox:"0 0 10 7",fill:"none",xmlns:"http://www.w3.org/2000/svg",style:n,"aria-hidden":!0,...o,children:d.jsx("path",{d:"M4 4.586L1.707 2.293A1 1 0 1 0 .293 3.707l3 3a.997.997 0 0 0 1.414 0l5-5A1 1 0 1 0 8.293.293L4 4.586z",fill:"currentColor",fillRule:"evenodd",clipRule:"evenodd"})})}function G(e){return"group"in e}function ze({options:e,search:t,limit:o}){const n=t.trim().toLowerCase(),s=[];for(let a=0;a<e.length;a+=1){const r=e[a];if(s.length===o)return s;G(r)&&s.push({group:r.group,items:ze({options:r.items,search:t,limit:o-s.length})}),G(r)||r.label.toLowerCase().includes(n)&&s.push(r)}return s}function Pt(e){if(e.length===0)return!0;for(const t of e)if(!("group"in t)||t.items.length>0)return!1;return!0}function He(e,t=new Set){if(Array.isArray(e))for(const o of e)if(G(o))He(o.items,t);else{if(typeof o.value>"u")throw new Error("[@mantine/core] Each option must have value property");if(typeof o.value!="string")throw new Error(`[@mantine/core] Option value must be a string, other data formats are not supported, got ${typeof o.value}`);if(t.has(o.value))throw new Error(`[@mantine/core] Duplicate options are not supported. Option with value "${o.value}" was provided more than once`);t.add(o.value)}}function kt(e,t){return Array.isArray(e)?e.includes(t):e===t}function qe({data:e,withCheckIcon:t,value:o,checkIconPosition:n,unstyled:s,renderOption:a}){if(!G(e)){const l=kt(o,e.value),c=t&&l&&d.jsx(jt,{className:A.optionsDropdownCheckIcon}),i=d.jsxs(d.Fragment,{children:[n==="left"&&c,d.jsx("span",{children:e.label}),n==="right"&&c]});return d.jsx(x.Option,{value:e.value,disabled:e.disabled,className:nt({[A.optionsDropdownOption]:!s}),"data-reverse":n==="right"||void 0,"data-checked":l||void 0,"aria-selected":l,active:l,children:typeof a=="function"?a({option:e,checked:l}):i})}const r=e.items.map(l=>d.jsx(qe,{data:l,value:o,unstyled:s,withCheckIcon:t,checkIconPosition:n,renderOption:a},l.value));return d.jsx(x.Group,{label:e.group,children:r})}function Tt({data:e,hidden:t,hiddenWhenEmpty:o,filter:n,search:s,limit:a,maxDropdownHeight:r,withScrollArea:l=!0,filterOptions:c=!0,withCheckIcon:i=!1,value:b,checkIconPosition:u,nothingFoundMessage:f,unstyled:g,labelId:I,renderOption:k,scrollAreaProps:S,"aria-label":y}){He(e);const w=typeof s=="string"?(n||ze)({options:e,search:c?s:"",limit:a??1/0}):e,h=Pt(w),D=w.map(T=>d.jsx(qe,{data:T,withCheckIcon:i,value:b,checkIconPosition:u,unstyled:g,renderOption:k},G(T)?T.group:T.value));return d.jsx(x.Dropdown,{hidden:t||o&&h,children:d.jsxs(x.Options,{labelledBy:I,"aria-label":y,children:[l?d.jsx(lt.Autosize,{mah:r??220,type:"scroll",scrollbarSize:"var(--combobox-padding)",offsetScrollbars:"y",...S,children:D}):D,h&&f&&d.jsx(x.Empty,{children:f})]})})}const _t={searchable:!1,withCheckIcon:!0,allowDeselect:!0,checkIconPosition:"left"},Ke=E((e,t)=>{const o=N("Select",_t,e),{classNames:n,styles:s,unstyled:a,vars:r,dropdownOpened:l,defaultDropdownOpened:c,onDropdownClose:i,onDropdownOpen:b,onFocus:u,onBlur:f,onClick:g,onChange:I,data:k,value:S,defaultValue:y,selectFirstOptionOnChange:$,onOptionSubmit:w,comboboxProps:h,readOnly:D,disabled:T,filter:W,limit:J,withScrollArea:Q,maxDropdownHeight:X,size:z,searchable:L,rightSection:Y,checkIconPosition:ee,withCheckIcon:te,nothingFoundMessage:m,name:C,form:v,searchValue:O,defaultSearchValue:M,onSearchChange:oe,allowDeselect:Ge,error:Ce,rightSectionPointerEvents:Me,id:Ue,clearable:Ze,clearButtonProps:We,hiddenInputProps:Je,renderOption:Qe,onClear:ne,autoComplete:Xe,scrollAreaProps:Ye,...U}=o,re=p.useMemo(()=>it(k),[k]),K=p.useMemo(()=>_e(re),[re]),Se=Pe(Ue),[F,Oe,et]=ce({value:S,defaultValue:y,finalValue:null,onChange:I}),_=typeof F=="string"?K[F]:void 0,H=ct(_),[se,q]=ce({value:O,defaultValue:M,finalValue:_?_.label:"",onChange:oe}),R=Be({opened:l,defaultOpened:c,onDropdownOpen:()=>{b==null||b(),R.updateSelectedOptionIndex("active",{scrollIntoView:!0})},onDropdownClose:()=>{i==null||i(),R.resetSelectedOption()}}),{resolvedClassNames:Ae,resolvedStyles:Ne}=rt({props:o,styles:s,classNames:n});p.useEffect(()=>{$&&R.selectFirstOption()},[$,F]),p.useEffect(()=>{S===null&&q(""),typeof S=="string"&&_&&((H==null?void 0:H.value)!==_.value||(H==null?void 0:H.label)!==_.label)&&q(_.label)},[S,_]);const Ee=Ze&&!!F&&!T&&!D&&d.jsx(x.ClearButton,{size:z,...We,onClear:()=>{Oe(null,null),q(""),ne==null||ne()}});return d.jsxs(d.Fragment,{children:[d.jsxs(x,{store:R,__staticSelector:"Select",classNames:Ae,styles:Ne,unstyled:a,readOnly:D,onOptionSubmit:j=>{w==null||w(j);const V=Ge&&K[j].value===F?null:K[j],ae=V?V.value:null;ae!==F&&Oe(ae,V),!et&&q(typeof ae=="string"&&(V==null?void 0:V.label)||""),R.closeDropdown()},size:z,...h,children:[d.jsx(x.Target,{targetType:L?"input":"button",autoComplete:Xe,children:d.jsx(ke,{id:Se,ref:t,rightSection:Y||Ee||d.jsx(x.Chevron,{size:z,error:Ce,unstyled:a}),rightSectionPointerEvents:Me||(Ee?"all":"none"),...U,size:z,__staticSelector:"Select",disabled:T,readOnly:D||!L,value:se,onChange:j=>{q(j.currentTarget.value),R.openDropdown(),$&&R.selectFirstOption()},onFocus:j=>{L&&R.openDropdown(),u==null||u(j)},onBlur:j=>{var V;L&&R.closeDropdown(),q(F!=null&&((V=K[F])==null?void 0:V.label)||""),f==null||f(j)},onClick:j=>{L?R.openDropdown():R.toggleDropdown(),g==null||g(j)},classNames:Ae,styles:Ne,unstyled:a,pointer:!L,error:Ce})}),d.jsx(Tt,{data:re,hidden:D||T,filter:W,search:se,limit:J,hiddenWhenEmpty:!m,withScrollArea:Q,maxDropdownHeight:X,filterOptions:L&&(_==null?void 0:_.label)!==se,value:F,checkIconPosition:ee,withCheckIcon:te,nothingFoundMessage:m,unstyled:a,labelId:U.label?`${Se}-label`:void 0,"aria-label":U.label?void 0:U["aria-label"],renderOption:Qe,scrollAreaProps:Ye})]}),d.jsx(x.HiddenInput,{value:F,name:C,form:v,disabled:T,...Je})]})});Ke.classes={...ke.classes,...x.classes};Ke.displayName="@mantine/core/Select";export{Ke as S};
