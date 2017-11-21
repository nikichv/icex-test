webpackJsonp([1],{"+rgd":function(t,n){},"5KJk":function(t,n){},"7mmg":function(t,n){},NHnr:function(t,n,i){"use strict";function e(t){var n=t?"coins?coinlist="+t:"coins";return H.get(n)}function s(t){if(!t)throw new SyntaxError("Coin name must be specified!");return H.get("coins/"+t)}function r(t,n){if(!t)throw new SyntaxError("Coin name must be specified!");var i="coins/"+t+"/hist?"+y.a.stringify(n);return H.get(i)}function a(t){i("7mmg")}function o(t){i("+rgd")}function c(t){i("5KJk")}function u(t){i("Sv05")}Object.defineProperty(n,"__esModule",{value:!0});var l,h=i("7+uW"),d=i("NYxO"),f=i("bOdI"),p=i.n(f),m=i("woOf"),_=i.n(m),v=i("Gu7T"),C=i.n(v),g=i("1nuA"),y=i.n(g),S=i("mtWM"),x=i.n(S),I=x.a.create({baseURL:"http://api.icex.ch/api/"}),H=I,O={list:[],histories:{},details:{}},w={},E={fetchCoinsList:function(t,n){var i=t.commit;return e(n).then(function(t){return t.data.result&&t.data.data.length>0&&i("COINS/SET_COINS_LIST",t.data.data),t})},fetchCoinHistory:function(t,n){var i=t.commit,e=n.name,s=n.options;return r(e,s).then(function(t){return t.data.result&&i("COINS/SET_COIN_HISTORY",{name:e,data:t.data.data}),t})},fetchCoinByName:function(t,n){var i=t.commit;return s(n).then(function(t){return t.data.result&&i("COINS/SET_COIN_DETAILS",{name:n,data:t.data.data}),t})}},N=(l={},p()(l,"COINS/SET_COINS_LIST",function(t,n){t.list=[].concat(C()(n))}),p()(l,"COINS/SET_COIN_HISTORY",function(t,n){var i=n.data,e=n.name;t.histories=_()({},t.histories,p()({},e,i))}),p()(l,"COINS/SET_COIN_DETAILS",function(t,n){var i=n.data,e=n.name;t.details=_()({},t.details,p()({},e,i))}),l),b={state:O,getters:w,actions:E,mutations:N};h.a.use(d.a);var L=new d.a.Store({modules:{coins:b}}),T=i("Dd8w"),D=i.n(T),R=i("y3TV"),A=i.n(R),F=i("nER5"),U=i.n(F),$={name:"chart",props:{history:{type:Array,default:function(){return[]}},fetching:{type:Boolean,required:!0}},data:function(){return{hc:null}},watch:{history:function(t){t.length>0&&this.hc.series[0].setData(this.parseHistory(t))},fetching:function(t){return t?this.hc.showLoading("Loading"):this.hc.hideLoading()}},methods:{parseHistory:function(t){return t.map(function(t){return[1e3*t.timestamp,t.value]})},initHighchart:function(){this.hc=U.a.stockChart("chart",{chart:{margin:0},series:[{data:this.parseHistory(this.history)}],rangeSelector:{buttons:[],inputEnabled:!1,labelStyle:{visibility:"hidden"}},xAxis:{tickInterval:864e5}})}},mounted:function(){this.initHighchart()}},k=function(){var t=this,n=t.$createElement;return(t._self._c||n)("div",{attrs:{id:"chart"}})},j=[],V={render:k,staticRenderFns:j},B=V,M=i("VU/8"),J=a,P=M($,B,!1,J,null,null),Y=P.exports,K=Y,W={name:"coin-list",props:{coins:{type:Array,default:function(){return[]}}},methods:{updateCurrentCoin:function(t){this.$emit("coinset",t)}},computed:{stateReady:function(){return this.coins.length>0}}},q=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",[i("div",{staticClass:"px-3"},[t._m(0,!1,!1),t._v(" "),i("div",{staticClass:"d-flex flex-column coin__list"},[t.stateReady?[t._l(t.coins,function(n){return[i("div",{class:["coin__list-item mb-2 p-2",""],on:{click:function(i){t.updateCurrentCoin(n)}}},[i("span",[t._v(t._s(n))])])]})]:[t._m(1,!1,!1)]],2)])])},G=[function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("h2",[i("strong",[t._v("Coins list")])])},function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"col-12"},[i("p",[t._v("Please, wait... Loading list of coins.")])])}],z={render:q,staticRenderFns:G},Q=z,X=i("VU/8"),Z=o,tt=X(W,Q,!1,Z,null,null),nt=tt.exports,it=nt,et=["name","short","price_usd","change.day"],st={name:"coin-info",props:{coin:{type:Object,validator:function(t){return et.every(function(n){return A()(t,n,!1)})}}},methods:{defineChangeIconClass:function(){return"-"===this.coin.change.day[0]?"coin__icon-negative":"coin__icon-positive"}}},rt=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",[i("transition",{attrs:{appear:"",name:"fade"}},[t.coin?[i("div",{staticClass:"d-flex justify-content-around align-items-center"},[i("p",{staticClass:"text-uppercase font-weight-bold"},[t._v("\n          "+t._s(t.coin.name)+" ("+t._s(t.coin.short)+")\n        ")]),t._v(" "),i("p",[t._v("Price: "+t._s(t.coin.price_usd)+"$")]),t._v(" "),i("div",{staticClass:"d-flex align-items-end"},[i("i",{class:["coin__icon mr-2",t.defineChangeIconClass()]}),t._v(" "),i("span",[t._v(t._s(t.coin.change.day))])])])]:t._e()],2)],1)},at=[],ot={render:rt,staticRenderFns:at},ct=ot,ut=i("VU/8"),lt=c,ht=ut(st,ct,!1,lt,null,null),dt=ht.exports,ft=dt,pt={name:"app",data:function(){return{currentCoin:null,isFetchingHistory:!1}},components:{chart:K,coinList:it,coinInfo:ft},watch:{currentCoin:function(t){var n=this;this.coinsHistory[t]||(this.isFetchingHistory=!0,this.fetchCoinHistory({name:this.currentCoin,options:{interval:"day",start:this.getUnixRange(30).start,end:this.getUnixRange(30).end}}).then(function(){n.isFetchingHistory=!1})),this.coinsDetails[t]||this.fetchCoinByName(t)}},methods:D()({},Object(d.b)(["fetchCoinsList","fetchCoinHistory","fetchCoinByName"]),{getUnixRange:function(t){var n=new Date;return{end:Math.floor(Date.now()/1e3),start:Math.floor(n.setDate(n.getDate()-t)/1e3)}}}),computed:D()({},Object(d.c)({coinsList:function(t){return t.coins.list},coinsDetails:function(t){return t.coins.details},coinsHistory:function(t){return t.coins.histories}}),{currentCoinDetails:function(){return A()(this.coinsDetails,this.currentCoin,void 0)},currentCoinHistory:function(){return A()(this.coinsHistory,this.currentCoin,void 0)}}),created:function(){var t=this;this.fetchCoinsList("icextop10").then(function(n){n.data.result&&n.data.data.length>0&&(t.currentCoin=n.data.data[0])})}},mt=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"d-flex",staticStyle:{"min-height":"100vh",height:"100%"},attrs:{id:"app"}},[i("coin-list",{staticStyle:{"flex-shrink":"0"},attrs:{coins:t.coinsList},on:{coinset:function(n){t.currentCoin=n}}}),t._v(" "),i("div",{staticClass:"d-flex flex-column rel w-100"},[i("div",{staticClass:"w-75 mx-auto"},[i("chart",{attrs:{history:t.currentCoinHistory,fetching:t.isFetchingHistory}})],1),t._v(" "),i("div",{staticClass:"coin-info-wrapper"},[i("coin-info",{attrs:{coin:t.currentCoinDetails}})],1)])],1)},_t=[],vt={render:mt,staticRenderFns:_t},Ct=vt,gt=i("VU/8"),yt=u,St=gt(pt,Ct,!1,yt,null,null),xt=St.exports;h.a.config.productionTip=!1,new h.a({el:"#app",store:L,template:"<App/>",components:{App:xt}})},Sv05:function(t,n){}},["NHnr"]);