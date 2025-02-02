import { Box, Divider } from "@mantine/core";
import React from "react";
import { Link } from "react-router";

const News: React.FC<{
  icon: React.ReactNode | string;
  title: string;
  path: string;
  time: string;
  img: string;
}> = ({ title, path, time, icon, img }) => {
  return (
    <Link to={path} className="">
      <Box w="97%" className="w-full text-sm text-slate-500 font-light py-2">
        <div className="flex items-center gap-3">
          <img src={icon} alt="" />
          <div>{time}</div>
        </div>
        <div className="flex justify-between items-center w-full">
          <p className="text-sm font-bold">{title}</p>
          <img src={img} alt="" width={100} height={100} />
        </div>
        <Divider my="md" />
      </Box>
    </Link>
  );
};

export default News;
// border-b border-slate-400
