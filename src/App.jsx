import axios from "axios";
import { useState, useRef, useEffect, useCallback } from "react";
import "./styles/main.scss";
import GeoSales from "./components/GeoSales/GeoSales";
import LoaderModal from "./components/LoaderModal/LoaderModal";
import { mapData } from "./utils/utils";
import { keys } from "./assets/data/data";
import ProductSales from "./components/ProductSales/ProductSales";
import DiscountSales from "./components/DiscountSales/DiscountSales";
import CategorySales from "./components/CategorySales/CategorySales";
import TimelineSales from "./components/TimelineSales/TimelineSales";
import Welcome from "./components/Welcome/Welcome";
import Announcement from "./components/Announcement/Announcement";

const App = () => {
  const dataStore = useRef();
  const [showLoader, setShowLoader] = useState(true);
  const [geoData, setGeoData] = useState([]);
  const [productData, setProductData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [userData, setUserData] = useState({ name: "User" });

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
      setGeoData(mapData(dataStore.current, keys.geoKeys));
      setProductData(mapData(dataStore.current, keys.productSalesKeys));
      setCategoryData(mapData(dataStore.current, keys.categoryKeys));
      setTimelineData(mapData(dataStore.current, keys.timelineKeys));
    }
  }, [showLoader]);

  useEffect(() => {
    const url =
      "https://g54qw205uk.execute-api.eu-west-1.amazonaws.com/DEV/stub";
    postRequest(url);
  }, []);

  const getRequest = useCallback(async (url) => {
    try {
      const response = await axios.get(url);
      const newUser = response.data.results[0];
      const userObject = {
        name: newUser.name,
        image: newUser.picture.large,
      };
      setUserData(userObject);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    getRequest("https://randomuser.me/api/");
  }, [getRequest]);

  return (
    <div className="App">
      {showLoader ? (
        <LoaderModal />
      ) : (
        <>
          <Welcome userData={userData} />
          <DiscountSales data={productData} />
          <ProductSales data={productData} />
          <CategorySales data={categoryData} />
          <TimelineSales data={timelineData} />
          <GeoSales data={geoData} />
          <Announcement />
        </>
      )}
    </div>
  );
};

export default App;
