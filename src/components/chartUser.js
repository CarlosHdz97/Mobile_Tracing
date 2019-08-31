export const userChartData = {
    type: 'doughnut',
    data:{
        labels:["Con teléfono", "Sin telefono"],
        datasets: [{
            label: 'Inventario de teléfonos',
            data: [10,20],
            backgroundColor: [
                'rgba(40, 167, 69, 1)',
                'rgba(255, 193, 7, 1)',
            ],
            borderColor: ['#36495d', '#36495d'],
            borderWidth: 1
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
export default userChartData;
