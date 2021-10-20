import { copySorted } from "./utils.js";

// heritage listing
const processHeritageListing = (arr) => {
  const heritageSigOrd = {
    World: 1,
    National: 2,
    State: 3,
    "State Nominated": 4,
    "State/Local": 5,
    Local: 6,
  };

  if (arr != null) {
    const heritageArr = [...arr]
      .map((el) => ({
        ...el,
        heritageName: el.heritageName ?? "No Name",
        heritageSigOrd: heritageSigOrd[el.significance],
      }))
      .sort((a, b) => {
        if (a.heritageSigOrd === b.heritageSigOrd) {
          // heritage class only matters when catch type order is the same
          return a.heritageClass > b.heritageClass ? 1 : -1;
        }
        return a.heritageSigOrd > b.heritageSigOrd ? 1 : -1;
      })
      .map((el) => `${el.significance} - ${el.heritageName}`);

    return heritageArr;
  }
};

// acid sulfate soils
const processASSInfo = (arr) => {
  if (arr != null) {
    const assInfoArr = copySorted(arr, "soilClass").map(
      (el) => `${el.soilClass} - ${el.classDesc}`
    );

    const assInfoSet = [...new Set(assInfoArr)].sort();

    return assInfoSet;
  }
};

const processEasementInfo = (arr) => {
  if (arr != null) {
    const easementDesc = [...arr]
      .map((el) => ({
        ...el,
        type: el.type
          .toLowerCase()
          .replace(/^[p|s]_(\w+)/g, "$1")
          .replace("_", " "),
      }))
      .map((el) =>
        (el.desc ?? el.type).replace(/^\w{1}/g, (match) => match.toUpperCase())
      );

    const easementDescSet = [...new Set(easementDesc)].sort();

    return easementDescSet;
  }
};

export { processASSInfo, processHeritageListing, processEasementInfo };
