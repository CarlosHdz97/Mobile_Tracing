
export const mobileChartData = {
    type: 'doughnut',
    data:{
        labels:["Sin asignar", "Asignado", "Perdido", "En reparación"],
        datasets: [{
            label: 'Stock de teléfonos',
            data: [10,20,30,40],
            backgroundColor: [
                'rgba(40, 167, 69, 1)',
                'rgba(255, 193, 7, 1)',
                'rgba(220, 53, 69, 1)',
                'rgba(23, 162, 184, 1)',
            ],
            borderColor: ['#36495d', '#36495d', '#36495d', '#36495d'],
            borderWidth: 0
        }],
        options: {
            responsive: true,
            legend:{
                position: 'left',
                fullWidth: false,
                labels: {
                    fontColor: '#f00'
                }
            },
        }
    }
}
export default mobileChartData;
