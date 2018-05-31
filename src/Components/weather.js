import React, { Component } from 'react';
import axios from 'axios'
import {Bar, Line, Pie} from 'react-chartjs-2';


class Weather extends Component{
  constructor(){
    super()
    this.state = {
      chartData: {},
      location: ''
      //weather: {},
      //dates: {}
    }
  }

  static defaultProps = {
   displayTitle:true,
   displayLegend: true,
   legendPosition:'right',
 }

  componentDidMount(){
    console.log(process.env.REACT_APP_API_KEY)
    axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${this.props.location.lat}&lon=${this.props.location.lng}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => {
        const location = res.data.city.name
        const weather = res.data.list.slice(0,20).map((elem, i) =>{
          if(i%2 === 0){
            return Math.round(elem.main.temp)
          }
        }).filter(elem => elem !== undefined)

        const dates = res.data.list.slice(0,20).map((elem, i) => {
          if(i%2 === 0){
            return elem.dt_txt.slice(5, 16)
          }
        }).filter(elem => elem !== undefined)
        //const time = res.data.list.map(elem => elem.main.temp)
        this.setState({
          chartData: {
            labels: [...dates],
            datasets: [
              {
                label: 'Temperature',
                data: [...weather],
                backgroundColor:[
                  'rgba(0, 0, 0, 0,3)',
                ],
                fill: false,
                borderColor: [
                  'rgba(55,187,132,1)',

                ],
              }
            ]
          },
          location
        })
        //this.setState({weather,  dates})
      })
  }

  render(){
    return(
      <div className='deepTile'>
        <Line
          data={this.state.chartData}
          width={780}
	        height={385}
          options={{
            title:{
              display:this.props.displayTitle,
              text: 'Temperature in '+this.state.location,
              fontSize:25
            },
          }}
        />
      </div>
    )
  }
}

export default Weather;
