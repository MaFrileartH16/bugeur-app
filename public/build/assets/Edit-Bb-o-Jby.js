import{d as g,j as a,T as h,e as d,h as m}from"./app-BFxEyWYY.js";import{A as b}from"./AuthenticatedLayout-DBPGHiMl.js";import{T as v}from"./Title-BEQChdSZ.js";import{S as x}from"./createReactComponent-B1rNj-2n.js";import{T as j,D as S,F as _}from"./DatePickerInput-DMLgWjz2.js";import{S as o}from"./Select-DMHdLCEj.js";import{G as C}from"./Group-ByBicUXm.js";const k=({project:i,bug:t,users:n})=>{console.log(t);const{data:l,setData:r,post:c,processing:u,errors:s}=g({_method:"put",title:t.title||"",description:t.description||"",assignee_id:t.assignee_id||"",status:t.status||"open",bug_type:t.bug_type||"minor",deadline:t.deadline||"",screenshots:null,creator_id:t.creator_id||""}),p=e=>{e.preventDefault(),c(route("projects.bugs.update",[i.id,t.id]),{onSuccess:()=>{console.log("Bug updated successfully!")}})};return a.jsxs(b,{title:`Edit Bug in ${i.title}`,children:[a.jsxs(v,{order:2,mb:"md",children:["Edit Bug in ",i.title]}),a.jsx("form",{onSubmit:p,encType:"multipart/form-data",children:a.jsxs(x,{spacing:"md",children:[a.jsx(h,{label:"Title",placeholder:"Enter bug title",value:l.title,onChange:e=>r("title",e.target.value),error:s.title}),a.jsx(j,{label:"Description",placeholder:"Describe the bug",value:l.description,onChange:e=>r("description",e.target.value),error:s.description}),a.jsx(o,{label:"Creator",placeholder:"Select creator",data:n.map(e=>({value:e.id.toString(),label:e.username})),value:l.creator_id,onChange:e=>r("creator_id",e),error:s.creator_id}),a.jsx(o,{label:"Assignee",placeholder:"Select assignee",data:n.map(e=>({value:e.id.toString(),label:e.username})),value:l.assignee_id,onChange:e=>r("assignee_id",e),error:s.assignee_id}),a.jsx(o,{label:"Status",placeholder:"Select bug status",data:[{value:"open",label:"Open"},{value:"in_progress",label:"In Progress"},{value:"resolved",label:"Resolved"},{value:"closed",label:"Closed"}],value:l.status,onChange:e=>r("status",e),error:s.status}),a.jsx(o,{label:"Bug Type",placeholder:"Select bug type",data:[{value:"critical",label:"Critical"},{value:"major",label:"Major"},{value:"minor",label:"Minor"}],value:l.bug_type,onChange:e=>r("bug_type",e),error:s.bug_type}),a.jsx(S,{label:"Deadline",placeholder:"Pick a deadline",value:l.deadline?new Date(l.deadline):null,onChange:e=>r("deadline",e?e.toISOString().split("T")[0]:""),error:s.deadline}),a.jsx(_,{label:"Screenshots",placeholder:"Upload screenshots",multiple:!0,onChange:e=>r("screenshots",e),error:s.screenshots}),a.jsxs(C,{position:"right",children:[a.jsx(d,{type:"submit",color:"blue",loading:u,children:"Save Changes"}),a.jsx(d,{variant:"default",onClick:()=>m.get(route("projects.bugs.index",i.id)),children:"Cancel"})]})]})})]})};export{k as default};
