(function(e){function t(t){for(var a,o,s=t[0],l=t[1],u=t[2],c=0,f=[];c<s.length;c++)o=s[c],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&f.push(i[o][0]),i[o]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(e[a]=l[a]);d&&d(t);while(f.length)f.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var e,t=0;t<r.length;t++){for(var n=r[t],a=!0,s=1;s<n.length;s++){var l=n[s];0!==i[l]&&(a=!1)}a&&(r.splice(t--,1),e=o(o.s=n[0]))}return e}var a={},i={app:0},r=[];function o(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=a,o.d=function(e,t,n){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)o.d(n,a,function(t){return e[t]}.bind(null,a));return n},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/vue-country-code/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],l=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var d=l;r.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"034f":function(e,t,n){"use strict";var a=n("85ec"),i=n.n(a);i.a},"0538":function(e,t,n){"use strict";var a=n("2d17"),i=n.n(a);i.a},"2d17":function(e,t,n){},"3c6f":function(e,t,n){"use strict";var a=n("fee6"),i=n.n(a);i.a},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("h1",[e._v("Telephone Country Select")]),n("h2",{staticStyle:{color:"#999"}},[e._v("made with ❤ by Mon.")]),n("div",{staticStyle:{margin:"20px auto"}},[n("vue-country-code",{attrs:{preferredCountries:["vn","us","gb"],defaultCountry:""},on:{onSelect:e.onSelect}})],1),n("div",[n("code",[e._v(e._s(e.selectedCountry))])])])},r=[],o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"vue-country-select",class:{disabled:e.disabled}},[n("div",{directives:[{name:"click-outside",rawName:"v-click-outside",value:e.clickedOutside,expression:"clickedOutside"}],staticClass:"dropdown",class:{open:e.open},attrs:{tabindex:"0"},on:{click:e.toggleDropdown,keydown:[e.keyboardNav,function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"esc",27,t.key,["Esc","Escape"])?null:e.reset(t)}]}},[n("span",{staticClass:"current"},[e.enabledFlags?n("div",{staticClass:"iti-flag",class:e.activeCountry.iso2.toLowerCase()}):e._e(),e.enabledCountryCode?n("span",{staticClass:"country-code"},[e._v("+"+e._s(e.activeCountry.dialCode))]):e._e(),n("span",{staticClass:"dropdown-arrow"},[e._v(e._s(e.open?"▲":"▼"))])]),n("ul",{directives:[{name:"show",rawName:"v-show",value:e.open,expression:"open"}],ref:"list",staticClass:"dropdown-list"},e._l(e.sortedCountries,(function(t,a){return n("li",{key:t.iso2+(t.preferred?"-preferred":""),staticClass:"dropdown-item",class:e.getItemClass(a,t.iso2),on:{click:function(n){return e.choose(t)},mousemove:function(t){e.selectedIndex=a}}},[e.enabledFlags?n("div",{staticClass:"iti-flag",class:t.iso2.toLowerCase()}):e._e(),n("strong",[e._v(e._s(t.name))]),e.dropdownOptions&&!e.dropdownOptions.disabledDialCode?n("span",[e._v("+"+e._s(t.dialCode))]):e._e()])})),0)])])},s=[],l=(n("99af"),n("4de4"),n("7db0"),n("c740"),n("caad"),n("c975"),n("d81d"),n("fb6a"),n("b0c0"),n("2532"),n("2ca0"),n("2909")),u=n("5530"),d=n("3835"),c=[["Afghanistan (‫افغانستان‬‎)","af","93"],["Albania (Shqipëri)","al","355"],["Algeria (‫الجزائر‬‎)","dz","213"],["American Samoa","as","1684"],["Andorra","ad","376"],["Angola","ao","244"],["Anguilla","ai","1264"],["Antigua and Barbuda","ag","1268"],["Argentina","ar","54"],["Armenia (Հայաստան)","am","374"],["Aruba","aw","297"],["Australia","au","61",0],["Austria (Österreich)","at","43"],["Azerbaijan (Azərbaycan)","az","994"],["Bahamas","bs","1242"],["Bahrain (‫البحرين‬‎)","bh","973"],["Bangladesh (বাংলাদেশ)","bd","880"],["Barbados","bb","1246"],["Belarus (Беларусь)","by","375"],["Belgium (België)","be","32"],["Belize","bz","501"],["Benin (Bénin)","bj","229"],["Bermuda","bm","1441"],["Bhutan (འབྲུག)","bt","975"],["Bolivia","bo","591"],["Bosnia and Herzegovina (Босна и Херцеговина)","ba","387"],["Botswana","bw","267"],["Brazil (Brasil)","br","55"],["British Indian Ocean Territory","io","246"],["British Virgin Islands","vg","1284"],["Brunei","bn","673"],["Bulgaria (България)","bg","359"],["Burkina Faso","bf","226"],["Burundi (Uburundi)","bi","257"],["Cambodia (កម្ពុជា)","kh","855"],["Cameroon (Cameroun)","cm","237"],["Canada","ca","1",1,["204","226","236","249","250","289","306","343","365","387","403","416","418","431","437","438","450","506","514","519","548","579","581","587","604","613","639","647","672","705","709","742","778","780","782","807","819","825","867","873","902","905"]],["Cape Verde (Kabu Verdi)","cv","238"],["Caribbean Netherlands","bq","599",1],["Cayman Islands","ky","1345"],["Central African Republic (République centrafricaine)","cf","236"],["Chad (Tchad)","td","235"],["Chile","cl","56"],["China (中国)","cn","86"],["Christmas Island","cx","61",2],["Cocos (Keeling) Islands","cc","61",1],["Colombia","co","57"],["Comoros (‫جزر القمر‬‎)","km","269"],["Congo (DRC) (Jamhuri ya Kidemokrasia ya Kongo)","cd","243"],["Congo (Republic) (Congo-Brazzaville)","cg","242"],["Cook Islands","ck","682"],["Costa Rica","cr","506"],["Côte d’Ivoire","ci","225"],["Croatia (Hrvatska)","hr","385"],["Cuba","cu","53"],["Curaçao","cw","599",0],["Cyprus (Κύπρος)","cy","357"],["Czech Republic (Česká republika)","cz","420"],["Denmark (Danmark)","dk","45"],["Djibouti","dj","253"],["Dominica","dm","1767"],["Dominican Republic (República Dominicana)","do","1",2,["809","829","849"]],["Ecuador","ec","593"],["Egypt (‫مصر‬‎)","eg","20"],["El Salvador","sv","503"],["Equatorial Guinea (Guinea Ecuatorial)","gq","240"],["Eritrea","er","291"],["Estonia (Eesti)","ee","372"],["Ethiopia","et","251"],["Falkland Islands (Islas Malvinas)","fk","500"],["Faroe Islands (Føroyar)","fo","298"],["Fiji","fj","679"],["Finland (Suomi)","fi","358",0],["France","fr","33"],["French Guiana (Guyane française)","gf","594"],["French Polynesia (Polynésie française)","pf","689"],["Gabon","ga","241"],["Gambia","gm","220"],["Georgia (საქართველო)","ge","995"],["Germany (Deutschland)","de","49"],["Ghana (Gaana)","gh","233"],["Gibraltar","gi","350"],["Greece (Ελλάδα)","gr","30"],["Greenland (Kalaallit Nunaat)","gl","299"],["Grenada","gd","1473"],["Guadeloupe","gp","590",0],["Guam","gu","1671"],["Guatemala","gt","502"],["Guernsey","gg","44",1],["Guinea (Guinée)","gn","224"],["Guinea-Bissau (Guiné Bissau)","gw","245"],["Guyana","gy","592"],["Haiti","ht","509"],["Honduras","hn","504"],["Hong Kong (香港)","hk","852"],["Hungary (Magyarország)","hu","36"],["Iceland (Ísland)","is","354"],["India (भारत)","in","91"],["Indonesia","id","62"],["Iran (‫ایران‬‎)","ir","98"],["Iraq (‫العراق‬‎)","iq","964"],["Ireland","ie","353"],["Isle of Man","im","44",2],["Israel (‫ישראל‬‎)","il","972"],["Italy (Italia)","it","39",0],["Jamaica","jm","1876"],["Japan (日本)","jp","81"],["Jersey","je","44",3],["Jordan (‫الأردن‬‎)","jo","962"],["Kazakhstan (Казахстан)","kz","7",1],["Kenya","ke","254"],["Kiribati","ki","686"],["Kosovo","xk","383"],["Kuwait (‫الكويت‬‎)","kw","965"],["Kyrgyzstan (Кыргызстан)","kg","996"],["Laos (ລາວ)","la","856"],["Latvia (Latvija)","lv","371"],["Lebanon (‫لبنان‬‎)","lb","961"],["Lesotho","ls","266"],["Liberia","lr","231"],["Libya (‫ليبيا‬‎)","ly","218"],["Liechtenstein","li","423"],["Lithuania (Lietuva)","lt","370"],["Luxembourg","lu","352"],["Macau (澳門)","mo","853"],["Macedonia (FYROM) (Македонија)","mk","389"],["Madagascar (Madagasikara)","mg","261"],["Malawi","mw","265"],["Malaysia","my","60"],["Maldives","mv","960"],["Mali","ml","223"],["Malta","mt","356"],["Marshall Islands","mh","692"],["Martinique","mq","596"],["Mauritania (‫موريتانيا‬‎)","mr","222"],["Mauritius (Moris)","mu","230"],["Mayotte","yt","262",1],["Mexico (México)","mx","52"],["Micronesia","fm","691"],["Moldova (Republica Moldova)","md","373"],["Monaco","mc","377"],["Mongolia (Монгол)","mn","976"],["Montenegro (Crna Gora)","me","382"],["Montserrat","ms","1664"],["Morocco (‫المغرب‬‎)","ma","212",0],["Mozambique (Moçambique)","mz","258"],["Myanmar (Burma) (မြန်မာ)","mm","95"],["Namibia (Namibië)","na","264"],["Nauru","nr","674"],["Nepal (नेपाल)","np","977"],["Netherlands (Nederland)","nl","31"],["New Caledonia (Nouvelle-Calédonie)","nc","687"],["New Zealand","nz","64"],["Nicaragua","ni","505"],["Niger (Nijar)","ne","227"],["Nigeria","ng","234"],["Niue","nu","683"],["Norfolk Island","nf","672"],["North Korea (조선 민주주의 인민 공화국)","kp","850"],["Northern Mariana Islands","mp","1670"],["Norway (Norge)","no","47",0],["Oman (‫عُمان‬‎)","om","968"],["Pakistan (‫پاکستان‬‎)","pk","92"],["Palau","pw","680"],["Palestine (‫فلسطين‬‎)","ps","970"],["Panama (Panamá)","pa","507"],["Papua New Guinea","pg","675"],["Paraguay","py","595"],["Peru (Perú)","pe","51"],["Philippines","ph","63"],["Poland (Polska)","pl","48"],["Portugal","pt","351"],["Puerto Rico","pr","1",3,["787","939"]],["Qatar (‫قطر‬‎)","qa","974"],["Réunion (La Réunion)","re","262",0],["Romania (România)","ro","40"],["Russia (Россия)","ru","7",0],["Rwanda","rw","250"],["Saint Barthélemy","bl","590",1],["Saint Helena","sh","290"],["Saint Kitts and Nevis","kn","1869"],["Saint Lucia","lc","1758"],["Saint Martin (Saint-Martin (partie française))","mf","590",2],["Saint Pierre and Miquelon (Saint-Pierre-et-Miquelon)","pm","508"],["Saint Vincent and the Grenadines","vc","1784"],["Samoa","ws","685"],["San Marino","sm","378"],["São Tomé and Príncipe (São Tomé e Príncipe)","st","239"],["Saudi Arabia (‫المملكة العربية السعودية‬‎)","sa","966"],["Senegal (Sénégal)","sn","221"],["Serbia (Србија)","rs","381"],["Seychelles","sc","248"],["Sierra Leone","sl","232"],["Singapore","sg","65"],["Sint Maarten","sx","1721"],["Slovakia (Slovensko)","sk","421"],["Slovenia (Slovenija)","si","386"],["Solomon Islands","sb","677"],["Somalia (Soomaaliya)","so","252"],["South Africa","za","27"],["South Korea (대한민국)","kr","82"],["South Sudan (‫جنوب السودان‬‎)","ss","211"],["Spain (España)","es","34"],["Sri Lanka (ශ්‍රී ලංකාව)","lk","94"],["Sudan (‫السودان‬‎)","sd","249"],["Suriname","sr","597"],["Svalbard and Jan Mayen","sj","47",1],["Swaziland","sz","268"],["Sweden (Sverige)","se","46"],["Switzerland (Schweiz)","ch","41"],["Syria (‫سوريا‬‎)","sy","963"],["Taiwan (台灣)","tw","886"],["Tajikistan","tj","992"],["Tanzania","tz","255"],["Thailand (ไทย)","th","66"],["Timor-Leste","tl","670"],["Togo","tg","228"],["Tokelau","tk","690"],["Tonga","to","676"],["Trinidad and Tobago","tt","1868"],["Tunisia (‫تونس‬‎)","tn","216"],["Turkey (Türkiye)","tr","90"],["Turkmenistan","tm","993"],["Turks and Caicos Islands","tc","1649"],["Tuvalu","tv","688"],["U.S. Virgin Islands","vi","1340"],["Uganda","ug","256"],["Ukraine (Україна)","ua","380"],["United Arab Emirates (‫الإمارات العربية المتحدة‬‎)","ae","971"],["United Kingdom","gb","44",0],["United States","us","1",0],["Uruguay","uy","598"],["Uzbekistan (Oʻzbekiston)","uz","998"],["Vanuatu","vu","678"],["Vatican City (Città del Vaticano)","va","39",1],["Venezuela","ve","58"],["Vietnam (Việt Nam)","vn","84"],["Wallis and Futuna (Wallis-et-Futuna)","wf","681"],["Western Sahara (‫الصحراء الغربية‬‎)","eh","212",1],["Yemen (‫اليمن‬‎)","ye","967"],["Zambia","zm","260"],["Zimbabwe","zw","263"],["Åland Islands","ax","358",1]],f=c.map((function(e){var t=Object(d["a"])(e,3),n=t[0],a=t[1],i=t[2];return{name:n,iso2:a.toUpperCase(),dialCode:i}})),h=(n("d3b7"),n("25f0"),function(){return fetch("https://ip2c.org/s").then((function(e){return e.text()})).then((function(e){var t=(e||"").toString();if(!t||"1"!==t[0])throw new Error("unable to fetch the country");return t.substr(2,2)}))}),p=h,m={name:"vue-country-code",props:{disabledFetchingCountry:{type:Boolean,default:!1},disabled:{type:Boolean,default:!1},disabledFormatting:{type:Boolean,default:!1},defaultCountry:{type:String,default:""},enabledCountryCode:{type:Boolean,default:!1},enabledFlags:{type:Boolean,default:!0},preferredCountries:{type:Array,default:function(){return[]}},onlyCountries:{type:Array,default:function(){return[]}},ignoredCountries:{type:Array,default:function(){return[]}},dropdownOptions:{type:Object,default:function(){return{}}},selectedCountryCode:{type:Boolean,default:!1}},mounted:function(){this.initializeCountry(),this.$emit("onSelect",this.activeCountry)},data:function(){return{activeCountry:{iso2:""},open:!1,selectedIndex:null,typeToFindInput:"",typeToFindTimer:null}},computed:{filteredCountries:function(){var e=this;return this.onlyCountries.length?this.getCountries(this.onlyCountries):this.ignoredCountries.length?f.filter((function(t){var n=t.iso2;return!e.ignoredCountries.includes(n.toUpperCase())&&!e.ignoredCountries.includes(n.toLowerCase())})):f},sortedCountries:function(){var e=this.getCountries(this.preferredCountries).map((function(e){return Object(u["a"])(Object(u["a"])({},e),{},{preferred:!0})}));return[].concat(Object(l["a"])(e),Object(l["a"])(this.filteredCountries))}},methods:{initializeCountry:function(){var e=this;if(this.defaultCountry){var t=this.findCountry(this.defaultCountry);if(t)return void(this.activeCountry=t)}this.activeCountry=this.findCountry(this.preferredCountries[0])||this.filteredCountries[0],this.disabledFetchingCountry||p().then((function(t){e.choose(e.findCountry(t)||e.activeCountry)}))},getCountries:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[];return t.map((function(t){return e.findCountry(t)})).filter(Boolean)},findCountry:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return f.find((function(t){return t.iso2===e.toUpperCase()}))},getItemClass:function(e,t){var n=this.selectedIndex===e,a=e===this.preferredCountries.length-1,i=!!~this.preferredCountries.map((function(e){return e.toUpperCase()})).indexOf(t);return{highlighted:n,"last-preferred":a,preferred:i}},choose:function(e){this.activeCountry=e,this.$emit("onSelect",this.activeCountry)},toggleDropdown:function(){this.disabled||(this.open=!this.open)},clickedOutside:function(){this.open=!1},keyboardNav:function(e){var t=this;if(40===e.keyCode){this.open=!0,null===this.selectedIndex?this.selectedIndex=0:this.selectedIndex=Math.min(this.sortedCountries.length-1,this.selectedIndex+1);var n=this.$refs.list.children[this.selectedIndex];n.offsetTop+n.clientHeight>this.$refs.list.scrollTop+this.$refs.list.clientHeight&&(this.$refs.list.scrollTop=n.offsetTop-this.$refs.list.clientHeight+n.clientHeight)}else if(38===e.keyCode){this.open=!0,null===this.selectedIndex?this.selectedIndex=this.sortedCountries.length-1:this.selectedIndex=Math.max(0,this.selectedIndex-1);var a=this.$refs.list.children[this.selectedIndex];a.offsetTop<this.$refs.list.scrollTop&&(this.$refs.list.scrollTop=a.offsetTop)}else if(13===e.keyCode)null!==this.selectedIndex&&this.choose(this.sortedCountries[this.selectedIndex]),this.open=!this.open;else{this.typeToFindInput+=e.key,clearTimeout(this.typeToFindTimer),this.typeToFindTimer=setTimeout((function(){t.typeToFindInput=""}),700);var i=this.sortedCountries.slice(this.preferredCountries.length).findIndex((function(e){return e.name.toLowerCase().startsWith(t.typeToFindInput)}));if(~i){this.selectedIndex=this.preferredCountries.length+i;var r=this.$refs.list.children[this.selectedIndex];(r.offsetTop<this.$refs.list.scrollTop||r.offsetTop+r.clientHeight>this.$refs.list.scrollTop+this.$refs.list.clientHeight)&&(this.$refs.list.scrollTop=r.offsetTop-this.$refs.list.clientHeight/2)}}},reset:function(){this.selectedIndex=this.sortedCountries.map((function(e){return e.iso2})).indexOf(this.activeCountry.iso2),this.open=!1}},directives:{"click-outside":{bind:function(e,t,n){if("function"!==typeof t.value){var a=n.context.name,i="[Vue-click-outside:] provided expression "+t.expression+" is not a function, but has to be";a&&(i+="Found in component "+a),console.warn(i)}var r=t.modifiers.bubble,o=function(n){(r||!e.contains(n.target)&&e!==n.target)&&t.value(n)};e.__vueClickOutside__=o,document.addEventListener("click",o)},unbind:function(e){document.removeEventListener("click",e.__vueClickOutside__),e.__vueClickOutside__=null}}}},y=m,g=(n("3c6f"),n("0538"),n("2877")),b=Object(g["a"])(y,o,s,!1,null,null,null),C=b.exports,v={name:"app",components:{VueCountryCode:C},data:function(){return{selectedCountry:null}},methods:{onSelect:function(e){this.selectedCountry=e}}},k=v,S=(n("034f"),Object(g["a"])(k,i,r,!1,null,null,null)),w=S.exports;a["a"].config.productionTip=!1,new a["a"]({render:function(e){return e(w)}}).$mount("#app")},"85ec":function(e,t,n){},fee6:function(e,t,n){}});
//# sourceMappingURL=app.5bbe73eb.js.map