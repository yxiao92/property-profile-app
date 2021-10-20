import { copySorted } from "./utils.js";

const processNoiseInfo = (noiseObj) => {
  // template
  const noiseInfoStr =
    "The site is located ${dist} ${place}. It is ${freq} to experience ${degree} traffic noise.";

  const replaceStr = (str, obj) =>
    str
      .replace(/\${(.*?)}/g, (match, key) => obj[key])
      .replace(/\s+/g, " ")
      .trim();

  let noiseSource = [];
  let noiseInfoObj = {};

  // noise source & level
  !!noiseObj.aircraft && noiseSource.push("airfields");
  !!noiseObj.train && noiseSource.push("railways");
  !!noiseObj.car && noiseSource.push("major roads");
  noiseInfoObj.noiseLvl = noiseSource.length;

  if (noiseInfoObj.noiseLvl == 0) {
    noiseInfoObj.noiseDesc = replaceStr(noiseInfoStr, {
      dist: "away from",
      place: "airfields, railways or major roads",
      freq: "not often",
      degree: "",
    });
  } else if (noiseInfoObj.noiseLvl == 3) {
    noiseInfoObj.noiseDesc = replaceStr(noiseInfoStr, {
      dist: "near",
      place: "airfields, railways and major roads",
      freq: "very likely",
      degree: "regular",
    });
  } else {
    noiseInfoObj.noiseDesc = replaceStr(noiseInfoStr, {
      dist: "near",
      place: noiseSource.join(" and "),
      freq: "likely",
      degree: "some degree of",
    });
  }
  // console.log(noiseInfoObj);
  return noiseInfoObj;
};

const processPowerLinesInfo = (arr) => {
  const pluraliseWord = (cnt) => (cnt > 1 ? "lines" : "line");

  if (arr != null) {
    const pLInfoArr = copySorted(arr, "distance").map(
      (el) => `${el.voltage} (${el.distance}m)`
    );

    const pLCnt = pLInfoArr.length;
    const pLDetails = pLInfoArr.join(", ");
    const pLStr = `The site is located near ${pLCnt} high voltage power ${pluraliseWord(
      pLCnt
    )}: ${pLDetails}.`;

    return pLStr;
  }
};

export { processNoiseInfo, processPowerLinesInfo };
