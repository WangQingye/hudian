(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/publish/publish"],{"3dba":function(e,n,t){"use strict";var u=t("9917"),r=t.n(u);r.a},"5dd1":function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var u={data:function(){var e=this;return{selectShow:!1,taskLists:[{value:"1",label:"淘宝"},{value:"2",label:"拼多多"},{value:"3",label:"自定义"}],form:{type:"",originType:"",desc:"",link:"",img:"",score:"",time:"",num:""},imageValue:[],rules:{type:[{required:!0,message:"请选择任务分类",trigger:["change","blur"]}],originType:[{required:!0,message:"请输入自定义分类",trigger:["change","blur"]}],score:[{required:!0,message:"请设置积分奖励",trigger:["change","blur"]}],time:[{required:!0,message:"请设置任务完成时限",trigger:["change","blur"]}],num:[{required:!0,message:"请设置任务数量",trigger:["change","blur"]}],img:[{validator:function(n,t,u){return e.form.img||e.form.link?(u(),!0):(u(new Error("任务链接和图片至少填写一个")),!1)},message:"任务链接和图片至少填写一个",trigger:["change","blur"]}],link:[{validator:function(n,t,u){return e.form.img||e.form.link?(u(),!0):(u(new Error("任务链接和图片至少填写一个")),!1)},message:"任务链接和图片至少填写一个",trigger:["change","blur"]}]}}},methods:{selectConfirm:function(e){this.form.type=e[0].label},success:function(e){this.form.img=e.tempFilePaths[0],console.log("图片上传成功",e)},submit:function(){var e=this;this.$refs.uForm.validate((function(n){if(n){if(e.$util.store.userInfo.score<e.form.score*e.form.num)return console.log(111),void e.$util.showToast("积分不足，您当前的可用积分为："+e.$util.store.userInfo.score);0==e.$util.store.userInfo.status?e.$util.showToast("您的账号已被冻结"):(e.form.type=e.form.originType||e.form.type,e.$util.http("addTask",Object.assign(e.form,{userInfo:e.$util.store.userInfo})).then((function(n){console.log(n),e.$util.showToast("发布成功"),e.$util.getUserInfo()})))}}))},onReady:function(){this.$refs.uForm.setRules(this.rules)}}};n.default=u},"7dc6":function(e,n,t){"use strict";t.r(n);var u=t("5dd1"),r=t.n(u);for(var i in u)"default"!==i&&function(e){t.d(n,e,(function(){return u[e]}))}(i);n["default"]=r.a},9917:function(e,n,t){},a025:function(e,n,t){"use strict";(function(e){t("6977");u(t("66fd"));var n=u(t("d94f"));function u(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},d43a:function(e,n,t){"use strict";t.d(n,"b",(function(){return r})),t.d(n,"c",(function(){return i})),t.d(n,"a",(function(){return u}));var u={uForm:function(){return t.e("uview-ui/components/u-form/u-form").then(t.bind(null,"b510"))},uFormItem:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-form-item/u-form-item")]).then(t.bind(null,"a07e"))},uInput:function(){return Promise.all([t.e("common/vendor"),t.e("uview-ui/components/u-input/u-input")]).then(t.bind(null,"4433"))},uSelect:function(){return t.e("uview-ui/components/u-select/u-select").then(t.bind(null,"640d"))},uniFilePicker:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker")]).then(t.bind(null,"b7ab"))},uButton:function(){return t.e("uview-ui/components/u-button/u-button").then(t.bind(null,"6cc9"))}},r=function(){var e=this,n=e.$createElement;e._self._c;e._isMounted||(e.e0=function(n){e.selectShow=!0})},i=[]},d94f:function(e,n,t){"use strict";t.r(n);var u=t("d43a"),r=t("7dc6");for(var i in r)"default"!==i&&function(e){t.d(n,e,(function(){return r[e]}))}(i);t("3dba");var o,s=t("f0c5"),l=Object(s["a"])(r["default"],u["b"],u["c"],!1,null,null,null,!1,u["a"],o);n["default"]=l.exports}},[["a025","common/runtime","common/vendor"]]]);