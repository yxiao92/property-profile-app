const processPlanDetailsInfo = (obj) => {
  // format plan details
  const lotNumber = obj.lotNumber ?? "-";
  const sectionNumber = obj.sectionNumber ?? "-";
  const planLabel = obj.planLabel ?? "-";
  const planDetails = lotNumber + "/" + sectionNumber + "/" + planLabel;

  return planDetails;
};

const processZoningInfo = (arr) => {
  // zoning info can be null
  if (arr != null) {
    // format zoning code & LGA name
    // get unique LEPs
    const zoningCodeSet = new Set();
    const lgaNameSet = new Set();
    const epiNameSet = new Set();
    arr.forEach((el) => {
      let lgaNameStr = el.lgaName
        .toLowerCase()
        .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());
      lgaNameSet.add(lgaNameStr);

      let zoningStr = el.zoningCode + " (" + el.zoningClass + ")";
      zoningCodeSet.add(zoningStr);

      epiNameSet.add(el.epiName);
    });
    // sort zoning codes & LEPs
    const zoningCode = [...zoningCodeSet].sort();
    const lgaName = [...lgaNameSet].sort();
    const epiName = [...epiNameSet].sort();

    return {
      zoningCode: zoningCode,
      lgaName: lgaName,
      epiName: epiName,
    };
  }
};

const processMinLotSizeInfo = (arr) => {
  const unitOrd = {
    "m²": 1,
    ha: 2,
  };
  if (arr != null) {
    const arrSorted = [...arr]
      .map((el) => ({
        ...el,
        unitOrd: unitOrd[el.unit],
      }))
      .sort((a, b) => {
        if (a.unitOrd === b.unitOrd) {
          // lot size only matters when unit order is the same
          return a.lotSize - b.lotSize;
        }
        return a.unitOrd - b.unitOrd;
      })
      .map((el) => el.lotSize + el.unit);

    return [...new Set(arrSorted)];
  }
};

export { processPlanDetailsInfo, processZoningInfo, processMinLotSizeInfo };
