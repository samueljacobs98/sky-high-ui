export const getYears = (data) => {
  const yearsWithDuplicates = [];
  data.forEach((item) =>
    yearsWithDuplicates.push(item["Order Date"].split("/").pop())
  );
  return [...new Set(yearsWithDuplicates)].sort((a, b) => b - a);
};

export const getValues = (data, key) => {
  const newData = data.map((item) => item[key]);
  return [...new Set(newData)];
};

export const squashData = (data, key, filter) => {
  const values = getValues(data, key);
  const groupedData = values.map((value) =>
    data.filter((item) => item[key] === value)
  );
  return groupedData
    .map((group) => {
      const totalQuantity = group.reduce(
        (acc, cur) => acc + Number(cur[filter]),
        0
      );
      return { x: group[0][key], y: totalQuantity };
    })
    .sort((a, b) => a.x - b.x);
};

export const mapData = (inputData, inputKeys) => {
  return [...inputData].map((data) => {
    const obj = {};
    inputKeys.forEach((key) => (obj[`${key}`] = data[key]));
    return obj;
  });
};

export const getYearlyData = (data, years) => {
  const unfilteredData = squashData(data, "Order Date", "Quantity");
  const groupedData = years.map((year) => {
    const filteredData = unfilteredData.filter((item) => {
      const dateArr = item.x.split("/");
      return dateArr[dateArr.length - 1] === year;
    });
    const monthGroupedData = [];
    for (let i = 0; i < 12; i++) {
      monthGroupedData[i] = filteredData.filter((item) => {
        return Number(item.x.split("/")[0]) === i + 1;
      });
    }
    const newData = monthGroupedData
      .map((month) => month.reduce((acc, cur) => acc + cur.y, 0))
      .filter((val) => val !== 0);
    return { year, data: newData };
  });
  return groupedData;
};
