(self.webpackChunkangular_material_extended_app=self.webpackChunkangular_material_extended_app||[]).push([[573],{8573:function(e){function n(e){return e?"string"==typeof e?e:e.source:null}function a(e){return s("(?=",e,")")}function s(){for(var e=arguments.length,a=new Array(e),s=0;s<e;s++)a[s]=arguments[s];return a.map(function(e){return n(e)}).join("")}function t(){for(var e=arguments.length,a=new Array(e),s=0;s<e;s++)a[s]=arguments[s];return"("+a.map(function(e){return n(e)}).join("|")+")"}e.exports=function(e){var n=s(/[A-Z_]/,s("(",/[A-Z0-9_.-]*:/,")?"),/[A-Z0-9_.-]*/),i={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},r={begin:/\s/,contains:[{className:"meta-keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},c=e.inherit(r,{begin:/\(/,end:/\)/}),l=e.inherit(e.APOS_STRING_MODE,{className:"meta-string"}),g=e.inherit(e.QUOTE_STRING_MODE,{className:"meta-string"}),m={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[A-Za-z0-9._:-]+/,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[i]},{begin:/'/,end:/'/,contains:[i]},{begin:/[^\s"'=<>`]+/}]}]}]};return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[r,g,l,c,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[r,c,g,l]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},i,{className:"meta",begin:/<\?xml/,end:/\?>/,relevance:10},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[m],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[m],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:s(/</,a(s(n,t(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:n,relevance:0,starts:m}]},{className:"tag",begin:s(/<\//,a(s(n,/>/))),contains:[{className:"name",begin:n,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}}}]);