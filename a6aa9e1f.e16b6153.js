(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{168:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(170),o=a(176),s=a(207),c=a(174);var i=function(e){const{metadata:t}=e,{previousPage:a,nextPage:n}=t;return r.a.createElement("nav",{className:"pagination-nav"},r.a.createElement("div",{className:"pagination-nav__item"},a&&r.a.createElement(c.a,{className:"pagination-nav__link",to:a},r.a.createElement("h4",{className:"pagination-nav__link--label"},"\xab Newer Entries"))),r.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},n&&r.a.createElement(c.a,{className:"pagination-nav__link",to:n},r.a.createElement("h4",{className:"pagination-nav__link--label"},"Older Entries \xbb"))))};t.default=function(e){const{metadata:t,items:a}=e,{siteConfig:{title:n}}=Object(l.a)(),c="/"===t.permalink?n:"Blog";return r.a.createElement(o.a,{title:c,description:"Blog"},r.a.createElement("div",{className:"container margin-vert--xl"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col col--8 col--offset-2"},a.map(({content:e})=>r.a.createElement(s.a,{key:e.metadata.permalink,frontMatter:e.frontMatter,metadata:e.metadata,truncated:e.metadata.truncated},r.a.createElement(e,null))),r.a.createElement(i,{metadata:t})))))}},189:function(e,t,a){"use strict";var n=a(1),r=a(0),l=a.n(r),o=(a(198),a(200));var s=a.n(o)()({});var c=(e,t)=>(class extends r.Component{componentDidCatch(e){t(e)}render(){return"function"==typeof e?l.a.createElement(e,null):e}});var i=(e,t,a)=>{"reason"===t?evaluator.reasonSyntax():evaluator.mlSyntax();let n="",r="",o="";evaluator.execute(e).forEach(e=>{let{value:t,stdout:a,stderr:l}=e.value;"- : unit = ()"!==t.trim()&&(n+=t),r+=a,o+=l});let s=null;""===n.trim()||a||(s=l.a.createElement("pre",{style:{color:"green"}},n));let c=null;""!==r&&(c=l.a.createElement("pre",{dangerouslySetInnerHTML:{__html:r}}));let i=null;return""!==o&&(i=l.a.createElement("pre",{style:{color:"red"}},o)),l.a.createElement("div",null,s,null!==s&&null!==c?l.a.createElement("hr",null):null,c,null===s&&null===c||null===i?null:l.a.createElement("hr",null),i)};const m=({code:e="",language:t="ocaml",hidden:a=!1},n,r)=>{n(c(i(e,t,a),r))};class d extends r.Component{componentDidMount(){const{code:e,language:t,noexec:a,hidden:n}=this.props;a||this.transpile({code:e,language:t,hidden:n})}componentDidUpdate({code:e,language:t,hidden:a}){const{code:n,language:r,hidden:l}=this.props}onChange(e){const{language:t,hidden:a}=this.props;this.transpile({code:e,language:t,hidden:a})}executeCode(e){const{language:t,hidden:a}=this.props;this.transpile({code:e,language:t,hidden:a})}resetInterpreter(){evaluator.reset()}onError(e){this.setState({error:e.toString()})}transpile({code:e,language:t,hidden:a}){const n={code:e,language:t,hidden:a},r=e=>this.setState({element:void 0,error:e.toString()}),l=e=>this.setState({...o,element:e}),o={unsafeWrapperError:void 0,error:void 0};try{m(n,l,r)}catch(s){this.setState({...o,error:s.toString()})}}render(){const{children:e,code:t,language:a,theme:n,hidden:r,disabled:o}=this.props;return l.a.createElement(s.Provider,{value:{...this.state,code:t,language:a,theme:n,hidden:r,disabled:o,onError:this.onError.bind(this),onChange:this.onChange.bind(this),executeCode:this.executeCode.bind(this),resetInterpreter:this.resetInterpreter.bind(this)}},e)}}d.defaultProps={code:"",language:"reason",disabled:!1};var u=a(201),p=a.n(u),g=a(187),h=a(184);const E={plain:{color:"#C5C8C6",backgroundColor:"#1D1F21"},styles:[{types:["prolog","comment","doctype","cdata"],style:{color:"hsl(30, 20%, 50%)"}},{types:["property","tag","boolean","number","constant","symbol"],style:{color:"hsl(350, 40%, 70%)"}},{types:["attr-name","string","char","builtin","insterted"],style:{color:"hsl(75, 70%, 60%)"}},{types:["operator","entity","url","string","variable","language-css"],style:{color:"hsl(40, 90%, 60%)"}},{types:["deleted"],style:{color:"rgb(255, 85, 85)"}},{types:["italic"],style:{fontStyle:"italic"}},{types:["important","bold"],style:{fontWeight:"bold"}},{types:["regex","important"],style:{color:"#e90"}},{types:["atrule","attr-value","keyword"],style:{color:"hsl(350, 40%, 70%)"}},{types:["punctuation","symbol"],style:{opacity:"0.7"}}]};class v extends r.Component{constructor(e){super(e),this.state={code:""}}updateContent(e){this.setState({code:e},()=>{this.props.onChange&&this.props.onChange(this.state.code)})}highlightCode(e){return l.a.createElement(g.a,{Prism:h.a,code:e,theme:this.props.theme||E,language:this.props.language},({tokens:e,getLineProps:t,getTokenProps:a})=>l.a.createElement(r.Fragment,null,e.map((e,n)=>l.a.createElement("div",t({line:e,key:n}),e.map((e,t)=>l.a.createElement("span",a({token:e,key:t})))))))}render(){const{style:e,code:t,onChange:a,language:r,theme:o,...s}=this.props,{code:c}=this.state,i=o&&"object"==typeof o.plain?o.plain:{};return l.a.createElement(p.a,Object(n.a)({value:c,padding:10,highlight:this.highlightCode.bind(this),onValueChange:this.updateContent.bind(this),style:{whiteSpace:"pre",fontFamily:"monospace",...i,...e}},s))}}v.getDerivedStateFromProps=function(e,t){return e.code!==t.prevCodeProp?{code:e.code,prevCodeProp:e.code}:null};var b=v;class y extends r.Component{constructor(e){super(e),this.state={code:""}}updateContent(e){this.setState({code:e})}render(){return l.a.createElement(s.Consumer,null,({code:e,language:t,theme:a,disabled:r,executeCode:o,resetInterpreter:s})=>l.a.createElement("div",{onKeyDown:e=>{e.shiftKey&&e.ctrlKey&&"Enter"===e.key&&s(),e.ctrlKey&&"Enter"===e.key&&o(this.state.code)}},l.a.createElement(b,Object(n.a)({theme:a,code:e,language:t,disabled:r,onChange:this.updateContent.bind(this)},this.props)),r?null:l.a.createElement("div",null,l.a.createElement("button",{type:"button","aria-label":"Execute code",onClick:()=>o(this.state.code)},"Execute"))))}}var f=y;function C({Component:e,...t}){return l.a.createElement(e,t,l.a.createElement(s.Consumer,null,({element:e})=>e&&l.a.createElement(e,null)))}C.defaultProps={Component:"div"};var k=C;a(202),a(203);a(173);var N=a(90),_=a.n(N);t.a=function({children:e,theme:t,language:a,edit:l,noexec:o,hidden:s,...c}){return r.createElement(d,Object(n.a)({code:e,language:a,theme:t,hidden:s,noexec:o,disabled:!l},c),s?null:r.createElement(f,null),r.createElement("div",{className:_.a.playgroundPreview},r.createElement(k,{Component:"div"})))}},195:function(e,t,a){"use strict";(function(e){var n=a(1),r=a(0),l=a.n(r),o=a(173),s=a.n(o),c=a(187),i=a(206),m=a.n(i),d=a(196),u=a.n(d),p=a(197),g=a.n(p),h=a(170),E=a(189),v=a(91),b=a.n(v),y=a(184);(void 0!==e?e:window).Prism=y.a,a(204),a(205);const f=/{([\d,-]+)}/;t.a=({children:e,className:t,demo:a,edit:o,fix:i,hidden:d,metastring:p,...v})=>{const{siteConfig:{themeConfig:{prism:y={}}}}=Object(h.a)(),[C,k]=Object(r.useState)(!1),N=Object(r.useRef)(null),_=Object(r.useRef)(null);Object(r.useRef)(null);let x=[];if(p&&f.test(p)){const e=p.match(f)[1];x=g.a.parse(e).filter(e=>e>0)}Object(r.useEffect)(()=>{let e;return _.current&&(e=new u.a(_.current,{target:()=>N.current})),()=>{e&&e.destroy()}},[_.current,N.current]);const w=()=>{window.getSelection().empty(),k(!0),setTimeout(()=>k(!1),2e3)};let P=t&&t.replace(/language-/,"");return!P&&y.defaultLanguage&&(P=y.defaultLanguage),a||o||i||d?l.a.createElement(E.a,Object(n.a)({code:e.trim(),theme:y.theme||m.a,language:P,edit:o||i,noexec:i,hidden:d},v)):l.a.createElement(c.a,Object(n.a)({},c.b,{theme:y.theme||m.a,code:e.trim(),language:P}),({className:e,style:t,tokens:a,getLineProps:r,getTokenProps:o})=>l.a.createElement("div",{className:b.a.codeBlockWrapper},l.a.createElement("pre",{ref:N,className:s()(e,b.a.codeBlock),style:t},a.map((e,t)=>{const a=r({line:e,key:t});return x.includes(t+1)&&(a.className=`${a.className} docusaurus-highlight-code-line`),l.a.createElement("div",Object(n.a)({key:t},a),e.map((e,t)=>l.a.createElement("span",Object(n.a)({key:t},o({token:e,key:t})))))})),l.a.createElement("button",{ref:_,type:"button","aria-label":"Copy code to clipboard",className:b.a.copyButton,onClick:w},C?"Copied":"Copy")))}}).call(this,a(48))},207:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(173),o=a.n(l),s=a(171),c=a(174),i=a(210),m=a(92),d=a.n(m);const u=["January","February","March","April","May","June","July","August","September","October","November","December"];t.a=function(e){const{children:t,frontMatter:a,metadata:n,truncated:l,isBlogPostPage:m=!1}=e,{date:p,permalink:g,tags:h}=n,{author:E,title:v}=a,b=a.author_url||a.authorURL,y=a.author_title||a.authorTitle,f=a.author_image_url||a.authorImageURL;return r.a.createElement("article",{className:m?void 0:"margin-bottom--xl"},(()=>{const e=m?"h1":"h2",t=p.substring(0,10).split("-"),a=t[0],n=u[parseInt(t[1],10)-1],l=parseInt(t[2],10);return r.a.createElement("header",null,r.a.createElement(e,{className:o()("margin-bottom--sm",d.a.blogPostTitle)},m?v:r.a.createElement(c.a,{to:g},v)),r.a.createElement("div",{className:"margin-bottom--sm"},r.a.createElement("time",{dateTime:p,className:d.a.blogPostDate},n," ",l,", ",a)),r.a.createElement("div",{className:"avatar margin-bottom--md"},f&&r.a.createElement("a",{className:"avatar__photo-link",href:b,target:"_blank",rel:"noreferrer noopener"},r.a.createElement("img",{className:"avatar__photo",src:f,alt:E})),r.a.createElement("div",{className:"avatar__intro"},E&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{className:"avatar__name"},r.a.createElement("a",{href:b,target:"_blank",rel:"noreferrer noopener"},E)),r.a.createElement("small",{className:"avatar__subtitle"},y)))))})(),r.a.createElement("section",{className:"markdown"},r.a.createElement(s.a,{components:i.a},t)),(h.length>0||l)&&r.a.createElement("footer",{className:"row margin-vert--lg"},h.length>0&&r.a.createElement("div",{className:"col"},r.a.createElement("strong",null,"Tags:"),h.map(({label:e,permalink:t})=>r.a.createElement(c.a,{key:t,className:"margin-horiz--sm",to:t},e))),l&&r.a.createElement("div",{className:"col text--right"},r.a.createElement(c.a,{to:n.permalink,"aria-label":`Read more about ${v}`},r.a.createElement("strong",null,"Read More")))))}}}]);