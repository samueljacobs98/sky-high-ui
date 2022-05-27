import "./Announcement.scss";
import closeBtn from "../../assets/svgs/close-button.svg";
import { useState } from "react";

const Announcement = () => {
  const [isOpen, setIsOpen] = useState(true);

  const closeOverlay = () => {
    setIsOpen(false);
  };

  const divClassName = isOpen
    ? "announcement"
    : "announcement announcement--close";

  return (
    <div className={divClassName}>
      Hover over the charts to find out more!
      <img
        className="announcement__close"
        src={closeBtn}
        alt="close overlay"
        onClick={closeOverlay}
      />
    </div>
  );
};

export default Announcement;
