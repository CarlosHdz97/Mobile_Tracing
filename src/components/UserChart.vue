<template>
    <div>
      <canvas id="users"></canvas>
      {{available}}
  </div>
</template>
<script>
    import userChartData from './chartUser.js'
    export default {
        data(){
            return{
                userChartData: userChartData
            }
        },
        /* mounted(){
            this.createChart('users', this.userChartData);
        }, */
        computed:{
            available: function(){
                return this.$store.state.user.available.length>0 ? this.createChart('users', this.userChartData): '';
            },
            disavailable: function(){
            return this.$store.state.user.disavailable.length>0 ? this.createChart('users', this.userChartData): '';
            }
        },
        methods:{
            createChart(chartId, chartData) {
                const ctx = document.getElementById(chartId);
                const myChart = new Chart(ctx, {
                    type: 'doughnut',
                    data:{
                        labels:["Con teléfono", "Sin telefono"],
                        datasets: [{
                            label: 'Inventario de teléfonos',
                            data: [this.$store.state.user.disavailable.length,this.$store.state.user.available.length],
                            backgroundColor: [
                                'rgba(40, 167, 69, 1)',
                                'rgba(255, 193, 7, 1)',
                            ],
                            borderColor: ['#36495d', '#36495d'],
                            borderWidth: 1
                        }],
                    },
                    options: {
                        responsive: true,
                        legend:{
                            onClick: function(e, d){
                                console.log(d);
                            }
                        },
                    }
                });
            }
        }
    }
</script>
