const processSchoolInfo = (arr) => {
  const catchOrd = {
    Infants: 1,
    Primary: 2,
    High: 3,
  };

  if (arr != null) {
    const arrSorted = [...arr]
      .map((el) => ({ ...el, catchOrd: catchOrd[el.catch] }))
      .sort((a, b) => {
        if (a.catchOrd === b.catchOrd) {
          // school name only matters when catch type order is the same
          return a.schoolName > b.schoolName ? 1 : -1;
        }
        return a.catchOrd > b.catchOrd ? 1 : -1;
      });

    return arrSorted;
  }
};

export { processSchoolInfo };
