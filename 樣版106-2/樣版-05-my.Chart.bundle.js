var ctx = document.getElementById("myChart").getContext('2d');

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: myLabel,
        datasets: [{
            label: '產品價格',
            data: myData,
            fill: false,
            backgroundColor: 'rgba(212, 106, 106, 1)',
            borderColor: 'rgba(212, 106, 106, 1)'
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
