import React, {useState, useEffect} from 'react';
import {Text, Input, Card, Button} from 'react-native-elements';
import {View, Image} from 'react-native';
import _ from 'lodash';
import moment from 'moment';

const TOTALRESIN = 160;
const RESININTERVAL = 8;
// moment().zone("+08:00");

const computeTime = (numResins, startTime) => {
  // console.log(startTime)
  let resinDiff = TOTALRESIN - numResins;
  let timeToComplete = resinDiff * RESININTERVAL;

  let d = new Date();
  let timeDifference = parseInt(
    Math.abs(d.getTime() - startTime.getTime()) / 1000,
  );

  let hoursH = parseInt(timeToComplete / 60) - 16;
  let minsH = parseInt(timeToComplete % 60);

  let currHours = parseInt((timeToComplete - timeDifference / 60) / 60);
  let currMins = parseInt((timeToComplete - timeDifference / 60) % 60);
  let currSecs = parseInt((timeToComplete * 60 - timeDifference) % 60);

  let currResins = parseInt(
    timeDifference / (60 * RESININTERVAL) + parseInt(numResins),
  );

  if (
    currResins >= TOTALRESIN &&
    currHours == 0 &&
    currMins == 0 &&
    currSecs == 0
  ) {
    return;
  }

  let timeLeft = {
    hours: currHours,
    min: currMins,
    sec: currSecs,
    resins: currResins,
    time: moment(startTime)
      .add(hoursH, 'hour')
      .add(minsH, 'minute')
      .format('LT'),
  };

  return timeLeft;
};

const Timer = () => {
  // let time =
  const [startTime, setStartTime] = useState(new Date());

  const [numResins, setNumResins] = useState(0);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    if (!_.isEmpty(timeLeft)) {
      const timer = setTimeout(() => {
        setTimeLeft(computeTime(numResins, startTime));
      }, 1000);
      return () => {
        clearTimeout(timer);
      };
    }
  });

  return (
    <Card containerStyle={{opacity: 0.85, height: `90%`}}>
      <View style={{alignItems: 'center', paddingVertical: 40}}>
        <Text
          style={{
            fontFamily: 'FredokaOne-Regular',
            fontSize: 36,
            color: `#248082`,
            marginBottom: 28,
          }}>
          Welcome Traveler
        </Text>
        <Input
          placeholder="Current number of resins"
          keyboardType="number-pad"
          onChangeText={(text) => {
            setNumResins(parseInt(text));
          }}
          style={{
            backgroundColor: `#fff`,
            borderBottomWidth: 0,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.23,
            shadowRadius: 2.62,
            elevation: 4,
            paddingHorizontal: 8,
          }}
        />

        <Button
          title="Calculate"
          onPress={() => {
            setTimeLeft(computeTime(numResins, startTime));
            setStartTime(new Date());
          }}
          titleStyle={{fontFamily: `FredokaOne-Regular`, fontSize: 18}}
          buttonStyle={{
            paddingVertical: 8,
            paddingHorizontal: 65,
            backgroundColor: `#248082`,
            borderRadius: 8,
          }}
        />
      </View>
      {!_.isEmpty(timeLeft) ? (
        <View style={{alignItems: `center`}}>
          <View
            style={{
              borderBottomWidth: 2,
              width: `100%`,
              alignItems: `center`,
              borderBottomColor: `#509083`,
              marginBottom: 16,
            }}>
            <Text
              style={{
                fontFamily: 'FredokaOne-Regular',
                fontSize: 24,
                color: `#509083`,
              }}>
              Resins
            </Text>
            <Text
              style={{
                color: `#509083`,
                fontSize: 18,
                marginBottom: 6,
              }}>
              {timeLeft.resins}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              width: `100%`,
              alignItems: `center`,
              borderBottomColor: `#509083`,
              marginBottom: 16,
            }}>
            <Text
              style={{
                fontFamily: 'FredokaOne-Regular',
                fontSize: 24,
                color: `#509083`,
              }}>
              Refresh Duration
            </Text>
            <Text
              style={{
                color: `#509083`,
                fontSize: 18,
                marginBottom: 6,
              }}>
              {timeLeft.hours}hrs {timeLeft.min}mins {timeLeft.sec}secs{' '}
            </Text>
          </View>
          <View
            style={{
              borderBottomWidth: 2,
              width: `100%`,
              alignItems: `center`,
              borderBottomColor: `#509083`,
              marginBottom: 16,
            }}>
            <Text
              style={{
                fontFamily: 'FredokaOne-Regular',
                fontSize: 24,
                color: `#509083`,
              }}>
              Time to Complete
            </Text>
            <Text
              style={{
                color: `#509083`,
                fontSize: 18,
                marginBottom: 6,
              }}>
              {timeLeft.time}
            </Text>
          </View>
        </View>
      ) : (
        <View></View>
      )}

      {/* {timeComponents.length > 0 ? (<View>{timeComponents} </View>):(<View></View>) } */}
      {/* {timeLeft ? () : (<Text></Text>)} */}
    </Card>
  );
};

export default Timer;
