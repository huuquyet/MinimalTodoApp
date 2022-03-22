import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (state) => {
  try {
    if (state) {
      const jsonValue = JSON.stringify(state);
      await AsyncStorage.setItem("@minimal_todo", jsonValue);
    }
  } catch (e) {
    console.log(e);
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("@minimal_todo");
    const state = JSON.parse(jsonValue);
    return state != null ? state : undefined;
  } catch (e) {
    console.log(e);
  }
};
