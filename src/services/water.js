import Users from '../models/users.js';
import { WaterCollection } from '../models/water.js';

export async function createWaterRecord(record) {
  return WaterCollection.create(record);
}

export async function getWaterRecord(id, date) {
  return WaterCollection.findOne({
    userId: id,
    date: date,
  });
}

export async function deleteWaterRecord(id, userId) {
  return WaterCollection.findOneAndDelete({
    _id: id,
    userId,
  });
}

export async function updateWaterRecord(id, userId, updatedData) {
  return await WaterCollection.findOneAndUpdate(
    { _id: id, userId },
    updatedData,
    {
      new: true,
    },
  );
}
export async function getUser(userId) {
  return await Users.findById(userId);
}
export async function getWaterDay(userId, date) {
  const startDay = date + 'S';
  const endDay = date + 'U';
  return await WaterCollection.find(
    {
      userId: userId,
      date: {
        $gt: startDay,
        $lt: endDay,
      },
    },
    { _id: true, date: true, volume: true },
  ).sort({ date: 1 });
}

export async function getWaterMonth(userId, month) {
  const startMonth = month + ',';
  const endMonth = month + '.';

  return await WaterCollection.find({
    userId: userId,
    date: {
      $gt: startMonth,
      $lt: endMonth,
    },
  });
}
