import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";
import { FaHackerrank } from "react-icons/fa";
import { SiHackerearth } from "react-icons/si";
const SocialMedia = () => {
  return (
    <div className="app__social">
      <div>
        <BsGithub
          onClick={() =>
            window.open("https://github.com/charanvinay", "_blank")
          }
        />
      </div>
      <div>
        <BsLinkedin
          onClick={() =>
            window.open(
              "https://www.linkedin.com/in/charan-vinay-narni-8681931b6/",
              "_blank"
            )
          }
        />
      </div>
      <div>
        <FaHackerrank
          onClick={() =>
            window.open("https://www.hackerrank.com/s160097", "_blank")
          }
        />
      </div>
      <div>
        <SiHackerearth
          onClick={() =>
            window.open("https://www.hackerearth.com/@s160097", "_blank")
          }
        />
      </div>
    </div>
  );
};

export default SocialMedia;
