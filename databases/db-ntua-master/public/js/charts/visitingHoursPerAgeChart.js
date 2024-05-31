'use strict';

class VisitingHoursPerAgeChart extends React.Component {
    constructor(props) {
        super(props)
        this.chartRef = React.createRef();
    }
    
    componentDidMount() {
    
        fetch("http://localhost:3000/api/most_visited_hours_per_age_bracket")
        .then(res => res.json())
        .then(
          (result) => {
            let br1=[0], br2=[0] , br3=[0]
            for (let data of result) {
                if (data.Age_range === '<=30' && data.Time_range)
                    br1.push(data.Visits)
                else if (data.Age_range === '31-45' && data.Time_range) 
                    br2.push(data.Visits)
                else if(data.Time_range)
                    br3.push(data.Visits)
            }
            this.chartRef.current.focus();
            this.myChart = new Chart(this.chartRef.current, {
                type: 'line',
                data: {
                    labels: [
                        "09:00","10:00","11:00","12:00",
                        "13:00","14:00","15:00",
                        "16:00","17:00","18:00",
                        "19:00","20:00","21:00"
                    ],
                    datasets: [{
                        label: '<30',
                        fill:false,
                        data: br1, 
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                        ],
                        borderWidth: 2
                    },
                    {
                        label: '31-45',
                        fill:false,
                        data: br2, 
                        borderColor: [
                            'rgba(54, 162, 235, 1)',
                        ],
                        borderWidth: 2
                    },
                    {
                        label: '46-65',
                        fill:false,
                        data: br3, 
                        borderColor: [
                            'rgba(255, 206, 86, 1)',
                        ],
                        borderWidth: 2
                    }]
                },
                options: {
                    legend: {
                        display : true
                    },
                    scales: {
                        yAxes: [{
                            label:{},
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
                                stepSize: 1,
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

ReactDOM.render(<VisitingHoursPerAgeChart/>, document.getElementById('visiting_hours_per_age_chart'));