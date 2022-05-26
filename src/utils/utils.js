// export const uniqueDataSort = (inputData, key, cb) => {
//   const dataWithCopies = inputData.map((d) => d[key]);
//   const data = [...new Set(dataWithCopies)].sort(cb);
//   return data;
// };

// export const dataSort = (inputData, key, cb) => {
//   return inputData.map((d) => d[key]).sort(cb);
// };

// export const convertDate = (date) => {
//   const components = date.split("/");
//   // year, month, date
//   return new Date(components[2], components[0] - 1, components[1]);
// };

const getValues = (data, key) => {
  const newData = data.map((item) => item[key]);
  return [...new Set(newData)];
};

export const squashData = (data, key) => {
  const values = getValues(data, key);
  const groupedData = values.map((value) =>
    data.filter((item) => item[key] === value)
  );
  return groupedData
    .map((group) => {
      const totalQuantity = group.reduce(
        (acc, cur) => acc + Number(cur["Quantity"]),
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

export const geoKeys = ["Sales", "Profit", "City", "Region", "State"];

export const productSalesKeys = ["Product Name", "Quantity", "Discount"];

export const categoryKeys = ["Category", "Sub-Category", "Quantity"];

export const timelineKeys = ["Order Date", "Quantity", "Discount", "Sales"];

// const keys = [
//   "Customer ID",
//   "Customer Name",
//   "Order Date",
//   "Discount",
//   "Quantity",
//   "Ship Mode",
//   "Product Name",
//   "Profit",
//   "Category",
//   "Sub-Category",
//   "Sales",
//   "Country",
//   "City",
//   "Region",
//   "State",
// ];

// const sort = [(a, b) => a - b, (a, b) => b - a];
