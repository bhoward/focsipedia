(self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[]).push([[6103],{6165:function(e,t,n){"use strict";n.d(t,{Z:function(){return h}});var a=n(3366),r=n(7294),l=n(6010),i=n(2699),o=n(6742),c="sidebar_2ahu",s="sidebarItemTitle_2hhb",m="sidebarItemList_2xAf",u="sidebarItem_2UVv",d="sidebarItemLink_1RT6",g="sidebarItemLinkActive_12pM",p=n(4973);function v(e){var t=e.sidebar;return 0===t.items.length?null:r.createElement("nav",{className:(0,l.Z)(c,"thin-scrollbar"),"aria-label":(0,p.I)({id:"theme.blog.sidebar.navAriaLabel",message:"Blog recent posts navigation",description:"The ARIA label for recent posts in the blog sidebar"})},r.createElement("div",{className:(0,l.Z)(s,"margin-bottom--md")},t.title),r.createElement("ul",{className:m},t.items.map((function(e){return r.createElement("li",{key:e.permalink,className:u},r.createElement(o.Z,{isNavLink:!0,to:e.permalink,className:d,activeClassName:g},e.title))}))))}var f=["sidebar","toc","children"];var h=function(e){var t=e.sidebar,n=e.toc,o=e.children,c=(0,a.Z)(e,f),s=t&&t.items.length>0;return r.createElement(i.Z,c,r.createElement("div",{className:"container margin-vert--lg"},r.createElement("div",{className:"row"},s&&r.createElement("aside",{className:"col col--3"},r.createElement(v,{sidebar:t})),r.createElement("main",{className:(0,l.Z)("col",{"col--7":s,"col--9 col--offset-1":!s}),itemScope:!0,itemType:"http://schema.org/Blog"},o),n&&r.createElement("div",{className:"col col--2"},n))))}},4884:function(e,t,n){"use strict";n.d(t,{Z:function(){return k}});var a=n(7294),r=n(6010),l=n(3905),i=n(4973),o=n(6742),c=n(4996),s=n(6848),m=n(2238),u=n(6146),d="blogPostTitle_GeHD",g="blogPostData_291c",p="blogPostDetailsFull_3kfx",v=n(9817),f="image_1yU8";var h=function(e){var t=e.author,n=t.name,r=t.title,l=t.url,i=t.imageURL;return a.createElement("div",{className:"avatar margin-bottom--sm"},i&&a.createElement(o.Z,{className:"avatar__photo-link avatar__photo",href:l},a.createElement("img",{className:f,src:i,alt:n})),n&&a.createElement("div",{className:"avatar__intro",itemProp:"author",itemScope:!0,itemType:"https://schema.org/Person"},a.createElement("div",{className:"avatar__name"},a.createElement(o.Z,{href:l,itemProp:"url"},a.createElement("span",{itemProp:"name"},n))),r&&a.createElement("small",{className:"avatar__subtitle",itemProp:"description"},r)))},E="authorCol_1R69";function b(e){var t=e.authors,n=e.assets;return 0===t.length?a.createElement(a.Fragment,null):a.createElement("div",{className:"row margin-top--md margin-bottom--sm"},t.map((function(e,t){var l;return a.createElement("div",{className:(0,r.Z)("col col--6",E),key:t},a.createElement(h,{author:Object.assign({},e,{imageURL:null!=(l=n.authorsImageUrls[t])?l:e.imageURL})}))})))}var k=function(e){var t,n,f,h,E=(f=(0,s.c2)().selectMessage,function(e){var t=Math.ceil(e);return f(t,(0,i.I)({id:"theme.blog.post.readingTime.plurals",description:'Pluralized label for "{readingTime} min read". Use as much plural forms (separated by "|") as your language support (see https://www.unicode.org/cldr/cldr-aux/charts/34/supplemental/language_plural_rules.html)',message:"One min read|{readingTime} min read"},{readingTime:t}))}),k=(0,c.C)().withBaseUrl,N=e.children,_=e.frontMatter,y=e.assets,Z=e.metadata,C=e.truncated,x=e.isBlogPostPage,P=void 0!==x&&x,w=Z.date,L=Z.formattedDate,S=Z.permalink,T=Z.tags,z=Z.readingTime,I=Z.title,M=Z.editUrl,H=Z.authors,B=null!=(t=y.image)?t:_.image,A=!P&&C,O=T.length>0;return a.createElement("article",{className:P?void 0:"margin-bottom--xl",itemProp:"blogPost",itemScope:!0,itemType:"http://schema.org/BlogPosting"},(h=P?"h1":"h2",a.createElement("header",null,a.createElement(h,{className:d,itemProp:"headline"},P?I:a.createElement(o.Z,{itemProp:"url",to:S},I)),a.createElement("div",{className:(0,r.Z)(g,"margin-vert--md")},a.createElement("time",{dateTime:w,itemProp:"datePublished"},L),void 0!==z&&a.createElement(a.Fragment,null," \xb7 ",E(z))),a.createElement(b,{authors:H,assets:y}))),B&&a.createElement("meta",{itemProp:"image",content:k(B,{absolute:!0})}),a.createElement("div",{className:"markdown",itemProp:"articleBody"},a.createElement(l.Zo,{components:m.Z},N)),(O||C)&&a.createElement("footer",{className:(0,r.Z)("row docusaurus-mt-lg",(n={},n[p]=P,n))},O&&a.createElement("div",{className:(0,r.Z)("col",{"col--9":A})},a.createElement(v.Z,{tags:T})),P&&M&&a.createElement("div",{className:"col margin-top--sm"},a.createElement(u.Z,{editUrl:M})),A&&a.createElement("div",{className:(0,r.Z)("col text--right",{"col--3":O})},a.createElement(o.Z,{to:Z.permalink,"aria-label":"Read more about "+I},a.createElement("b",null,a.createElement(i.Z,{id:"theme.blog.post.readMore",description:"The label used in blog post item excerpts to link to full blog posts"},"Read More"))))))}},4147:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var a=n(7294),r=n(1217),l=n(6165),i=n(4884),o=n(4973),c=n(6742);var s=function(e){var t=e.nextItem,n=e.prevItem;return a.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,o.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"})},a.createElement("div",{className:"pagination-nav__item"},n&&a.createElement(c.Z,{className:"pagination-nav__link",to:n.permalink},a.createElement("div",{className:"pagination-nav__sublabel"},a.createElement(o.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post"},"Newer Post")),a.createElement("div",{className:"pagination-nav__label"},"\xab ",n.title))),a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},t&&a.createElement(c.Z,{className:"pagination-nav__link",to:t.permalink},a.createElement("div",{className:"pagination-nav__sublabel"},a.createElement(o.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post"},"Older Post")),a.createElement("div",{className:"pagination-nav__label"},t.title," \xbb"))))},m=n(6848),u=n(7588);var d=function(e){var t,n=e.content,o=e.sidebar,c=n.frontMatter,d=n.assets,g=n.metadata,p=g.title,v=g.description,f=g.nextItem,h=g.prevItem,E=g.date,b=g.tags,k=g.authors,N=c.hide_table_of_contents,_=c.keywords,y=c.toc_min_heading_level,Z=c.toc_max_heading_level,C=null!=(t=d.image)?t:c.image;return a.createElement(l.Z,{wrapperClassName:m.kM.wrapper.blogPages,pageClassName:m.kM.page.blogPostPage,sidebar:o,toc:!N&&n.toc&&n.toc.length>0?a.createElement(u.Z,{toc:n.toc,minHeadingLevel:y,maxHeadingLevel:Z}):void 0},a.createElement(r.Z,{title:p,description:v,keywords:_,image:C},a.createElement("meta",{property:"og:type",content:"article"}),a.createElement("meta",{property:"article:published_time",content:E}),k.some((function(e){return e.url}))&&a.createElement("meta",{property:"article:author",content:k.map((function(e){return e.url})).filter(Boolean).join(",")}),b.length>0&&a.createElement("meta",{property:"article:tag",content:b.map((function(e){return e.label})).join(",")})),a.createElement(i.Z,{frontMatter:c,assets:d,metadata:g,isBlogPostPage:!0},a.createElement(n,null)),(f||h)&&a.createElement(s,{nextItem:f,prevItem:h}))}},6146:function(e,t,n){"use strict";n.d(t,{Z:function(){return d}});var a=n(7294),r=n(4973),l=n(7462),i=n(3366),o=n(6010),c="iconEdit_2_ui",s=["className"],m=function(e){var t=e.className,n=(0,i.Z)(e,s);return a.createElement("svg",(0,l.Z)({fill:"currentColor",height:"20",width:"20",viewBox:"0 0 40 40",className:(0,o.Z)(c,t),"aria-hidden":"true"},n),a.createElement("g",null,a.createElement("path",{d:"m34.5 11.7l-3 3.1-6.3-6.3 3.1-3q0.5-0.5 1.2-0.5t1.1 0.5l3.9 3.9q0.5 0.4 0.5 1.1t-0.5 1.2z m-29.5 17.1l18.4-18.5 6.3 6.3-18.4 18.4h-6.3v-6.2z"})))},u=n(6848);function d(e){var t=e.editUrl;return a.createElement("a",{href:t,target:"_blank",rel:"noreferrer noopener",className:u.kM.common.editThisPage},a.createElement(m,null),a.createElement(r.Z,{id:"theme.common.editThisPage",description:"The link label to edit the current page"},"Edit this page"))}},7588:function(e,t,n){"use strict";n.d(t,{Z:function(){return m}});var a=n(7462),r=n(3366),l=n(7294),i=n(6010),o=n(5002),c="tableOfContents_35-E",s=["className"];var m=function(e){var t=e.className,n=(0,r.Z)(e,s);return l.createElement("div",{className:(0,i.Z)(c,"thin-scrollbar",t)},l.createElement(o.Z,(0,a.Z)({},n,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},5002:function(e,t,n){"use strict";n.d(t,{Z:function(){return s}});var a=n(7462),r=n(3366),l=n(7294),i=n(6848),o=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function c(e){var t=e.toc,n=e.className,a=e.linkClassName,r=e.isChild;return t.length?l.createElement("ul",{className:r?void 0:n},t.map((function(e){return l.createElement("li",{key:e.id},l.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),l.createElement(c,{isChild:!0,toc:e.children,className:n,linkClassName:a}))}))):null}function s(e){var t=e.toc,n=e.className,s=void 0===n?"table-of-contents table-of-contents__left-border":n,m=e.linkClassName,u=void 0===m?"table-of-contents__link":m,d=e.linkActiveClassName,g=void 0===d?void 0:d,p=e.minHeadingLevel,v=e.maxHeadingLevel,f=(0,r.Z)(e,o),h=(0,i.LU)(),E=null!=p?p:h.tableOfContents.minHeadingLevel,b=null!=v?v:h.tableOfContents.maxHeadingLevel,k=(0,i.DA)({toc:t,minHeadingLevel:E,maxHeadingLevel:b}),N=(0,l.useMemo)((function(){if(u&&g)return{linkClassName:u,linkActiveClassName:g,minHeadingLevel:E,maxHeadingLevel:b}}),[u,g,E,b]);return(0,i.Si)(N),l.createElement(c,(0,a.Z)({toc:k,className:s,linkClassName:u},f))}},9817:function(e,t,n){"use strict";n.d(t,{Z:function(){return g}});var a=n(7294),r=n(6010),l=n(4973),i=n(6742),o="tag_1Okp",c="tagRegular_3MiF",s="tagWithCount_1HU1";var m=function(e){var t,n=e.permalink,l=e.name,m=e.count;return a.createElement(i.Z,{href:n,className:(0,r.Z)(o,(t={},t[c]=!m,t[s]=m,t))},l,m&&a.createElement("span",null,m))},u="tags_2ga9",d="tag_11ep";function g(e){var t=e.tags;return a.createElement(a.Fragment,null,a.createElement("b",null,a.createElement(l.Z,{id:"theme.tags.tagsListLabel",description:"The label alongside a tag list"},"Tags:")),a.createElement("ul",{className:(0,r.Z)(u,"padding--none","margin-left--sm")},t.map((function(e){var t=e.label,n=e.permalink;return a.createElement("li",{key:n,className:d},a.createElement(m,{name:t,permalink:n}))}))))}},9216:function(e,t,n){!function(e){"use strict";var t="and as assert begin class constraint done downto exception external fun esfun function functor include inherit initializer lazy let pub mutable new nonrec object of open or pri rec then to type val virtualtry catch finally do else for if switch while import library export part of show hide is as".split(" "),n="try catch match with else for if switch while do begin end in module sig struct".split(" "),a="unit int char exn string int32 int64 float bool option mod land lor lxor lsl lsr asr".split(" "),r="true false Error Ok None Some".split(" ");function l(e){for(var t={},n=0;n<e.length;++n)t[e[n]]=!0;return t}function i(e,t){for(var n=0;null!=e.next();){if(e.eat("'")&&n<=4)return t.tokenize=null,"string";if(!/\w/.test(e.peek()))return t.tokenize=null,"variable-2";n++}return t.tokenize=null,null}function o(e,t){for(var n,a=!1,r=!1;null!=(n=e.next());){if('"'===n&&!r){a=!0;break}r=!r&&"\\"===n}return a&&!r&&(t.tokenize=!1),"string"}function c(e){return function(t,n){for(var a;a=t.next();){if("*"==a&&t.eat("/")){if(1==e){n.tokenize=null;break}return n.tokenize=c(e-1),n.tokenize(t,n)}if("/"==a&&t.eat("*"))return n.tokenize=c(e+1),n.tokenize(t,n)}return"comment"}}function s(e,t){for(var n,a;t.longString&&null!=(a=e.next());)"|"===n&&"}"===a&&(t.longString=!1),n=a;return t.longString||(t.tokenize=!1),"string"}e.defineMIME("application/reason",{name:"clike",keywords:l(t),blockKeywords:l(n),atoms:l(a),builtin:l(r),hooks:{"{":function(e,t){if(e.eat("|"))return t.longString=!0,t.tokenize=s,t.tokenize(e,t)},"[":function(e,t){return e.eat("|")?"operator":null},"|":function(e,t){return e.eat("]"),"operator"},'"':function(e,t){return t.tokenize=o,t.tokenize(e,t)},"'":function(e,t){return t.tokenize=i,t.tokenize(e,t)},"/":function(e,t){return!!e.eat("*")&&(t.tokenize=c(1),t.tokenize(e,t))}}}),e.registerHelper("hintWords","application/reason",t.concat(a).concat(r)),e.defineMode("reason",(function(t){return Object.assign(e.getMode(t,"application/reason"),{lineComment:void 0})}),"clike")}(n(4631),n(9762))},1761:function(e,t,n){"use strict";n.d(t,{Z:function(){return H}});var a=n(7462),r=n(3366),l=n(7294),i=n(4184),o=n.n(i),c=n(4544),s=n(7552),m=n(2152),u=n.n(m),d=n(7594),g=n.n(d),p=n(2263),v=n(1721),f=n(2404),h=n.n(f)()({}),E=function(e,t){return function(n){function a(){return n.apply(this,arguments)||this}(0,v.Z)(a,n);var r=a.prototype;return r.componentDidCatch=function(e){t(e)},r.render=function(){return"function"==typeof e?l.createElement(e,null):e},a}(l.Component)},b=function(e,t,n){"reason"===t?evaluator.reasonSyntax():evaluator.mlSyntax();var a="",r="",i="";evaluator.execute(e).forEach((function(e){var t=e.value,n=t.value,l=t.stdout,o=t.stderr;"- : unit = ()"!==n.trim()&&(a+=n),r+=l,i+=o}));var o=null;""===a.trim()||n||(o=l.createElement("pre",{style:{color:"green"}},a));var c=null;""!==r&&(c=l.createElement("pre",{dangerouslySetInnerHTML:{__html:r}}));var s=null;return""!==i&&(s=l.createElement("pre",{style:{color:"red"}},i)),l.createElement("div",null,o,null!==o&&null!==c?l.createElement("hr",null):null,c,null===o&&null===c||null===s?null:l.createElement("hr",null),s)},k=function(e){function t(){return e.apply(this,arguments)||this}(0,v.Z)(t,e);var n=t.prototype;return n.componentDidMount=function(){var e=this.props,t=e.code,n=e.language,a=e.noexec,r=e.hidden;a||this.transpile({code:t,language:n,hidden:r})},n.onChange=function(e){var t=this.props,n=t.language,a=t.hidden;this.transpile({code:e,language:n,hidden:a})},n.executeCode=function(e){var t=this.props,n=t.language,a=t.hidden;this.transpile({code:e,language:n,hidden:a})},n.resetInterpreter=function(){evaluator.resetLocal()},n.onError=function(e){this.setState({error:e.toString()})},n.transpile=function(e){var t=this,n={code:e.code,language:e.language,hidden:e.hidden},a={unsafeWrapperError:void 0,error:void 0};try{!function(e,t,n){var a=e.code,r=void 0===a?"":a,l=e.language,i=void 0===l?"ocaml":l,o=e.hidden;t(E(b(r,i,void 0!==o&&o),n))}(n,(function(e){return t.setState(Object.assign({},a,{element:e}))}),(function(e){return t.setState({element:void 0,error:e.toString()})}))}catch(r){this.setState(Object.assign({},a,{error:r.toString()}))}},n.render=function(){var e=this.props,t=e.children,n=e.code,a=e.language,r=e.hidden,i=e.disabled;return l.createElement(h.Provider,{value:Object.assign({},this.state,{code:n,language:a,hidden:r,disabled:i,onError:this.onError.bind(this),onChange:this.onChange.bind(this),executeCode:this.executeCode.bind(this),resetInterpreter:this.resetInterpreter.bind(this)})},t)},t}(l.Component);k.defaultProps={code:"",language:"reason",disabled:!1};var N=n(9656);"undefined"!=typeof navigator&&(n(4631),n(8677),n(3999),n(4328),n(2801),n(4504),n(3412),n(1707),n(21),n(8991),n(2587),n(9216));var _=function(e){function t(t){var n;n=e.call(this,t)||this;var a=t.code;return n.state={code:a},n}return(0,v.Z)(t,e),t.prototype.render=function(){var e=this;return l.createElement(h.Consumer,null,(function(t){var n=t.language,a=t.disabled,r=t.executeCode,i=t.resetInterpreter;return l.createElement("div",{onKeyDown:function(t){t.shiftKey&&t.ctrlKey&&"Enter"===t.key&&i(),t.ctrlKey&&"Enter"===t.key&&r(e.state.code)}},l.createElement(N.fk,{value:e.state.code,options:{mode:"reason"===n?"reason":"text/x-ocaml",theme:"material",keyMap:"sublime",extraKeys:{"Ctrl-Space":"autocomplete"},lineNumbers:!0,tabSize:2,matchBrackets:!0,autoCloseBrackets:!0,readOnly:a,viewportMargin:1/0},editorDidMount:function(e){},onBeforeChange:function(t,n,a){e.setState({code:a})},onChange:function(e,t,n){}}),a?null:l.createElement("div",null,l.createElement("button",{type:"button","aria-label":"Execute code",onClick:function(){return r(e.state.code)}},"Execute")))}))},t}(l.Component),y=["Component"];function Z(e){var t=e.Component,n=(0,r.Z)(e,y);return l.createElement(t,n,l.createElement(h.Consumer,null,(function(e){var t=e.element;return t&&l.createElement(t,null)})))}Z.defaultProps={Component:"div"};var C=Z,x="playgroundPreview_29OS",P=["code","language","edit","noexec","hidden"];var w=function(e){var t=e.code,n=e.language,i=e.edit,o=e.noexec,c=e.hidden,s=(0,r.Z)(e,P);return l.createElement(k,(0,a.Z)({code:t,language:n,hidden:c,noexec:o,disabled:!i},s),c?null:l.createElement(_,{code:t}),l.createElement("div",{className:x},l.createElement(C,{Component:"div"})))},L="codeBlock_6upA",S="codeBlockWrapper_cAds",T="copyButton_2e3i",z=n(7410),I=["children","className","demo","edit","fix","hidden","metastring"];(void 0!==n.g?n.g:window).Prism=z.default,n(4371),n(8439);var M=/{([\d,-]+)}/,H=function(e){var t=e.children,n=e.className,i=e.demo,m=e.edit,d=e.fix,v=e.hidden,f=e.metastring,h=(0,r.Z)(e,I),E=(0,p.Z)().siteConfig.themeConfig.prism,b=void 0===E?{}:E,k=(0,l.useState)(!1),N=k[0],_=k[1],y=(0,l.useRef)(null),Z=(0,l.useRef)(null),C=[];if(f&&M.test(f)){var x=f.match(M)[1];C=g().parse(x).filter((function(e){return e>0}))}(0,l.useEffect)((function(){var e;return Z.current&&(e=new(u())(Z.current,{target:function(){return y.current}})),function(){e&&e.destroy()}}),[Z.current,y.current]);var P=function(){window.getSelection().empty(),_(!0),setTimeout((function(){return _(!1)}),2e3)},z=n&&n.replace(/language-/,"");return!z&&b.defaultLanguage&&(z=b.defaultLanguage),i||m||d||v?l.createElement(w,(0,a.Z)({code:t.trim(),language:z,edit:m||d,noexec:d,hidden:v},h)):l.createElement(c.ZP,(0,a.Z)({},c.lG,{theme:b.theme||s.Z,code:t.trim(),language:z}),(function(e){var t=e.className,n=e.style,r=e.tokens,i=e.getLineProps,c=e.getTokenProps;return l.createElement("div",{className:S},l.createElement("pre",{ref:y,className:o()(t,L),style:n},r.map((function(e,t){var n=i({line:e,key:t});return C.includes(t+1)&&(n.className=n.className+" docusaurus-highlight-code-line"),l.createElement("div",(0,a.Z)({key:t},n),e.map((function(e,t){return l.createElement("span",(0,a.Z)({key:t},c({token:e,key:t})))})))}))),l.createElement("button",{ref:Z,type:"button","aria-label":"Copy code to clipboard",className:T,onClick:P},N?"Copied":"Copy"))}))}}}]);