(self.webpackChunkangular_material_extended_app=self.webpackChunkangular_material_extended_app||[]).push([[370],{370:D=>{const E="[A-Za-z$_][0-9A-Za-z$_]*",I=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],O=["true","false","null","undefined","NaN","Infinity"],M=[].concat(["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],["arguments","this","super","console","window","document","localStorage","module","global"],["Intl","DataView","Number","Math","Date","String","RegExp","Object","Function","Boolean","Error","Symbol","Set","Map","WeakSet","WeakMap","Proxy","Reflect","JSON","Promise","Float64Array","Int16Array","Int32Array","Int8Array","Uint16Array","Uint32Array","Float32Array","Array","Uint8Array","Uint8ClampedArray","ArrayBuffer","BigInt64Array","BigUint64Array","BigInt"],["EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"]);function w(e){return A("(?=",e,")")}function A(...e){return e.map(t=>function k(e){return e?"string"==typeof e?e:e.source:null}(t)).join("")}D.exports=function $(e){const c={$pattern:E,keyword:I.concat(["type","namespace","typedef","interface","public","private","protected","implements","declare","abstract","readonly"]),literal:O,built_in:M.concat(["any","void","number","boolean","string","object","never","enum"])},l={className:"meta",begin:"@[A-Za-z$_][0-9A-Za-z$_]*"},d=(r,T,m)=>{const o=r.contains.findIndex(N=>N.label===T);if(-1===o)throw new Error("can not find mode to replace");r.contains.splice(o,1,m)},n=function U(e){const t=E,s={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(i,p)=>{const f=i[0].length+i.index,R=i.input[f];"<"!==R?">"===R&&(((i,{after:p})=>{const f="</"+i[0].slice(1);return-1!==i.input.indexOf(f,p)})(i,{after:f})||p.ignoreMatch()):p.ignoreMatch()}},a={$pattern:E,keyword:I,literal:O,built_in:M},u="[0-9](_?[0-9])*",c=`\\.(${u})`,l="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",d={className:"number",variants:[{begin:`(\\b(${l})((${c})|\\.)?|(${c}))[eE][+-]?(${u})\\b`},{begin:`\\b(${l})\\b((${c})\\b|\\.)?|(${c})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},n={className:"subst",begin:"\\$\\{",end:"\\}",keywords:a,contains:[]},_={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,n],subLanguage:"xml"}},r={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,n],subLanguage:"css"}},T={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,n]},o={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+",contains:[{className:"type",begin:"\\{",end:"\\}",relevance:0},{className:"variable",begin:t+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},N=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,_,r,T,d,e.REGEXP_MODE];n.contains=N.concat({begin:/\{/,end:/\}/,keywords:a,contains:["self"].concat(N)});const C=[].concat(o,n.contains),y=C.concat([{begin:/\(/,end:/\)/,keywords:a,contains:["self"].concat(C)}]),S={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:y};return{name:"Javascript",aliases:["js","jsx","mjs","cjs"],keywords:a,exports:{PARAMS_CONTAINS:y},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,_,r,T,o,d,{begin:A(/[{,\n]\s*/,w(A(/(((\/\/.*$)|(\/\*(\*[^/]|[^*])*\*\/))\s*)*/,t+"\\s*:"))),relevance:0,contains:[{className:"attr",begin:t+w("\\s*:"),relevance:0}]},{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",contains:[o,e.REGEXP_MODE,{className:"function",begin:"(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:a,contains:y}]}]},{begin:/,/,relevance:0},{className:"",begin:/\s/,end:/\s*/,skip:!0},{variants:[{begin:"<>",end:"</>"},{begin:s.begin,"on:begin":s.isTrulyOpeningTag,end:s.end}],subLanguage:"xml",contains:[{begin:s.begin,end:s.end,skip:!0,contains:["self"]}]}],relevance:0},{className:"function",beginKeywords:"function",end:/[{;]/,excludeEnd:!0,keywords:a,contains:["self",e.inherit(e.TITLE_MODE,{begin:t}),S],illegal:/%/},{beginKeywords:"while if switch catch for"},{className:"function",begin:e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,contains:[S,e.inherit(e.TITLE_MODE,{begin:t})]},{variants:[{begin:"\\."+t},{begin:"\\$"+t}],relevance:0},{className:"class",beginKeywords:"class",end:/[{;=]/,excludeEnd:!0,illegal:/[:"[\]]/,contains:[{beginKeywords:"extends"},e.UNDERSCORE_TITLE_MODE]},{begin:/\b(?=constructor)/,end:/[{;]/,excludeEnd:!0,contains:[e.inherit(e.TITLE_MODE,{begin:t}),"self",S]},{begin:"(get|set)\\s+(?="+t+"\\()",end:/\{/,keywords:"get set",contains:[e.inherit(e.TITLE_MODE,{begin:t}),{begin:/\(\)/},S]},{begin:/\$[(.]/}]}}(e);return Object.assign(n.keywords,c),n.exports.PARAMS_CONTAINS.push(l),n.contains=n.contains.concat([l,{beginKeywords:"namespace",end:/\{/,excludeEnd:!0},{beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:"interface extends"}]),d(n,"shebang",e.SHEBANG()),d(n,"use_strict",{className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/}),n.contains.find(r=>"function"===r.className).relevance=0,Object.assign(n,{name:"TypeScript",aliases:["ts","tsx"]}),n}}}]);