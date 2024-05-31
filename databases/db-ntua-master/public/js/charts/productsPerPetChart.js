'use strict';
Chart.defaults.global.legend.display = false;
class ProductsPerPetChart extends React.Component {
    constructor(props) {
        super(props)
        this.chartRef = React.createRef();
    }
    
    componentDidMount() {

        let pets = [] , pieces = []
        fetch("http://localhost:3000/api/products_per_pet")
            .then(res => res.json())
            .then( (result) => {
               
                for (let row of result){
                    pets.push(row.Pet)
                    pieces.push(row.Total_piecies)
                }
                this.chartRef.current.focus();
                this.myChart = new Chart(this.chartRef.current, {
                    type: 'bar',
                    data: {
                        labels: pets,
                        datasets: [{
                            label: "Pieces bought",
                            data: pieces,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 206, 86, 0.2)',
                                'rgba(75, 192, 192, 0.2)',
                            ],
                            borderColor: [
                                'rgba(255, 99, 132, 1)',
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)',
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

ReactDOM.render(<ProductsPerPetChart/>, document.getElementById('products_per_pet_chart'));