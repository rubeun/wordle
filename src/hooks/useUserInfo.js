import { useState } from "react";

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    wins: 0,
    losses: 0,
    guessIn1: 0,
    guessIn2: 0,
    guessIn3: 0,
    guessIn4: 0,
    guessIn5: 0,
    guessIn6: 0,
    previousWordOfTheDays: [],
  })

  const addWin = () => {
    const newWins = userInfo.wins + 1;
    setUserInfo(userInfo => ({
      ...userInfo,
      wins: newWins,
    }))
  }

  const addLoss = () => {
    const newLosses = userInfo.losses + 1;
    setUserInfo(userInfo => ({
      ...userInfo,
      losses: newLosses,
    }))
  }

  const addPreviousWordOfTheDay = ( word ) => {
    setUserInfo(userInfo => ({
      ...userInfo,
      previousWordOfTheDays: [...userInfo.previousWordOfTheDays, word],
    }))
  }
  

  return {
    userInfo,
    addWin,
    addLoss,
    addPreviousWordOfTheDay,
  }
}