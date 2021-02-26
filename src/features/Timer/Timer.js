import React, { useState, useEffect } from 'react';
import { Text, Input, Card, Button } from 'react-native-elements';
import _ from "lodash";



const TOTALRESIN = 160;
const RESININTERVAL = 8;


const computeTime = (numResins, startTime) => {
  // console.log(startTime)
  let resinDiff = TOTALRESIN - numResins;
  let timeToComplete = resinDiff * RESININTERVAL ;

  let d = new Date();
  let timeDifference = parseInt(Math.abs(d.getTime() - startTime.getTime()) / 1000);

  let currHours = parseInt((timeToComplete - timeDifference / 60) / 60);
  let currMins = parseInt((timeToComplete - timeDifference / 60) % 60);
  let currSecs = parseInt((timeToComplete * 60 - timeDifference) % 60)

  let currResins = numResins + parseInt(timeDifference / (60 * RESININTERVAL));


  let timeLeft = {
    hours: currHours,
    min: currMins,
    sec: currSecs,
    resins: currResins,
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
        setTimeLeft(computeTime(timeLeft.resins, startTime));
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
      <Text h3> {timeLeft.hours} {timeLeft.min} {timeLeft.sec} </Text>
      {/* {timeLeft ? () : (<Text></Text>)} */}
    </Card>
  )
}

export default Timer
