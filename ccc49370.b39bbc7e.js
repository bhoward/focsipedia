(window.webpackJsonp=window.webpackJsonp||[]).push([[119],{255:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(264),o=a(298),i=a(261);var c=function(e){const{nextItem:t,prevItem:a}=e;return r.a.createElement("nav",{className:"pagination-nav","aria-label":"Blog post page navigation"},r.a.createElement("div",{className:"pagination-nav__item"},a&&r.a.createElement(i.a,{className:"pagination-nav__link",to:a.permalink},r.a.createElement("div",{className:"pagination-nav__sublabel"},"Previous Post"),r.a.createElement("div",{className:"pagination-nav__label"},"\xab ",a.title))),r.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t&&r.a.createElement(i.a,{className:"pagination-nav__link",to:t.permalink},r.a.createElement("div",{className:"pagination-nav__sublabel"},"Next Post"),r.a.createElement("div",{className:"pagination-nav__label"},t.title," \xbb"))))};t.default=function(e){const{content:t}=e,{frontMatter:a,metadata:n}=t,{title:i,description:s,nextItem:m,prevItem:u,editUrl:d}=n;return r.a.createElement(l.a,{title:i,description:s},t&&r.a.createElement("div",{className:"container margin-vert--lg"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col col--8 col--offset-2"},r.a.createElement(o.a,{frontMatter:a,metadata:n,isBlogPostPage:!0},r.a.createElement(t,null)),r.a.createElement("div",null,d&&r.a.createElement("a",{href:d,target:"_blank",rel:"noreferrer noopener"},r.a.createElement("svg",{fill:"currentColor",height:"1.2em",width:"1.2em",preserveAspectRatio:"xMidYMid meet",viewBox:"0 0 40 40",style:{marginRight:"0.3em",verticalAlign:"sub"}},r.a.createElement("g",null,r.a.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"}))),"Edit this page")),(m||u)&&r.a.createElement("div",{className:"margin-vert--xl"},r.a.createElement(c,{nextItem:m,prevItem:u}))))))}},269:function(e,t,a){!function(e){"use strict";var t="and as assert begin class constraint done downto exception external fun esfun function functor include inherit initializer lazy let pub mutable new nonrec object of open or pri rec then to type val virtualtry catch finally do else for if switch while import library export part of show hide is as".split(" "),a="try catch match with else for if switch while do begin end in module sig struct".split(" "),n="unit int char exn string int32 int64 float bool option mod land lor lxor lsl lsr asr".split(" "),r="true false Error Ok None Some".split(" ");function l(e){for(var t={},a=0;a<e.length;++a)t[e[a]]=!0;return t}function o(e,t){for(var a=0;null!=e.next();){if(e.eat("'")&&a<=4)return t.tokenize=null,"string";if(!/\w/.test(e.peek()))return t.tokenize=null,"variable-2";a++}return t.tokenize=null,null}function i(e,t){for(var a,n=!1,r=!1;null!=(a=e.next());){if('"'===a&&!r){n=!0;break}r=!r&&"\\"===a}return n&&!r&&(t.tokenize=!1),"string"}function c(e,t){for(var a,n;t.longString&&null!=(n=e.next());)"|"===a&&"}"===n&&(t.longString=!1),a=n;return t.longString||(t.tokenize=!1),"string"}e.defineMIME("application/reason",{name:"clike",keywords:l(t),blockKeywords:l(a),atoms:l(n),builtin:l(r),hooks:{"{":function(e,t){if(e.eat("|"))return t.longString=!0,t.tokenize=c,t.tokenize(e,t)},"[":function(e,t){return e.eat("|")?"operator":null},"|":function(e,t){return e.eat("]"),"operator"},'"':function(e,t){return t.tokenize=i,t.tokenize(e,t)},"'":function(e,t){return t.tokenize=o,t.tokenize(e,t)},"/":function(e,t){return!!e.eat("*")&&(t.tokenize=function e(t){return function(a,n){for(var r;r=a.next();){if("*"==r&&a.eat("/")){if(1==t){n.tokenize=null;break}return n.tokenize=e(t-1),n.tokenize(a,n)}if("/"==r&&a.eat("*"))return n.tokenize=e(t+1),n.tokenize(a,n)}return"comment"}}(1),t.tokenize(e,t))}}}),e.registerHelper("hintWords","application/reason",t.concat(n).concat(r)),e.defineMode("reason",(function(t){return Object.assign(e.getMode(t,"application/reason"),{lineComment:void 0})}),"clike")}(a(260),a(291))},270:function(e,t,a){"use strict";var n=a(1),r=a(0),l=a.n(r),o=a(283);var i=a.n(o)()({});var c=(e,t)=>class extends r.Component{componentDidCatch(e){t(e)}render(){return"function"==typeof e?l.a.createElement(e,null):e}};var s=(e,t,a)=>{"reason"===t?evaluator.reasonSyntax():evaluator.mlSyntax();let n="",r="",o="";evaluator.execute(e).forEach(e=>{let{value:t,stdout:a,stderr:l}=e.value;"- : unit = ()"!==t.trim()&&(n+=t),r+=a,o+=l});let i=null;""===n.trim()||a||(i=l.a.createElement("pre",{style:{color:"green"}},n));let c=null;""!==r&&(c=l.a.createElement("pre",{dangerouslySetInnerHTML:{__html:r}}));let s=null;return""!==o&&(s=l.a.createElement("pre",{style:{color:"red"}},o)),l.a.createElement("div",null,i,null!==i&&null!==c?l.a.createElement("hr",null):null,c,null===i&&null===c||null===s?null:l.a.createElement("hr",null),s)};class m extends r.Component{componentDidMount(){const{code:e,language:t,noexec:a,hidden:n}=this.props;a||this.transpile({code:e,language:t,hidden:n})}onChange(e){const{language:t,hidden:a}=this.props;this.transpile({code:e,language:t,hidden:a})}executeCode(e){const{language:t,hidden:a}=this.props;this.transpile({code:e,language:t,hidden:a})}resetInterpreter(){evaluator.resetLocal()}onError(e){this.setState({error:e.toString()})}transpile({code:e,language:t,hidden:a}){const n={code:e,language:t,hidden:a},r=e=>this.setState({element:void 0,error:e.toString()}),l=e=>this.setState({...o,element:e}),o={unsafeWrapperError:void 0,error:void 0};try{(({code:e="",language:t="ocaml",hidden:a=!1},n,r)=>{n(c(s(e,t,a),r))})(n,l,r)}catch(i){this.setState({...o,error:i.toString()})}}render(){const{children:e,code:t,language:a,hidden:n,disabled:r}=this.props;return l.a.createElement(i.Provider,{value:{...this.state,code:t,language:a,hidden:n,disabled:r,onError:this.onError.bind(this),onChange:this.onChange.bind(this),executeCode:this.executeCode.bind(this),resetInterpreter:this.resetInterpreter.bind(this)}},e)}}m.defaultProps={code:"",language:"reason",disabled:!1};var u=a(284);"undefined"!=typeof navigator&&(a(260),a(93),a(94),a(273),a(285),a(286),a(287),a(288),a(95),a(289),a(290),a(269));class d extends r.Component{constructor(e){super(e);const{code:t}=e;this.state={code:t}}render(){return l.a.createElement(i.Consumer,null,({language:e,disabled:t,executeCode:a,resetInterpreter:n})=>l.a.createElement("div",{onKeyDown:e=>{e.shiftKey&&e.ctrlKey&&"Enter"===e.key&&n(),e.ctrlKey&&"Enter"===e.key&&a(this.state.code)}},l.a.createElement(u.Controlled,{value:this.state.code,options:{mode:"reason"===e?"reason":"text/x-ocaml",theme:"material",keyMap:"sublime",extraKeys:{"Ctrl-Space":"autocomplete"},lineNumbers:!0,tabSize:2,matchBrackets:!0,autoCloseBrackets:!0,readOnly:t,viewportMargin:1/0},editorDidMount:e=>{},onBeforeChange:(e,t,a)=>{this.setState({code:a})},onChange:(e,t,a)=>{}}),t?null:l.a.createElement("div",null,l.a.createElement("button",{type:"button","aria-label":"Execute code",onClick:()=>a(this.state.code)},"Execute"))))}}var g=d;function p({Component:e,...t}){return l.a.createElement(e,t,l.a.createElement(i.Consumer,null,({element:e})=>e&&l.a.createElement(e,null)))}p.defaultProps={Component:"div"};var h=p,v=a(96),E=a.n(v);t.a=function({code:e,language:t,edit:a,noexec:l,hidden:o,...i}){return r.createElement(m,Object(n.a)({code:e,language:t,hidden:o,noexec:l,disabled:!a},i),o?null:r.createElement(g,{code:e}),r.createElement("div",{className:E.a.playgroundPreview},r.createElement(h,{Component:"div"})))}},280:function(e,t,a){"use strict";(function(e){var n=a(1),r=a(0),l=a.n(r),o=a(268),i=a.n(o),c=a(302),s=a(294),m=a(281),u=a.n(m),d=a(282),g=a.n(d),p=a(257),h=a(270),v=a(97),E=a.n(v),f=a(36);(void 0!==e?e:window).Prism=f.a,a(292),a(293);const b=/{([\d,-]+)}/;t.a=({children:e,className:t,demo:a,edit:o,fix:m,hidden:d,metastring:v,...f})=>{const{siteConfig:{themeConfig:{prism:k={}}}}=Object(p.a)(),[y,x]=Object(r.useState)(!1),N=Object(r.useRef)(null),_=Object(r.useRef)(null);let w=[];if(v&&b.test(v)){const e=v.match(b)[1];w=g.a.parse(e).filter(e=>e>0)}Object(r.useEffect)(()=>{let e;return _.current&&(e=new u.a(_.current,{target:()=>N.current})),()=>{e&&e.destroy()}},[_.current,N.current]);const C=()=>{window.getSelection().empty(),x(!0),setTimeout(()=>x(!1),2e3)};let z=t&&t.replace(/language-/,"");return!z&&k.defaultLanguage&&(z=k.defaultLanguage),a||o||m||d?l.a.createElement(h.a,Object(n.a)({code:e.trim(),language:z,edit:o||m,noexec:m,hidden:d},f)):l.a.createElement(c.a,Object(n.a)({},c.b,{theme:k.theme||s.a,code:e.trim(),language:z}),({className:e,style:t,tokens:a,getLineProps:r,getTokenProps:o})=>l.a.createElement("div",{className:E.a.codeBlockWrapper},l.a.createElement("pre",{ref:N,className:i()(e,E.a.codeBlock),style:t},a.map((e,t)=>{const a=r({line:e,key:t});return w.includes(t+1)&&(a.className=`${a.className} docusaurus-highlight-code-line`),l.a.createElement("div",Object(n.a)({key:t},a),e.map((e,t)=>l.a.createElement("span",Object(n.a)({key:t},o({token:e,key:t})))))})),l.a.createElement("button",{ref:_,type:"button","aria-label":"Copy code to clipboard",className:E.a.copyButton,onClick:C},y?"Copied":"Copy")))}}).call(this,a(53))},298:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(262),o=a(256),i=a(271),c=a(261),s=a(301),m=a(258),u=a(98),d=a.n(u);const g=["January","February","March","April","May","June","July","August","September","October","November","December"];t.a=function(e){const{children:t,frontMatter:a,metadata:n,truncated:u,isBlogPostPage:p=!1}=e,{date:h,permalink:v,tags:E,readingTime:f}=n,{author:b,title:k,image:y}=a,x=a.author_url||a.authorURL,N=a.author_title||a.authorTitle,_=a.author_image_url||a.authorImageURL,w=Object(m.a)(y,{absolute:!0});return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,null,y&&r.a.createElement("meta",{property:"og:image",content:w}),y&&r.a.createElement("meta",{property:"twitter:image",content:w}),y&&r.a.createElement("meta",{name:"twitter:image:alt",content:`Image for ${k}`})),r.a.createElement("article",{className:p?void 0:"margin-bottom--xl"},(()=>{const e=p?"h1":"h2",t=h.substring(0,10).split("-"),a=t[0],n=g[parseInt(t[1],10)-1],o=parseInt(t[2],10);return r.a.createElement("header",null,r.a.createElement(e,{className:Object(l.a)("margin-bottom--sm",d.a.blogPostTitle)},p?k:r.a.createElement(c.a,{to:v},k)),r.a.createElement("div",{className:"margin-vert--md"},r.a.createElement("time",{dateTime:h,className:d.a.blogPostDate},n," ",o,", ",a," ",f&&r.a.createElement(r.a.Fragment,null," \xb7 ",Math.ceil(f)," min read"))),r.a.createElement("div",{className:"avatar margin-vert--md"},_&&r.a.createElement("a",{className:"avatar__photo-link avatar__photo",href:x,target:"_blank",rel:"noreferrer noopener"},r.a.createElement("img",{src:_,alt:b})),r.a.createElement("div",{className:"avatar__intro"},b&&r.a.createElement(r.a.Fragment,null,r.a.createElement("h4",{className:"avatar__name"},r.a.createElement("a",{href:x,target:"_blank",rel:"noreferrer noopener"},b)),r.a.createElement("small",{className:"avatar__subtitle"},N)))))})(),r.a.createElement("section",{className:"markdown"},r.a.createElement(o.a,{components:s.a},t)),(E.length>0||u)&&r.a.createElement("footer",{className:"row margin-vert--lg"},E.length>0&&r.a.createElement("div",{className:"col"},r.a.createElement("strong",null,"Tags:"),E.map(({label:e,permalink:t})=>r.a.createElement(c.a,{key:t,className:"margin-horiz--sm",to:t},e))),u&&r.a.createElement("div",{className:"col text--right"},r.a.createElement(c.a,{to:n.permalink,"aria-label":`Read more about ${k}`},r.a.createElement("strong",null,"Read More"))))))}}}]);