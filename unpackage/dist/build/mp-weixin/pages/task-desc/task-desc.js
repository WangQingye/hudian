(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/task-desc/task-desc"],{1771:function(t,e,n){"use strict";n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return u}));var u={uCellGroup:function(){return n.e("uview-ui/components/u-cell-group/u-cell-group").then(n.bind(null,"8ff5"))},uCellItem:function(){return n.e("uview-ui/components/u-cell-item/u-cell-item").then(n.bind(null,"d154"))},uButton:function(){return n.e("uview-ui/components/u-button/u-button").then(n.bind(null,"6cc9"))},uImage:function(){return n.e("uview-ui/components/u-image/u-image").then(n.bind(null,"a197"))},uniFilePicker:function(){return Promise.all([n.e("common/vendor"),n.e("uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker")]).then(n.bind(null,"b7ab"))},uModal:function(){return n.e("uview-ui/components/u-modal/u-modal").then(n.bind(null,"ee3a"))}},i=function(){var t=this,e=t.$createElement;t._self._c;t._isMounted||(t.e0=function(e){t.showSubmitConfirm=!0},t.e1=function(e){t.showReceiveConfirm=!0})},a=[]},"3fd0":function(t,e,n){},9050:function(t,e,n){"use strict";n.r(e);var u=n("1771"),i=n("be24");for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);n("ffc9");var o,s=n("f0c5"),r=Object(s["a"])(i["default"],u["b"],u["c"],!1,null,"686b3008",null,!1,u["a"],o);e["default"]=r.exports},a4f3:function(t,e,n){"use strict";(function(t){n("6977");u(n("66fd"));var e=u(n("9050"));function u(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},be24:function(t,e,n){"use strict";n.r(e);var u=n("bf89"),i=n.n(u);for(var a in u)"default"!==a&&function(t){n.d(e,t,(function(){return u[t]}))}(a);e["default"]=i.a},bf89:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u=a(n("a34a")),i=a(n("f813"));function a(t){return t&&t.__esModule?t:{default:t}}function o(t,e,n,u,i,a,o){try{var s=t[a](o),r=s.value}catch(c){return void n(c)}s.done?e(r):Promise.resolve(r).then(u,i)}function s(t){return function(){var e=this,n=arguments;return new Promise((function(u,i){var a=t.apply(e,n);function s(t){o(a,u,i,s,r,"next",t)}function r(t){o(a,u,i,s,r,"throw",t)}s(void 0)}))}}var r={onShareAppMessage:function(t){return"button"===t.from&&console.log(t.target),{title:"快来帮我完成任务！",path:"/pages/test/test?id=123",imageUrl:"../../static/share.png"}},onLoad:function(t){this.type=t.type,this.taskData=this.$util.store.nowTask,this.taskData.submitImg&&this.imageValue.push({name:"submitImg",extname:this.taskData.submitImg.split(".").pop(),url:this.taskData.submitImg}),console.log(this.taskData),console.log(1!==this.taskData.status),this.getTimeText()},onUnload:function(){clearInterval(this.countTimer)},data:function(){return{type:"publish",action:"aa",fileList:[{url:"https://cdn.uviewui.com/uview/example/fade.jpg"}],showReceiveConfirm:!1,showSubmitConfirm:!1,countTime:"",countTimer:"",taskData:{},imageValue:[],submitImg:""}},methods:{copy:function(){t.setClipboardData({data:"任务链接"})},goBack:function(){t.navigateBack({delta:1})},confirmReceive:function(){var e=this;return s(u.default.mark((function n(){return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.$util.store.userInfo.nickName){n.next=3;break}return n.next=3,e.$util.getUserInfo();case 3:return n.next=5,e.$util.http("receiveTask",{taskData:e.taskData});case 5:e.$util.showToast("领取成功","",(function(){t.redirectTo({url:"/pages/task-list/task-list?type=receive"})}));case 6:case"end":return n.stop()}}),n)})))()},confirmSubmit:function(){var e=this;return s(u.default.mark((function n(){return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.imageValue[0]){n.next=3;break}return e.$util.showToast("请上传任务截图"),n.abrupt("return");case 3:return n.next=5,e.$util.http("submitTask",{receiveId:e.taskData._id,status:2,submitImg:e.imageValue[0].url,score:e.taskData.taskDetail.score});case 5:e.$util.showToast("提交成功","",(function(){t.switchTab({url:"/pages/my-info/my-info"})}));case 6:case"end":return n.stop()}}),n)})))()},clickDelete:function(){var e=this;t.showModal({title:"确认删除",content:"是否确认删除，删除后无法恢复",success:function(t){t.confirm?e.$util.showToast("当前有用户已经领取了任务，无法删除"):t.cancel&&console.log("用户点击取消")}})},clickGiveup:function(){var e=this;t.showModal({title:"确认放弃",content:"是否确认放弃，放弃后无法恢复",success:function(){var n=s(u.default.mark((function n(i){return u.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!i.confirm){n.next=6;break}return n.next=3,e.$util.http("giveupTask",{receiveId:e.taskData._id,status:"del"});case 3:e.$util.showToast("操作成功","",(function(){t.switchTab({url:"/pages/my-info/my-info"})})),n.next=7;break;case 6:i.cancel&&console.log("用户点击取消");case 7:case"end":return n.stop()}}),n)})));function i(t){return n.apply(this,arguments)}return i}()})},goEdit:function(){t.showModal({title:"确认修改",content:"请先确认您的任务当前没有被人领取，否则无法修改",confirmText:"去修改",success:function(e){e.confirm&&t.navigateTo({url:"/pages/publish/publish"})}})},getTimeText:function(){var t=this,e=this.$util.taskStatusType;1==this.taskData.status?this.countTimer=setInterval((function(){var e=(0,i.default)(new Date),n=(0,i.default)(new Date(t.taskData.pastTime)),u=n.diff(e);if(u<0)return t.countTime="已超时",void clearInterval(t.countTimer);t.countTime="进行中，剩余时间：".concat(i.default.duration(u).days()?i.default.duration(u).days()+" 天 ":"").concat(i.default.duration(u).hours()?i.default.duration(u).hours()+" 小时 ":"").concat(i.default.duration(u).minutes()?i.default.duration(u).minutes()+" 分 ":"").concat(i.default.duration(u).seconds()?i.default.duration(u).seconds()+" 秒":"")}),1e3):this.countTime=e[this.taskData.status]},deleteImg:function(t){this.imageValue=[]}}};e.default=r}).call(this,n("543d")["default"])},ffc9:function(t,e,n){"use strict";var u=n("3fd0"),i=n.n(u);i.a}},[["a4f3","common/runtime","common/vendor"]]]);