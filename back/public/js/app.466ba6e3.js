(function(){"use strict";var t={63:function(t,n,e){var r=e(144),i=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{attrs:{id:"app"}},[e("Menu",{attrs:{user:t.user}}),e("div",{staticClass:"card"},[e("div",{staticClass:"card-content"},[e("router-view")],1),e("div",{staticClass:"card-footer"})])],1)},o=[],s=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("b-navbar",{scopedSlots:t._u([{key:"brand",fn:function(){return[e("span",{staticClass:"icon m-2",on:{click:function(n){t.open=!0}}},[e("i",{staticClass:"fa-solid fa-bars"})])]},proxy:!0},{key:"end",fn:function(){return[e("b-navbar-item",[t._v(" "+t._s(t.user.username)+" ")]),e("b-navbar-item",{attrs:{tag:"div"}},[e("div",{staticClass:"buttons"},[e("a",{staticClass:"button"},[e("b-image",{attrs:{img:"",src:t.user.picture,alt:t.user.username,rounded:""}})],1)])])]},proxy:!0}])}),e("b-sidebar",{attrs:{type:"is-light",fullheight:t.fullheight,fullwidth:t.fullwidth,overlay:t.overlay,right:t.right},model:{value:t.open,callback:function(n){t.open=n},expression:"open"}},[e("div",{staticClass:"p-1"},[e("b-menu",[e("b-menu-list",{attrs:{label:"Menu"}},[e("b-menu-item",{attrs:{icon:"settings",tag:"router-link",to:{name:"Sign"}},scopedSlots:t._u([{key:"label",fn:function(n){return[t._v(" Login "),e("b-icon",{staticClass:"is-pulled-right",attrs:{icon:n.expanded?"menu-down":"menu-up"}})]}}])}),e("b-menu-item",{attrs:{icon:"settings"},scopedSlots:t._u([{key:"label",fn:function(n){return[t._v(" Nuovo inserimento "),e("b-icon",{staticClass:"is-pulled-right",attrs:{icon:n.expanded?"menu-down":"menu-up"}})]}}])}),e("b-menu-item",{attrs:{icon:"settings"},scopedSlots:t._u([{key:"label",fn:function(n){return[t._v(" Impostazioni "),e("b-icon",{staticClass:"is-pulled-right",attrs:{icon:n.expanded?"menu-down":"menu-up"}})]}}])}),e("b-menu-item",{attrs:{icon:"settings"},scopedSlots:t._u([{key:"label",fn:function(n){return[t._v(" Grafici "),e("b-icon",{staticClass:"is-pulled-right",attrs:{icon:n.expanded?"menu-down":"menu-up"}})]}}])})],1),e("b-menu-list",{attrs:{label:"Actions"}},[e("b-menu-item",{attrs:{label:"Logout"}})],1)],1)],1)])],1)},a=[],u={props:["user"],data(){return{open:!1,overlay:!0,fullheight:!0,fullwidth:!1,right:!1}}},l=u,c=e(1),f=(0,c.Z)(l,s,a,!1,null,null,null),p=f.exports,d={name:"App",components:{Menu:p},data(){return{user:{google_id:"105279476200599131602",email:"giokkaaaa@gmail.com",username:"[WT]MageOx",picture:"https://lh3.googleusercontent.com/a-/AOh14GhQ7zNdW_hUyLB8AmogdFej9S8eMLLLBfXWLN3lSg=s96-c"},login:!1}},created(){let t=this;this.$http("/api/v1/user").then((n=>{t.login=!0,t.user=n.data})).catch((t=>console.log(t)))}},m=d,g=(0,c.Z)(m,i,o,!1,null,null,null),h=g.exports,v=e(368),b=(e(588),e(345)),_=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"home"},[t._v(" Home ")])},y=[],w={name:"Home",components:{}},C=w,k=(0,c.Z)(C,_,y,!1,null,null,null),x=k.exports,O=function(){var t=this,n=t.$createElement;t._self._c;return t._m(0)},S=[function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"content is-vcentered"},[e("a",{staticClass:"button g-signin-button p-2",attrs:{href:"/oauth2/redirect/google"}},[t._v("Sign-In with google")])])}],Z={name:"Sign",components:{},data(){return{googleSignInParams:{client_id:{NODE_ENV:"production",BASE_URL:"/"}.GOOGLE_CLIENT_ID}}},methods:{}},E=Z,L=(0,c.Z)(E,O,S,!1,null,null,null),$=L.exports;r.Z.use(b.Z);const j=[{path:"/",name:"Home",component:x},{path:"/sign",name:"Sign",component:$}],A=new b.Z({mode:"history",base:"/",linkActiveClass:"is-active",routes:j});var M=A,N=(e(682),e(669)),I=e.n(N);r.Z.config.productionTip=!1,r.Z.use(v.ZP),r.Z.prototype.$http=I(),new r.Z({router:M,render:t=>t(h)}).$mount("#app")}},n={};function e(r){var i=n[r];if(void 0!==i)return i.exports;var o=n[r]={exports:{}};return t[r](o,o.exports,e),o.exports}e.m=t,function(){var t=[];e.O=function(n,r,i,o){if(!r){var s=1/0;for(c=0;c<t.length;c++){r=t[c][0],i=t[c][1],o=t[c][2];for(var a=!0,u=0;u<r.length;u++)(!1&o||s>=o)&&Object.keys(e.O).every((function(t){return e.O[t](r[u])}))?r.splice(u--,1):(a=!1,o<s&&(s=o));if(a){t.splice(c--,1);var l=i();void 0!==l&&(n=l)}}return n}o=o||0;for(var c=t.length;c>0&&t[c-1][2]>o;c--)t[c]=t[c-1];t[c]=[r,i,o]}}(),function(){e.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return e.d(n,{a:n}),n}}(),function(){e.d=function(t,n){for(var r in n)e.o(n,r)&&!e.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:n[r]})}}(),function(){e.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){e.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)}}(),function(){var t={143:0};e.O.j=function(n){return 0===t[n]};var n=function(n,r){var i,o,s=r[0],a=r[1],u=r[2],l=0;if(s.some((function(n){return 0!==t[n]}))){for(i in a)e.o(a,i)&&(e.m[i]=a[i]);if(u)var c=u(e)}for(n&&n(r);l<s.length;l++)o=s[l],e.o(t,o)&&t[o]&&t[o][0](),t[o]=0;return e.O(c)},r=self["webpackChunkfront"]=self["webpackChunkfront"]||[];r.forEach(n.bind(null,0)),r.push=n.bind(null,r.push.bind(r))}();var r=e.O(void 0,[998],(function(){return e(63)}));r=e.O(r)})();
//# sourceMappingURL=app.466ba6e3.js.map