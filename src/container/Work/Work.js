import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { FaLink } from "react-icons/fa";
import { AppWrap, MotionWrap } from "../../Wrapper";
import { Utils } from "../../utils";
import "./Work.scss";
const Work = () => {
  const [activeFilter, setActiveFilter] = useState("all")
  const [animateCard, setAnimateCard] = useState({ y: 0, opacity: 1 });
  const [works, setWorks] = useState([]);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    fetchOptions();
    fetchData({});
  }, []);

  const fetchData = async ({ activeFilter = "" }) => {
    try {
      const res = await Utils.makeApiCall({ endPoint: `/works?tag=${activeFilter}` });
      if (res?.status) {
        setWorks([...res?.data]);
      }
    } catch (error) {}
  };
  const fetchOptions = async () => {
    try {
      const ops = await Utils.makeApiCall({ endPoint: "/works/tags" });
      if (ops?.status) {
        setOptions([{ label: "All", value: "all" }, ...ops?.data]);
      }
    } catch (error) {}
  };

  const handleWorkFilter = (item) => {
    setActiveFilter(item);
    setAnimateCard([{ y: 100, opacity: 0 }]);
    setTimeout(() => {
      setAnimateCard([{ y: 0, opacity: 1 }]);
      if (item === "all") {
        fetchData({ activeFilter: "" });
      } else {
        fetchData({ activeFilter: item });
      }
    }, 500);
  };
  return (
    <>
      <h2 className="head-text">
        My Creative <span>Portfolio</span> section
      </h2>
      <div className="app__work-filter">
        {options.map((item, index) => (
          <div
            key={index}
            onClick={() => handleWorkFilter(item.value)}
            className={`app__work-filter-item app__flex p-text ${
              activeFilter === item.value ? "item-active" : ""
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
      <motion.div
        animate={animateCard}
        transition={{ duration: 0.5, delayChildren: 0.5 }}
        className="app__work-portfolio"
      >
        {works.map((work, index) => (
          <div className="app__work-item app__flex" key={index}>
            <div className="app__work-img app__flex">
              <img src={Utils.urlFor(work.imgUrl)} alt={work.name} />
              <motion.div
                whileHover={{ opacity: [0, 1] }}
                transition={{
                  duration: 0.25,
                  ease: "easeInOut",
                  staggerChildren: 0.5,
                }}
                className="app__work-hover app__flex"
              >
                <a href={work.projectLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <AiFillEye />
                  </motion.div>
                </a>
                {work?.codeLink && <a href={work.codeLink} target="_blank" rel="noreferrer">
                  <motion.div
                    whileInView={{ scale: [0, 1] }}
                    whileHover={{ scale: [1, 0.9] }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="app__flex"
                  >
                    <FaLink />
                  </motion.div>
                </a>}
              </motion.div>
            </div>
            {/* <div className="app__work-content app__flex">
              <h4 className="bold-text">{work.title}</h4>
              <p className="p-text text-center" style={{ marginTop: 10 }}>
                {work.description}
              </p> 
               <div className="app__work-tag app__flex">
                <p className="p-text">{work.tags[0]}</p>
              </div> 
            </div> */}
          </div>
        ))}
      </motion.div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Work, "app__works"),
  "work",
  "app__primarybg"
);
