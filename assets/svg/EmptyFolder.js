import * as React from "react";
import Svg, { G, Path, Circle } from "react-native-svg";

function EmptyFolder(props) {
  return (
    <Svg
      width={128}
      height={128}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      {...props}
    >
      <G data-name="Layer 651">
        <Path
          fill="none"
          stroke="#54596e"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M57 22.55V18a2 2 0 00-2-2H32a2 2 0 01-2-2h0a2 2 0 00-2-2H8a2 2 0 00-2 2v38a2 2 0 002 2"
        />
        <Path
          fill="none"
          stroke="#54596e"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M61 23H14a2 2 0 00-2 2L6 52a2 2 0 002 2h47a2 2 0 002-2l6-27a2 2 0 00-2-2z"
        />
        <Path
          fill="none"
          stroke="#54596e"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M31.86 43A7 7 0 0137 41.07 7 7 0 0142.1 43"
        />
        <Circle cx={45} cy={34} r={2} fill="#54596e" />
        <Circle cx={30} cy={34} r={2} fill="#54596e" />
        <Path
          fill="none"
          stroke="#54596e"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M2 54h16"
        />
      </G>
    </Svg>
  );
}

export default EmptyFolder;
