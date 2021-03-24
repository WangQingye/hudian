(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["node-modules/@dcloudio/uni-cli-shared/components/unicloud-db"],{"4d99":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"848e":function(t,e,n){"use strict";n.r(e);var a=n("c693"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},"960d":function(t,e,n){"use strict";n.r(e);var a=n("4d99"),i=n("848e");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);var r,c=n("f0c5"),l=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=l.exports},c693:function(t,e,n){"use strict";(function(t,n){function a(t){return c(t)||r(t)||o(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(t,e){if(t){if("string"===typeof t)return l(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?l(t,e):void 0}}function r(t){if("undefined"!==typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function c(t){if(Array.isArray(t))return l(t)}function l(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var s={load:"load",error:"error"},u={add:"add",replace:"replace"},d=["pageCurrent","pageSize","collection","action","field","getcount","orderby","where","groupby","groupField","distinct"],h={name:"UniClouddb",props:{options:{type:[Object,Array],default:function(){return{}}},collection:{type:String,default:""},action:{type:String,default:""},field:{type:String,default:""},orderby:{type:String,default:""},where:{type:[String,Object],default:""},pageData:{type:String,default:"add"},pageCurrent:{type:Number,default:1},pageSize:{type:Number,default:20},getcount:{type:[Boolean,String],default:!1},getone:{type:[Boolean,String],default:!1},gettree:{type:[Boolean,String],default:!1},gettreepath:{type:[Boolean,String],default:!1},startwith:{type:String,default:""},limitlevel:{type:Number,default:10},groupby:{type:String,default:""},groupField:{type:String,default:""},distinct:{type:[Boolean,String],default:!1},manual:{type:Boolean,default:!1}},data:function(){return{loading:!1,hasMore:!1,dataList:this.getone?void 0:[],paginationInternal:{},errorMessage:""}},created:function(){var t=this;this._isEnded=!1,this.paginationInternal={current:this.pageCurrent,size:this.pageSize,count:0},this.$watch((function(){var e=[];return d.forEach((function(n){e.push(t[n])})),e}),(function(e,n){t.paginationInternal.size=t.pageSize;for(var a=!1,i=2;i<e.length;i++)if(e[i]!==n[i]){a=!0;break}a&&(t.clear(),t.reset()),e[0]!==n[0]&&(t.paginationInternal.current=t.pageCurrent),t._execLoadData()})),this.manual||this.loadData()},methods:{loadData:function(t,e){var n=null,a=!1;"object"===typeof t?(t.clear&&(this.pageData===u.replace?this.clear():a=t.clear,this.reset()),void 0!==t.current&&(this.paginationInternal.current=t.current),"function"===typeof e&&(n=e)):"function"===typeof t&&(n=t),this._execLoadData(n,a)},loadMore:function(){this._isEnded||this._execLoadData()},refresh:function(){this.clear(),this._execLoadData()},clear:function(){this._isEnded=!1,this.dataList=[]},reset:function(){this.paginationInternal.current=1},add:function(e){var a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=a.action,o=a.showToast,r=void 0===o||o,c=a.toastTitle,l=a.success,s=a.fail,u=a.complete;t.showLoading();var d=n.database();i&&(d=d.action(i)),d.collection(this.collection).add(e).then((function(e){l&&l(e),r&&t.showToast({title:c||"新增成功"})})).catch((function(e){s&&s(e),t.showModal({content:e.message,showCancel:!1})})).finally((function(){t.hideLoading(),u&&u()}))},remove:function(e){var n=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=a.action,o=a.success,r=a.fail,c=a.complete,l=a.confirmTitle,s=a.confirmContent;e&&e.length&&t.showModal({title:l||"提示",content:s||"是否删除该数据",showCancel:!0,success:function(t){t.confirm&&n._execRemove(e,i,o,r,c)}})},update:function(e,a){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{},o=i.action,r=i.showToast,c=void 0===r||r,l=i.toastTitle,s=i.success,u=i.fail,d=i.complete;t.showLoading();var h=n.database();return o&&(h=h.action(o)),h.collection(this.collection).doc(e).update(a).then((function(e){s&&s(e),c&&t.showToast({title:l||"修改成功"})})).catch((function(e){u&&u(e),t.showModal({content:e.message,showCancel:!1})})).finally((function(){t.hideLoading(),d&&d()}))},_execLoadData:function(t,e){var n=this;this.loading||(this.loading=!0,this.errorMessage="",this._getExec().then((function(i){n.loading=!1;var o=i.result,r=o.data,c=o.count;n._isEnded=r.length<n.pageSize,n.hasMore=!n._isEnded;var l=n.getone?r.length?r[0]:void 0:r;if(t&&t(l,n._isEnded),n._dispatchEvent(s.load,l),n.getone||n.pageData===u.replace)n.dataList=l;else{var d;if(e)n.dataList=l;else(d=n.dataList).push.apply(d,a(l));n.dataList.length&&n.paginationInternal.current++}n.getcount&&(n.paginationInternal.count=c)})).catch((function(e){n.loading=!1,n.errorMessage=e,t&&t(),n.$emit(s.error,e)})))},_getExec:function(){var t=n.database();this.action&&(t=t.action(this.action)),t=t.collection(this.collection),this.where&&Object.keys(this.where).length&&(t=t.where(this.where)),this.field&&(t=t.field(this.field)),this.groupby&&(t=t.groupBy(this.groupby)),this.groupField&&(t=t.groupField(this.groupField)),!0===this.distinct&&(t=t.distinct()),this.orderby&&(t=t.orderBy(this.orderby));var e=this.paginationInternal,a=e.current,i=e.size,o={};this.getcount&&(o.getCount=this.getcount);var r={limitLevel:this.limitlevel,startWith:this.startwith};return this.gettree&&(o.getTree=r),this.gettreepath&&(o.getTreePath=r),t=t.skip(i*(a-1)).limit(i).get(o),t},_execRemove:function(e,a,i,o,r){var c=this;if(this.collection&&e){var l=Array.isArray(e)?e:[e];if(l.length){t.showLoading({mask:!0});var s=n.database(),d=s.command,h=s;a&&(h=h.action(a)),h.collection(this.collection).where({_id:d.in(l)}).remove().then((function(t){i&&i(t.result),c.pageData===u.replace?c.refresh():c.removeData(l)})).catch((function(e){o&&o(e),t.showModal({content:e.message,showCancel:!1})})).finally((function(){t.hideLoading(),r&&r()}))}}},removeData:function(t){for(var e=t.slice(0),n=this.dataList,a=n.length-1;a>=0;a--){var i=e.indexOf(n[a]._id);i>=0&&(n.splice(a,1),e.splice(i,1))}},_dispatchEvent:function(t,e){this._changeDataFunction?this._changeDataFunction(e,this._isEnded):this.$emit(t,e,this._isEnded)}}};e.default=h}).call(this,n("543d")["default"],n("a9ff")["default"])}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'node-modules/@dcloudio/uni-cli-shared/components/unicloud-db-create-component',
    {
        'node-modules/@dcloudio/uni-cli-shared/components/unicloud-db-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("960d"))
        })
    },
    [['node-modules/@dcloudio/uni-cli-shared/components/unicloud-db-create-component']]
]);