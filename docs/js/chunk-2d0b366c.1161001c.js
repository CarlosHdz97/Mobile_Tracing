(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b366c"],{"27e6":function(t,e,s){"use strict";s.r(e);var o=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("b-container",{attrs:{fluid:""}},[s("p",{staticClass:"text-center text-info h2 mb-2 mt-3 mb-md-5"},[t._v("Teléfonos "),s("font-awesome-icon",{staticClass:"text-dark",attrs:{icon:"plus-circle",hidden:t.hidden},on:{click:t.addMobile}})],1),s("b-row",[s("b-col",{staticClass:"my-1",attrs:{md:"6"}},[s("b-form-group",{staticClass:"mb-0",attrs:{"label-cols-sm":"3",label:"Filter"}},[s("b-input-group",[s("b-form-input",{attrs:{placeholder:"Type to Search"},model:{value:t.filter,callback:function(e){t.filter=e},expression:"filter"}}),s("b-input-group-append",[s("b-button",{attrs:{disabled:!t.filter},on:{click:function(e){t.filter=""}}},[t._v("Clear")])],1)],1)],1)],1),s("b-col",{staticClass:"my-1",attrs:{md:"6"}},[s("b-form-group",{staticClass:"mb-0",attrs:{"label-cols-sm":"3",label:"Sort"}},[s("b-input-group",[s("b-form-select",{attrs:{options:t.sortOptions},model:{value:t.sortBy,callback:function(e){t.sortBy=e},expression:"sortBy"}},[s("option",{attrs:{slot:"first"},domProps:{value:null},slot:"first"},[t._v("-- none --")])]),s("b-form-select",{attrs:{slot:"append",disabled:!t.sortBy},slot:"append",model:{value:t.sortDesc,callback:function(e){t.sortDesc=e},expression:"sortDesc"}},[s("option",{domProps:{value:!1}},[t._v("Asc")]),s("option",{domProps:{value:!0}},[t._v("Desc")])])],1)],1)],1),s("b-col",{staticClass:"my-1",attrs:{md:"6"}},[s("b-form-group",{staticClass:"mb-0",attrs:{"label-cols-sm":"3",label:"Sort direction"}},[s("b-form-select",{model:{value:t.sortDirection,callback:function(e){t.sortDirection=e},expression:"sortDirection"}},[s("option",{attrs:{value:"asc"}},[t._v("Asc")]),s("option",{attrs:{value:"desc"}},[t._v("Desc")]),s("option",{attrs:{value:"last"}},[t._v("Last")])])],1)],1),s("b-col",{staticClass:"my-1",attrs:{md:"6"}},[s("b-form-group",{staticClass:"mb-0",attrs:{"label-cols-sm":"3",label:"Per page"}},[s("b-form-select",{attrs:{options:t.pageOptions},model:{value:t.perPage,callback:function(e){t.perPage=e},expression:"perPage"}})],1)],1)],1),s("b-table",{attrs:{"show-empty":"",stacked:"md",items:t.items,fields:t.fields,"current-page":t.currentPage,"per-page":t.perPage,filter:t.filter,"sort-by":t.sortBy,"sort-desc":t.sortDesc,"sort-direction":t.sortDirection},on:{"update:sortBy":function(e){t.sortBy=e},"update:sort-by":function(e){t.sortBy=e},"update:sortDesc":function(e){t.sortDesc=e},"update:sort-desc":function(e){t.sortDesc=e},filtered:t.onFiltered},scopedSlots:t._u([{key:"name",fn:function(e){return[t._v("\n      "+t._s(e.value.first)+" "+t._s(e.value.last)+"\n    ")]}},{key:"isActive",fn:function(e){return[t._v("\n      "+t._s(e.value?"Yes :)":"No :(")+"\n    ")]}},{key:"actions",fn:function(e){return[s("b-button",{staticClass:"mr-1",attrs:{size:"sm"},on:{click:function(s){return t.info(e.item,e.index,s.target)}}},[t._v("\n        Info modal\n      ")]),s("b-button",{attrs:{size:"sm"},on:{click:e.toggleDetails}},[t._v("\n        "+t._s(e.detailsShowing?"Hide":"Show")+" Details\n      ")])]}},{key:"row-details",fn:function(e){return[s("b-card",[s("ul",t._l(e.item,function(e,o){return s("li",{key:o},[t._v(t._s(o)+": "+t._s(e))])}),0)])]}}])}),s("b-row",[s("b-col",{staticClass:"my-1",attrs:{md:"6"}},[s("b-pagination",{staticClass:"my-0",attrs:{"total-rows":t.totalRows,"per-page":t.perPage},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)],1),s("b-modal",{attrs:{id:t.infoModal.id,title:t.infoModal.title,"ok-only":""},on:{hide:t.resetInfoModal}},[s("pre",[t._v(t._s(t.infoModal.content))])])],1)},a=[],i={data:function(){return{hidden:!1,items:[{isActive:!0,age:40,name:{first:"Dickerson",last:"Macdonald"}},{isActive:!1,age:21,name:{first:"Larsen",last:"Shaw"}},{isActive:!1,age:9,name:{first:"Mini",last:"Navarro"},_rowVariant:"success"},{isActive:!1,age:89,name:{first:"Geneva",last:"Wilson"}},{isActive:!0,age:38,name:{first:"Jami",last:"Carney"}},{isActive:!1,age:27,name:{first:"Essie",last:"Dunlap"}},{isActive:!0,age:40,name:{first:"Thor",last:"Macdonald"}},{isActive:!0,age:87,name:{first:"Larsen",last:"Shaw"},_cellVariants:{age:"danger",isActive:"warning"}},{isActive:!1,age:26,name:{first:"Mitzi",last:"Navarro"}},{isActive:!1,age:22,name:{first:"Genevieve",last:"Wilson"}},{isActive:!0,age:38,name:{first:"John",last:"Carney"}},{isActive:!1,age:29,name:{first:"Dick",last:"Dunlap"}}],fields:[{key:"name",label:"Person Full name",sortable:!0,sortDirection:"desc"},{key:"age",label:"Person age",sortable:!0,class:"text-center"},{key:"isActive",label:"is Active"},{key:"actions",label:"Actions"}],totalRows:1,currentPage:1,perPage:5,pageOptions:[5,10,15],sortBy:null,sortDesc:!1,sortDirection:"asc",filter:null,infoModal:{id:"info-modal",title:"",content:""}}},computed:{sortOptions:function(){return this.fields.filter(function(t){return t.sortable}).map(function(t){return{text:t.label,value:t.key}})}},mounted:function(){this.totalRows=this.items.length},methods:{addMobile:function(){this.hidden=!0,this.$router.push({path:"mobile/create"})},info:function(t,e,s){this.infoModal.title="Row index: ".concat(e),this.infoModal.content=JSON.stringify(t,null,2),this.$root.$emit("bv::show::modal",this.infoModal.id,s)},resetInfoModal:function(){this.infoModal.title="",this.infoModal.content=""},onFiltered:function(t){this.totalRows=t.length,this.currentPage=1}}},n=i,r=s("2877"),l=Object(r["a"])(n,o,a,!1,null,null,null);e["default"]=l.exports}}]);
//# sourceMappingURL=chunk-2d0b366c.1161001c.js.map