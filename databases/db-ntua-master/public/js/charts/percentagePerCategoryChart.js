'use strict';

class PercentagePerCategoryChart extends React.Component {
    constructor(props) {
        super(props)
        this.chartRef = React.createRef();
    }
    
    componentDidMount() {
        let percentage =[]
        fetch("http://localhost:3000/api/prefered_products_per_category")
        .then(res => res.json())
        .then((result) => {
            for (let res of result) {
                if (res.Percentage < 1 ) 
                    percentage.push(res.Percentage*10000%100)
                else 
                    percentage.push(res.Percentage*100)
            }
            
            this.chartRef.current.focus();
            this.myChart = new Chart(this.chartRef.current, {
                type: 'bar',
                data: {
                    labels: ["Fresh","Frozen","Liquor & Spirits","Self Care","Home","Pet"],
                    datasets: [{
                        label: 'Percentage of total sales',
                        data: percentage, 
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)'
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)'
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    legend: {
                        labels: {
                            fontColor: 'black'
                        }
                    },
                    scales: {
                        yAxes: [{
                            ticks: {
                                fontColor: 'black',
                                fontSize: 14,
                                beginAtZero: true
                            }
                        }],
                        xAxes: [{
                            ticks: {
                                fontColor: 'black',
                                fontSize: 14,
                                beginAtZero: true,
                            }
                        }]
                    }
                }
            });
                          
            },
          (error) => {
            this.setState({
              error
            });
          }
        )        
    }

    render(){
        return (
            <div>
                <canvas ref={this.chartRef} />
            </div>
        );
    }
}

ReactDOM.render(<PercentagePerCategoryChart/>, document.getElementById('percentage_per_category_chart'));