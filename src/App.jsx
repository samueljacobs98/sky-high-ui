import axios from "axios";
import { useState, useRef, useEffect } from "react";
import "./styles/main.scss";
import GeoSales from "./components/GeoSales/GeoSales";
import LoaderModal from "./components/LoaderModal/LoaderModal";
import {
  mapData,
  geoKeys,
  productSalesKeys,
  categoryKeys,
  timelineKeys,
} from "./utils/utils";
import ProductSales from "./components/ProductSales/ProductSales";
import DiscountSales from "./components/DiscountSales/DiscountSales";
import CategorySales from "./components/CategorySales/CategorySales";
import TimelineSales from "./components/TimelineSales/TimelineSales";

const App = () => {
  const dataStore = useRef();
  const [showLoader, setShowLoader] = useState(true);
  const [geoData, setGeoData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);

  const postRequest = async (url) => {
    try {
      const response = await axios.post(url, {
        angular_test: "angular-developer",
      });
      dataStore.current = response.data;
      setShowLoader(false);
    } catch (error) {
      alert("Sorry... there was an error! Please try reloading the page");
    }
  };

  useEffect(() => {
    if (!showLoader) {
      setGeoData(mapData(dataStore.current, geoKeys));
      setProductData(mapData(dataStore.current, productSalesKeys));
      setCategoryData(mapData(dataStore.current, categoryKeys));
      setTimelineData(mapData(dataStore.current, timelineKeys));
    }
  }, [showLoader]);

  useEffect(() => {
    const url =
      "https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub";
    postRequest(url);
  }, []);

  return (
    <div className="App">
      {showLoader ? (
        <LoaderModal />
      ) : (
        <>
          <DiscountSales data={productData} />
          <GeoSales data={geoData} />
          <ProductSales data={productData} />
          <CategorySales data={categoryData} />
          <TimelineSales data={timelineData} />
        </>
      )}
    </div>
  );
};

export default App;
