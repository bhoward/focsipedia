(()=>{"use strict";var e,a,c,f,d,b={},t={};function r(e){var a=t[e];if(void 0!==a)return a.exports;var c=t[e]={id:e,loaded:!1,exports:{}};return b[e].call(c.exports,c,c.exports,r),c.loaded=!0,c.exports}r.m=b,r.c=t,e=[],r.O=(a,c,f,d)=>{if(!c){var b=1/0;for(i=0;i<e.length;i++){c=e[i][0],f=e[i][1],d=e[i][2];for(var t=!0,o=0;o<c.length;o++)(!1&d||b>=d)&&Object.keys(r.O).every((e=>r.O[e](c[o])))?c.splice(o--,1):(t=!1,d<b&&(b=d));if(t){e.splice(i--,1);var n=f();void 0!==n&&(a=n)}}return a}d=d||0;for(var i=e.length;i>0&&e[i-1][2]>d;i--)e[i]=e[i-1];e[i]=[c,f,d]},r.n=e=>{var a=e&&e.__esModule?()=>e.default:()=>e;return r.d(a,{a:a}),a},c=Object.getPrototypeOf?e=>Object.getPrototypeOf(e):e=>e.__proto__,r.t=function(e,f){if(1&f&&(e=this(e)),8&f)return e;if("object"==typeof e&&e){if(4&f&&e.__esModule)return e;if(16&f&&"function"==typeof e.then)return e}var d=Object.create(null);r.r(d);var b={};a=a||[null,c({}),c([]),c(c)];for(var t=2&f&&e;"object"==typeof t&&!~a.indexOf(t);t=c(t))Object.getOwnPropertyNames(t).forEach((a=>b[a]=()=>e[a]));return b.default=()=>e,r.d(d,b),d},r.d=(e,a)=>{for(var c in a)r.o(a,c)&&!r.o(e,c)&&Object.defineProperty(e,c,{enumerable:!0,get:a[c]})},r.f={},r.e=e=>Promise.all(Object.keys(r.f).reduce(((a,c)=>(r.f[c](e,a),a)),[])),r.u=e=>"assets/js/"+({53:"887e9e72",83:"531bf47a",111:"edbe8dda",159:"90816498",169:"2521ba2a",350:"1c2c58ec",366:"d801e154",426:"9cc64519",430:"338b6b99",434:"692feb31",492:"f7211e98",535:"3d370cef",542:"115f03d5",547:"d2a580c3",569:"045c9a30",854:"8c802a17",862:"e2dba911",864:"ae2fd998",900:"82f57dd2",998:"d4c033f7",1095:"c0477def",1102:"9d5bd4bf",1207:"aa91be57",1263:"ba03004b",1346:"4fc404a6",1372:"1db64337",1423:"0f895079",1440:"d6aa71fb",1604:"5d7cf521",1613:"730a1fdc",1657:"ae4357e4",1736:"9a745303",2003:"2d3afc23",2020:"d717e0ac",2043:"c4d201c4",2059:"bbea11a2",2197:"935f2afb",2394:"430fae5b",2452:"39049284",2511:"64ba00ca",2535:"814f3328",2724:"d626f22a",2758:"7d0d9eab",2804:"7b7dc293",2928:"9a3a4d8f",2931:"e20655c8",3089:"a6aa9e1f",3115:"3c4c96fb",3138:"684091df",3334:"e68de3f2",3464:"b438ba17",3487:"e812cf63",3544:"9596751e",3554:"9625aa1f",3608:"9e4087bc",3650:"4743ef7d",3676:"e57e3c72",3798:"462b84f2",3909:"5cafca18",4038:"2f0289c0",4081:"b90cdea9",4107:"6525e831",4133:"ff0baaef",4195:"c4f5d8e4",4205:"9f936b57",4242:"c3d192f3",4265:"699c7e9d",4304:"b2bd58cf",4359:"55290f28",4809:"c25f40bd",4875:"c49debee",5086:"afde2d75",5145:"ec9d4ac6",5225:"8097f560",5342:"aa338efb",5410:"c37041d7",5629:"19b88659",5670:"c47a433b",5827:"a769043c",5902:"6159c04d",5968:"6944a868",5986:"bdede482",6103:"ccc49370",6110:"595a24bc",6152:"38824ccb",6157:"8f288c8b",6226:"16d4e3ff",6280:"a7eaebc7",6295:"b4558d24",6307:"353e71a0",6350:"47b95b5d",6364:"f3b48e67",6434:"fc92a54d",6548:"b74da158",6563:"60877271",6604:"87bbbd36",6644:"352ccb1b",6702:"f3dd969c",6828:"62a6e918",6993:"b9921ec2",7019:"fc596112",7043:"94ead6cb",7073:"5c170316",7153:"1c5e4b13",7175:"d251b929",7330:"73b482e4",7373:"02c29358",7413:"e24b780c",7465:"0e27280d",7522:"1bee9317",7537:"8faf0d7b",7538:"d518447d",7570:"05084e9b",7601:"4f5e2c4c",7604:"147c22c3",7633:"4a52a078",7787:"78bee030",7822:"367b06be",7856:"0584479d",7871:"e39ba5f0",7904:"b6285651",7918:"17896441",7920:"1a4e3797",7939:"56b0dafd",7991:"f153f8ca",8014:"38c82bd4",8202:"30030337",8207:"67b6c227",8216:"433b5e3d",8489:"368ae4f1",8539:"25191bc1",8599:"221e3c81",8705:"d30a9835",8835:"548c092f",8926:"da5ec5f2",9073:"42fcf9a4",9131:"ced71b19",9233:"8c0fccf1",9349:"92e20b57",9352:"e005adca",9418:"b5fc1b26",9514:"1be78505",9525:"969f8de6",9654:"eceeb504",9688:"58f482d7",9689:"8740c9db",9718:"d0fee155",9745:"0d2142da",9791:"0d2b1f41",9865:"1619feef",9907:"0c8e170c",9952:"6f93fe86"}[e]||e)+"."+{53:"97c93313",83:"aa3a0333",111:"06bd406b",159:"679b2a0c",169:"c93b1b59",350:"83acd2e6",366:"fab745b5",426:"2e173d1f",430:"494efd48",434:"5b0c77c0",492:"b1484939",535:"2f986b46",542:"11c7dc5d",547:"f5358f39",569:"24ac7fab",854:"17717433",862:"d35658a6",864:"fb77cb69",900:"b8c75810",998:"34a8d521",1095:"f5e5838f",1102:"2f80b481",1207:"ccb4ccac",1263:"70506914",1346:"1fee1ffa",1372:"685a10e1",1423:"2f51a9ce",1426:"86e9bfd4",1440:"ce99b7a1",1604:"c0317c4d",1613:"f4b69033",1657:"6d3df977",1736:"20f7ee65",2003:"443effd9",2020:"7b93ffc6",2043:"3e0090c7",2059:"80645f1d",2197:"7b7fe83b",2394:"0608efac",2452:"a6c3a5c5",2511:"32c64260",2535:"615d5808",2724:"e94e69f6",2758:"613d2023",2804:"719c73f3",2928:"65df8ed1",2931:"c774e90b",3089:"8bf17105",3115:"fa904d73",3138:"536e3c0e",3334:"46f15118",3464:"a01a2fac",3487:"2dda79d1",3544:"6f7ba418",3554:"ba735f7e",3608:"9f0d5d34",3650:"588e8977",3676:"aa8a5a5c",3798:"e7446ab8",3909:"19095e1b",4038:"11708ed3",4081:"de9e9bc2",4107:"185f9d3d",4133:"68c03069",4195:"c030d8ec",4205:"cb30ad3f",4242:"37b886bd",4265:"e7a2e17d",4304:"0a401dd9",4359:"905187ba",4809:"56328231",4875:"eff729f3",4972:"b0ae2a56",5086:"e599bcac",5145:"becd1ad9",5225:"d28091cf",5342:"379ed18b",5410:"a2bfb87c",5629:"0a551034",5670:"6f7fd048",5827:"e305bfb9",5902:"2cae6ff1",5968:"63d3184e",5986:"c0701e36",6048:"8f434e3a",6103:"c61c762b",6110:"e7f36fea",6152:"f2b97ada",6157:"c8f31b49",6226:"37cfd221",6280:"ce4703e3",6295:"b386875e",6307:"a7526dd9",6350:"92c2029e",6364:"7922c0cc",6434:"8a7ff1df",6548:"be6b1071",6563:"3fbd54fb",6604:"766f7793",6644:"fc33ee14",6702:"45e28850",6828:"3aa38f50",6879:"645b8a4d",6945:"d034f29f",6993:"9f35cc73",7019:"593f0e78",7043:"21cad755",7073:"1bafb8b4",7153:"3e0f34c8",7175:"bb70823d",7330:"47c39cc6",7373:"94ff7dcf",7413:"a18fef99",7465:"76662ae4",7522:"695a169d",7537:"4420393f",7538:"a445a1b1",7570:"abd523c9",7601:"d72693cc",7604:"90d22baf",7633:"b23e540f",7787:"7f2d73d9",7822:"988d6f51",7856:"62b6149e",7871:"a611404f",7904:"207b3440",7918:"196fda9a",7920:"e737ecc2",7939:"6bf6f7d6",7991:"d77fa5fb",8014:"5efbd72c",8202:"bc0d74b7",8207:"8a6f4931",8216:"c75791d6",8489:"9e5296bb",8539:"9ae69dd2",8599:"84563440",8705:"686f00d6",8835:"7d9ad0a6",8894:"7d26e408",8926:"f8826218",9073:"f01f7f6d",9131:"9c272040",9233:"e8206e8e",9349:"eb62a9e3",9352:"6e8f3bce",9418:"98632024",9514:"95e51145",9525:"c8d70bbb",9654:"2dc20fd1",9688:"ae2b21e9",9689:"b74ed735",9718:"51fa2acc",9745:"e3fea2a3",9791:"db7d6e1d",9865:"5c32e4af",9907:"adae3d16",9952:"b9f8896d"}[e]+".js",r.miniCssF=e=>{},r.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),r.o=(e,a)=>Object.prototype.hasOwnProperty.call(e,a),f={},d="focsipedia:",r.l=(e,a,c,b)=>{if(f[e])f[e].push(a);else{var t,o;if(void 0!==c)for(var n=document.getElementsByTagName("script"),i=0;i<n.length;i++){var u=n[i];if(u.getAttribute("src")==e||u.getAttribute("data-webpack")==d+c){t=u;break}}t||(o=!0,(t=document.createElement("script")).charset="utf-8",t.timeout=120,r.nc&&t.setAttribute("nonce",r.nc),t.setAttribute("data-webpack",d+c),t.src=e),f[e]=[a];var l=(a,c)=>{t.onerror=t.onload=null,clearTimeout(s);var d=f[e];if(delete f[e],t.parentNode&&t.parentNode.removeChild(t),d&&d.forEach((e=>e(c))),a)return a(c)},s=setTimeout(l.bind(null,void 0,{type:"timeout",target:t}),12e4);t.onerror=l.bind(null,t.onerror),t.onload=l.bind(null,t.onload),o&&document.head.appendChild(t)}},r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.p="/focsipedia/",r.gca=function(e){return e={17896441:"7918",30030337:"8202",39049284:"2452",60877271:"6563",90816498:"159","887e9e72":"53","531bf47a":"83",edbe8dda:"111","2521ba2a":"169","1c2c58ec":"350",d801e154:"366","9cc64519":"426","338b6b99":"430","692feb31":"434",f7211e98:"492","3d370cef":"535","115f03d5":"542",d2a580c3:"547","045c9a30":"569","8c802a17":"854",e2dba911:"862",ae2fd998:"864","82f57dd2":"900",d4c033f7:"998",c0477def:"1095","9d5bd4bf":"1102",aa91be57:"1207",ba03004b:"1263","4fc404a6":"1346","1db64337":"1372","0f895079":"1423",d6aa71fb:"1440","5d7cf521":"1604","730a1fdc":"1613",ae4357e4:"1657","9a745303":"1736","2d3afc23":"2003",d717e0ac:"2020",c4d201c4:"2043",bbea11a2:"2059","935f2afb":"2197","430fae5b":"2394","64ba00ca":"2511","814f3328":"2535",d626f22a:"2724","7d0d9eab":"2758","7b7dc293":"2804","9a3a4d8f":"2928",e20655c8:"2931",a6aa9e1f:"3089","3c4c96fb":"3115","684091df":"3138",e68de3f2:"3334",b438ba17:"3464",e812cf63:"3487","9596751e":"3544","9625aa1f":"3554","9e4087bc":"3608","4743ef7d":"3650",e57e3c72:"3676","462b84f2":"3798","5cafca18":"3909","2f0289c0":"4038",b90cdea9:"4081","6525e831":"4107",ff0baaef:"4133",c4f5d8e4:"4195","9f936b57":"4205",c3d192f3:"4242","699c7e9d":"4265",b2bd58cf:"4304","55290f28":"4359",c25f40bd:"4809",c49debee:"4875",afde2d75:"5086",ec9d4ac6:"5145","8097f560":"5225",aa338efb:"5342",c37041d7:"5410","19b88659":"5629",c47a433b:"5670",a769043c:"5827","6159c04d":"5902","6944a868":"5968",bdede482:"5986",ccc49370:"6103","595a24bc":"6110","38824ccb":"6152","8f288c8b":"6157","16d4e3ff":"6226",a7eaebc7:"6280",b4558d24:"6295","353e71a0":"6307","47b95b5d":"6350",f3b48e67:"6364",fc92a54d:"6434",b74da158:"6548","87bbbd36":"6604","352ccb1b":"6644",f3dd969c:"6702","62a6e918":"6828",b9921ec2:"6993",fc596112:"7019","94ead6cb":"7043","5c170316":"7073","1c5e4b13":"7153",d251b929:"7175","73b482e4":"7330","02c29358":"7373",e24b780c:"7413","0e27280d":"7465","1bee9317":"7522","8faf0d7b":"7537",d518447d:"7538","05084e9b":"7570","4f5e2c4c":"7601","147c22c3":"7604","4a52a078":"7633","78bee030":"7787","367b06be":"7822","0584479d":"7856",e39ba5f0:"7871",b6285651:"7904","1a4e3797":"7920","56b0dafd":"7939",f153f8ca:"7991","38c82bd4":"8014","67b6c227":"8207","433b5e3d":"8216","368ae4f1":"8489","25191bc1":"8539","221e3c81":"8599",d30a9835:"8705","548c092f":"8835",da5ec5f2:"8926","42fcf9a4":"9073",ced71b19:"9131","8c0fccf1":"9233","92e20b57":"9349",e005adca:"9352",b5fc1b26:"9418","1be78505":"9514","969f8de6":"9525",eceeb504:"9654","58f482d7":"9688","8740c9db":"9689",d0fee155:"9718","0d2142da":"9745","0d2b1f41":"9791","1619feef":"9865","0c8e170c":"9907","6f93fe86":"9952"}[e]||e,r.p+r.u(e)},(()=>{var e={1303:0,532:0};r.f.j=(a,c)=>{var f=r.o(e,a)?e[a]:void 0;if(0!==f)if(f)c.push(f[2]);else if(/^(1303|532)$/.test(a))e[a]=0;else{var d=new Promise(((c,d)=>f=e[a]=[c,d]));c.push(f[2]=d);var b=r.p+r.u(a),t=new Error;r.l(b,(c=>{if(r.o(e,a)&&(0!==(f=e[a])&&(e[a]=void 0),f)){var d=c&&("load"===c.type?"missing":c.type),b=c&&c.target&&c.target.src;t.message="Loading chunk "+a+" failed.\n("+d+": "+b+")",t.name="ChunkLoadError",t.type=d,t.request=b,f[1](t)}}),"chunk-"+a,a)}},r.O.j=a=>0===e[a];var a=(a,c)=>{var f,d,b=c[0],t=c[1],o=c[2],n=0;if(b.some((a=>0!==e[a]))){for(f in t)r.o(t,f)&&(r.m[f]=t[f]);if(o)var i=o(r)}for(a&&a(c);n<b.length;n++)d=b[n],r.o(e,d)&&e[d]&&e[d][0](),e[d]=0;return r.O(i)},c=self.webpackChunkfocsipedia=self.webpackChunkfocsipedia||[];c.forEach(a.bind(null,0)),c.push=a.bind(null,c.push.bind(c))})()})();