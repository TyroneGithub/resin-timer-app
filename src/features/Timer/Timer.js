import React, { useState, useEffect } from 'react';
import { Text, Input, Card, Button } from 'react-native-elements';
import { View } from 'react-native';
import _ from "lodash";
import moment from "moment";



const TOTALRESIN = 160;
const RESININTERVAL = 8;
// moment().zone("+08:00");

const computeTime = (numResins, startTime) => {
  // console.log(startTime)
  moment(startTime).utcOffset(8).format('HH:mm');
  let resinDiff = TOTALRESIN - numResins;
  let timeToComplete = resinDiff * RESININTERVAL ;

  let d = new Date();
  let timeDifference = parseInt(Math.abs(d.getTime() - startTime.getTime()) / 1000);

  let hours = parseInt(timeToComplete / 60);
  let mins = parseInt(timeToComplete % 60);


  let currHours = parseInt((timeToComplete - timeDifference / 60) / 60);
  let currMins = parseInt((timeToComplete - timeDifference / 60) % 60);
  let currSecs = parseInt((timeToComplete * 60 - timeDifference) % 60)

  let currResins = parseInt(timeDifference / (60 * RESININTERVAL) + parseInt(numResins));


  let timeLeft = {
    hours: currHours,
    min: currMins,
    sec: currSecs,
    resins: currResins,
    time: moment(startTime).add(hours, "hours").add(mins, "mins").format("LT")
  }

  return timeLeft; 

}

const Timer = () => {
  // let time = 
  const [startTime, setStartTime] = useState(new Date());
  
  const [numResins, setNumResins] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});
  

  useEffect(() => {
    if(!_.isEmpty(timeLeft)){
      const timer = setTimeout(() => {
        setTimeLeft(computeTime(numResins, startTime));
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  });
  

  return (
    <Card>
      <Input placeholder='Current number of resins' 
        keyboardType='number-pad' 
        onChangeText={(text)=>{setNumResins(parseInt(text))}} />

      <Button title="Calculate" onPress={()=>{
        setTimeLeft(computeTime(numResins, startTime));
        setStartTime(new Date());
      }} />
      <View style={{ alignItems:`center` }}>
        <Text h3>Resins</Text>
        <Text h4>{timeLeft.resins}</Text>
        <Text h3>Duration</Text>
        <Text h4> {timeLeft.hours}hrs {timeLeft.min}mins {timeLeft.sec}secs </Text>
        <Text h4> {timeLeft.time}</Text>
      </View>
      {/* {timeComponents.length > 0 ? (<View>{timeComponents} </View>):(<View></View>) } */}
      {/* {timeLeft ? () : (<Text></Text>)} */}
    </Card>
  )
}

export default Timer
