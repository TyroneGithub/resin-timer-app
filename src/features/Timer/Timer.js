import React, { useState, useEffect } from 'react';
import { Text, Input, Card, Button } from 'react-native-elements';




const TOTALRESIN = 160;
const RESININTERVAL = 8;


const computeTime = (numResins, startTime) => {
  // console.log(startTime)
  let resinDiff = TOTALRESIN - numResins;
  let timeToComplete = resinDiff * RESININTERVAL ;


  let timeDifference = parseInt(Math.abs(new Date().getTime() - startTime.getTime()) / 1000);

  let currHours = parseInt((timeToComplete - timeDifference / 60) / 60);
  let currMins = parseInt((timeToComplete - timeDifference / 60) % 60);
  let currSecs = parseInt((timeToComplete * 60 - timeDifference) % 60)

  let currResins = numResins + parseInt(timeDifference / (60 * RESININTERVAL));


  let timeLeft = {
    hours: currHours,
    min: currMins,
    sec: currSecs,
    resins: currResins
  }

  return timeLeft; 

}

const Timer = () => {
  // let time = 
  let startTime = new Date();
  
  const [numResins, setNumResins] = useState(0);
  const [timeLeft, setTimeLeft] = useState(-1);
  
  useEffect(() => {
    if(timeLeft != -1){
      const timer = setInterval(() => {
        setTimeLeft(computeTime(timeLeft.resins, startTime));
      });
    }
    // return () => clearTimeout(timer);
  })
  

  return (
    <Card>
      <Input placeholder='Current number of resins' 
        keyboardType='number-pad' 
        onChangeText={(text)=>{setNumResins(parseInt(text))}} />

      <Button title="Calculate" onPress={()=>{ setTimeLeft(computeTime(numResins, startTime))}} />
      
      <Text h3> {timeLeft.hours} {timeLeft.min} {timeLeft.sec} </Text>
    </Card>
  )
}

export default Timer
