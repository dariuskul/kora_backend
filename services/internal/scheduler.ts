import Timer from "../../db/models/timer"

// export const stopTimer = async () => {
//   const timers = await Timer.findAll();
//   if (!timers) return;

//   timers.map(timer => {
//     if (!timer.endDate && (Number(Date.now()) - Number(new Date(timer.startDate)) > 5000)) {
//       timer.update({ endDate: new Date().toISOString() });
//       console.log('stopped');
//     }
//   })
// }