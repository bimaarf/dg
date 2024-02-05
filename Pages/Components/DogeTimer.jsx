// import React, { useEffect, useState } from "react";
// import { View, Text } from "react-native";
// import moment from "moment";
// import _BackgroundTimer from "react-native-background-timer";

// export const DogeTimer = ({ authDoge }) => {
//   const [progress, setProgress] = useState(0);
//   const [amount, setAmount] = useState(0);

//   const updateProgressBar = () => {
//     const currentTime = moment();
//     const midnight = moment().endOf("day");

//     const timeDifference = midnight.diff(currentTime);
//     const percentageRemaining = (timeDifference / 86400000) * 100;

//     setProgress(100 - percentageRemaining);

//     if (progress !== 0) {
//       setAmount((progress * 0.6) / 100);
//     } else {
//       setAmount(0);
//     }
//   };

//   useEffect(() => {
//     const intervalId = _BackgroundTimer.setInterval(updateProgressBar, 1000);

//     return () => {
//       _BackgroundTimer.clearInterval(intervalId);
//     };
//   }, []);

//   return (
//     <View>
//       <Text
//         style={{
//           fontWeight: "bold",
//           textAlign: "center",
//           color: "yellow",
//         }}>
//         Doge : {authDoge}
//       </Text>
//       <Text
//         style={{
//           fontWeight: "bold",
//           textAlign: "center",
//           color: "yellow",
//           marginTop: 4,
//         }}>
//         Pasive Commition
//       </Text>
//       <View
//         style={{
//           width: `${progress}%`,
//           backgroundColor: "green",
//         }}></View>
//       <Text style={{ color: "yellow", textAlign: "center" }}>{amount}</Text>
//       <Text style={{ color: "white", textAlign: "center", marginTop: 4 }}>
//         Progress / day
//       </Text>
//       <View
//         style={{
//           width: `${progress}%`,
//           backgroundColor: "green",
//         }}></View>
//       <Text style={{ color: "yellow", textAlign: "center" }}>
//         {progress.toFixed(2)}%
//       </Text>
//     </View>
//   );
// };
