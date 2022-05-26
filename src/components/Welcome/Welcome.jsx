import "./Welcome.scss";

const Welcome = ({ userData }) => {
  return (
    <div className="panel panel--welcome">
      {userData.image && <img src={userData.image} alt="" />}
      <h1>{`Welcome ${userData.name.first}!`}</h1>
    </div>
  );
};

export default Welcome;
