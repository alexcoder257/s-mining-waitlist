"use client";

import React from "react";
import { ReactSVG } from "react-svg";
import classNames from "classnames";

type IconProps = {
  name: string;
  width: string;
  height: string;
  color?: string;
  stroke?: string;
  className?: string;
  onClick?: () => void;
};

const Icon = React.memo(function Icon({
  name,
  width,
  height,
  color,
  stroke,
  className,
  onClick,
}: IconProps) {
  return (
    <ReactSVG
      className={classNames("flex items-center justify-center", className)}
      src={`/svgs/${name}.svg`}
      onClick={onClick}
      beforeInjection={(svg) => {
        svg.setAttribute("width", width);
        svg.setAttribute("height", height);

        if (stroke) {
          svg.querySelectorAll("[stroke]").forEach((element) => {
            element.setAttribute("stroke", stroke);
          });
        }

        if (color) {
          svg.querySelectorAll("[fill]").forEach((element) => {
            element.setAttribute("fill", color);
          });
        }
      }}
      wrapper="span"
    />
  );
});

export default Icon;
