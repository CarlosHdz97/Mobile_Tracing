(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d212c15"],{aa87:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("b-row",{attrs:{"align-h":"center"}},[a("b-col",{attrs:{md:"6"}},[e.show?a("b-form",{staticClass:"p-4 m-2",on:{submit:e.onSubmit,reset:e.onReset}},[a("h3",{staticClass:"text-center text-dark"},[e._v("Prestamo de equipo")]),a("b-form-group",{attrs:{label:"Fecha de prestamo: "}},[a("b-form-input",{attrs:{type:"date",required:""},model:{value:e.form.fecha_prestamo,callback:function(t){e.$set(e.form,"fecha_prestamo",t)},expression:"form.fecha_prestamo"}})],1),a("b-form-group",{attrs:{label:"Sucursal: "}},[a("b-form-select",{attrs:{options:e.options_sucursal},model:{value:e.form.sucursal,callback:function(t){e.$set(e.form,"sucursal",t)},expression:"form.sucursal"}})],1),a("b-form-group",{attrs:{label:"Entrega: "}},[a("b-form-input",{attrs:{type:"text",placeholder:"Ingrese el nombre de la persona",required:""},model:{value:e.form.entrega,callback:function(t){e.$set(e.form,"entrega",t)},expression:"form.entrega"}})],1),a("b-form-group",{attrs:{label:"Recibe: "}},[a("b-form-input",{attrs:{type:"text",placeholder:"Ingrese el nombre de la persona",required:""},model:{value:e.form.recibe,callback:function(t){e.$set(e.form,"recibe",t)},expression:"form.recibe"}})],1),a("div",{staticClass:"text-right"},[a("b-button-group",[a("b-button",{attrs:{type:"reset",variant:"danger"}},[e._v("Cancelar")]),a("b-button",{attrs:{type:"submit",variant:"primary"}},[e._v("Guardar")])],1)],1)],1):e._e()],1)],1)},o=[],s={data:function(){return{form:{fecha_prestamo:"",sucursal:"",entrega:"",recibe:null,accesorios:[]},show:!0,options_sucursal:[{value:"Apartado 1",text:"Apartado 1"},{value:"Apartado 2",text:"Apartado 2"},{value:"Brasil",text:"Brasil"},{value:"CEDIS San Pablo",text:"CEDIS San Pablo"},{value:"Corona 1",text:"Corona 1"},{value:"Corona 2",text:"Corona 2"},{value:"Correo 1",text:"Correo 1"},{value:"Correo 2",text:"Correo 2"},{value:"Pantaco",text:"Pantaco"},{value:"San pablo 1",text:"San Pablo 1"},{value:"San pablo 2",text:"San Pablo 2"}]}},methods:{onSubmit:function(e){e.preventDefault(),alert(JSON.stringify(this.form))},onReset:function(e){var t=this;e.preventDefault(),this.form.user="",this.show=!1,this.$nextTick(function(){t.show=!0}),"Asignado"==this.$store.state.mobile.status?this.$router.push({path:"create"}):this.$router.push({path:"/mobile"})}}},n=s,l=a("2877"),u=Object(l["a"])(n,r,o,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-2d212c15.e89e71c9.js.map