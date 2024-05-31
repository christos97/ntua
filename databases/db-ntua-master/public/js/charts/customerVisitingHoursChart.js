'use strict';

Chart.defaults.global.legend.display = false;

class CustomerVisitingHoursChart extends React.Component {
    constructor(props) {
        super(props)
        this.chartRef = React.createRef();
    }

    componentDidMount() {
        let card = ((document.baseURI).split('/'))[4]
        let visits = [0]
        fetch(`http://localhost:3000/api/customer_visiting_hours/${card}`)
        .then(res => res.json())
        .then( (result) => {
            let i=1
            for (let r of result) {
               if (r.Time_range == i ){
                   visits.push(r.cnt)
                   i++
               }
               if(r.Time_range > i){
                   visits.push(0, r.cnt) 
                   i+=2
               }
            }
            this.chartRef.current.focus();
            this.myChart = new Chart(this.chartRef.current, {
                type: 'line',
                data: {
                    labels: ["09:00","10:00","11:00","12:00","13:00","14:00",
                    "15:00","16:00","17:00","18:00","19:00","20:00","21:00"],
                    datasets: [{
                        fill : false,
                        label: 'Transactions made the past hour',
                        data: visits, // times bought together...result[..].whatever
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
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
                                beginAtZero: true
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

ReactDOM.render(<CustomerVisitingHoursChart/>, document.getElementById('customer_visiting_hours_chart'));