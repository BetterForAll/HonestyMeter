import React from "react";

const TEXTS = {
  TITLE: 'DISCLAMER',

  noOneIsPerfect: `
  - It is essential to acknowledge that no one can be entirely objective,
  and some degree of bias is inevitable. Furthermore,
    a low objectivity score does not necessarily indicate malicious intent
on the part of the mass media or journalists. Many instances of biased
content are created unknowingly, with the best of intentions.`,

  someContentIsHardToEvaluate: `
  - It is important to note that certain types of content may be
  hard to evaluate for objectivity as they are based on individual or
  group beliefs and values, which every person has the right to hold.
  Please use the framework judiciously and with respect.`,

  experimentalVersion: ` - This is an EXPERIMENTAL DEMO version that is not intended to be used for any other purpose than
   to showcase the technology's potential. We are in the process of developing more sophisticated algorithms
    to significantly enhance the reliability and consistency of evaluations. Nevertheless, even in its current state,
     HonestyMeter frequently offers valuable insights that are challenging for humans to detect.`,
}

interface DisclamerProps {
  isShort?: boolean;
}

export default function Disclamer({ isShort = false }: DisclamerProps) {
  return (
    <div className="p-4 mx-auto max-w-[1000px] text-gray-500 text-sm">
      <p className="mb-4">
        {TEXTS.experimentalVersion}
      </p>
      {!isShort && (
        <>
          <p className="mb-4">
            {TEXTS.noOneIsPerfect}
          </p>
          <p className="mb-4">
            {TEXTS.someContentIsHardToEvaluate}
          </p>
        </>
      )}
    </div>
  )
}
