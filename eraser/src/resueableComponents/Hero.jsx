import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-white">
      <div
        className="flex items-baseline 
        justify-center pt-36"
      >
        <h2
          className="text-black border 
            px-3 p-2 rounded-full
        text-center border-black"
        >
          See What's New | <span className="text-sky-600">AI Diagram</span>
        </h2>
      </div>
      <div className="mx-auto h-screen max-w-screen-xl px-4 py-12 lg:flex pt-10 ">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl text-indigo-600 font-extrabold sm:text-5xl">
            Documents & diagrams
            <strong className="font-extrabold text-slate-600 sm:block mt-3">
              for engineering teams.{" "}
            </strong>
          </h1>

          <p className="mt-5 sm:text-xl/relaxed text-slate-600">
            All-in-one markdown editor, collaborative canvas, and
            diagram-as-code builder
          </p>

          <div
            className="mt-12 flex flex-wrap justify-center gap-4"
            onClick={() => navigate("/dashboard")}
          >
            <a
              className="block w-full rounded bg-indigo-600 text-white px-12 py-3 text-sm font-medium  shadow hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:w-auto"
            >
              Start Drawing
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
