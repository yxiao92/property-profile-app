const processLotInfo = (data) => {
  // format plan details
  const lotNumber = data.planDetails.lotNumber ?? "-";
  const sectionNumber = data.planDetails.sectionNumber ?? "-";
  const planLabel = data.planDetails.planLabel ?? "-";
  const planDetails = lotNumber + "/" + sectionNumber + "/" + planLabel;

  // format zoning code & LGA name
  // get unique LEPs
  const zoningCodeSet = new Set();
  const lgaNameSet = new Set();
  const epiNameSet = new Set();
  data.zoning.forEach((el) => {
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
    planDetails: planDetails,
    zoningCode: zoningCode,
    lgaName: lgaName,
    epiName: epiName,
  };
};

export { processLotInfo };