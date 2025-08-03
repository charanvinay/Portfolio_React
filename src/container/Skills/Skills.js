import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import CSS from "../../assets/css.png";
import FIGMA from "../../assets/figma.png";
import HTML from "../../assets/html.png";
import JS from "../../assets/javascript.png";
import MUI from "../../assets/mu5.png";
import NODE from "../../assets/node.png";
import REACT from "../../assets/react.png";
import REDUX from "../../assets/redux.png";
import SCSS from "../../assets/sass.png";
import TAILWIND from "../../assets/tailwind.png";
import TYPESCRIPT from "../../assets/typescript.png";
import WEBPACK from "../../assets/webpack.png";
import { Utils } from "../../utils";
import { AppWrap, MotionWrap } from "../../Wrapper";
import "./Skills.scss";
const SKILLS = [
  {
    name: "HTML",
    icon: HTML,
  },
  {
    name: "CSS",
    icon: CSS,
  },
  {
    name: "JavaScript",
    icon: JS,
  },
  {
    name: "ReactJs",
    icon: REACT,
  },
  {
    name: "Redux",
    icon: REDUX,
  },
  {
    name: "Tailwind CSS",
    icon: TAILWIND,
  },
  {
    name: "Typescript",
    icon: TYPESCRIPT,
  },
  {
    name: "Webpack",
    icon: WEBPACK,
  },
  {
    name: "SCSS",
    icon: SCSS,
  },
  {
    name: "Material UI",
    icon: MUI,
  },
  {
    name: "NodeJS",
    icon: NODE,
  },
  {
    name: "Figma",
    icon: FIGMA,
  },
  // {
  //   name: "GIT",
  //   icon: GIT,
  // },
];
const Skills = () => {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await Utils.makeApiCall({ endPoint: "/experiences" });
      if (res?.status) {
        setExperiences([...res?.data]);
      }
    } catch (error) {}
  };

  return (
    <>
      <h2 className="head-text">Skills & Experience</h2>
      <div className="app__skills-container app__flex">
        <motion.div className="app__skills-list">
          {SKILLS?.map((skill) => (
            <motion.div
              whileInView={{ opacity: [0, 1] }}
              transition={{ duration: 0.5 }}
              className="app__skills-item app__flex"
              key={skill.name}
            >
              <div className="app__flex" style={{ backgroundColor: "#edf2f8" }}>
                <img
                  src={skill.icon}
                  alt={skill.name}
                  style={{ objectFit: "contain" }}
                />
              </div>
              <p className="p-text">{skill.name}</p>
            </motion.div>
          ))}
        </motion.div>
        <motion.div className="app__skills-exp">
          {experiences.map((experience) => (
            <motion.div className="app__skills-exp-item" key={experience.year}>
              <div className="app__skills-exp-year">
                <p className="bold-text">{experience.year}</p>
                <p className="bold-text" style={{ fontSize: "10px" }}>
                  {experience.works?.[0]?.to === "current" ? "to now" : ""}
                </p>
              </div>
              <motion.div className="app__skills-exp-works">
                {experience.works.map((work) => (
                  <>
                    <motion.div
                      whileInView={{ opacity: [0, 1] }}
                      transition={{ duration: 0.5 }}
                      className="app__skills-exp-work"
                      data-tip
                      data-for={work.name}
                      key={work.name}
                    >
                      <h4 className="bold-text">{work.name}</h4>
                      <p className="p-text">
                        {work.company} |{" "}
                        <span className="badge">{work.type}</span>
                      </p>
                    </motion.div>
                    <ReactTooltip
                      id={work.name}
                      effect="solid"
                      arrowColor="#fff"
                      className="skills-tooltip"
                    >
                      {work.desc}
                    </ReactTooltip>
                  </>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </>
  );
};

export default AppWrap(
  MotionWrap(Skills, "app__skills"),
  "skills",
  "app__whitebg"
);
