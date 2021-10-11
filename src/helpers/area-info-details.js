const copySorted = (arr, key) =>
  [...arr].sort((a, b) => (a[key] > b[key] && 1) || -1);

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

const processPowerLinesInfo = (obj) => {
  const pluraliseWord = (cnt) => (cnt > 1 ? "lines" : "line");

  let pLInfoObj = {};
  // voltage and distance of each HV power line
  if (obj == null) {
    pLInfoObj.pLCnt = 0;
    pLInfoObj.pLDesc = "The site doesn't have high voltage power lines nearby.";
  } else {
    let pLInfoArr = [];
    // sort by power line distance
    copySorted(obj, "distance").forEach((el) => {
      let pLStr = `${el.voltage} (${el.distance}m)`;
      pLInfoArr.push(pLStr);
    });

    const pLCnt = pLInfoArr.length;
    const pLDetails = pLInfoArr.join(", ");
    const pLDesc = `The site is located near ${pLCnt} high voltage power ${pluraliseWord(
      pLCnt
    )}: ${pLDetails}.`;
    pLInfoObj.pLCnt = pLCnt;
    pLInfoObj.pLDesc = pLDesc;
  }
  // console.log(pLInfoObj);
  return pLInfoObj;
};

// acid sulfate soils
const processASSInfo = (obj) => {
  let assInfoObj = {};

  if (obj == null) {
    assInfoObj.assCnt = 0;
    assInfoObj.assDesc =
      ["The site doesn't appear to be in an acid sulfate soil area."];
  } else {
    let assInfoArr = [];

    copySorted(obj, "soilClass").forEach((el) => {
      let assStr = `${el.soilClass} - ${el.classDesc}`;
      assInfoArr.push(assStr);
    });

    assInfoObj.assCnt = assInfoArr.length;
    assInfoObj.assDesc = assInfoArr;
  }
  console.log(assInfoObj);
  return assInfoObj;
};

export { processNoiseInfo, processPowerLinesInfo, processASSInfo };
