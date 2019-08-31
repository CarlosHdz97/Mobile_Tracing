<template>
  <div>
      <canvas id="telefonos"></canvas>
  </div>
</template>

<script>
    import mobileChartData from './chart.js'
    import Mobile from '../services/API/Mobile.js'
    export default{
        data(){
            return{
                mobileChartData : mobileChartData,
                datosGrafico: [2,2,3,2]
            }
        },
        created(){
            this.getQuantities();
        },
        methods:{
            getQuantities(){
                Mobile.trygetQuantity().then(res=>{
                    this.datosGrafico = res.quantities;
                    this.createChart('telefonos', this.mobileChartData)
                }).catch(err=>{
                    console.log(err);
                });
            },
            createChart(chartId, chartData) {
                chartData.data.datasets[0].data = this.datosGrafico;
                const ctx = document.getElementById(chartId);
                const myChart = new Chart(ctx, {
                    type: chartData.type,
                    data: chartData.data,
                    options: chartData.options,
                });
            }
        }
    }
</script>
<style>
</style>