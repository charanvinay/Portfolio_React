import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { AppWrap, MotionWrap } from "../../Wrapper";
import { Utils } from "../../utils";
import "./About.scss";

const About = () => {
  const [abouts, setAbouts] = useState([]);

  useEffect(() => {
    // const query = '*[_type == "abouts"]';
    // client.fetch(query).then((data) => setAbouts(data));
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Utils.makeApiCall({ endPoint: "/about" });
      if (res?.status){
        setAbouts([...res?.data]);
      }
    } catch (error) {
      
    }
  }

  return (
    <>
      <h2 className="head-text">
        I Know That <span>Good Design</span>
        <br />
        means <span>Good Business</span>
      </h2>
      <div className="app__profiles">
        {abouts.map((about, index) => (
          <motion.div
            whileInView={{ opacity: 1 }}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5, type: "tween" }}
            className="app__profile-item"
            key={about?.role + index}
          >
            <img src={Utils.urlFor(about.imgUrl)} alt={about.role} />
            <h2 className="bold-text" style={{ marginTop: 20 }}>
              {about?.role}
            </h2>
            <p className="p-text text-center" style={{ marginTop: 10 }}>
              {about?.description}
            </p>
          </motion.div>
        ))}
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(About, "app__about"),
  "about",
  "app__whitebg"
);
