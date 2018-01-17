import React from 'react';
import rndId from 'rnd-id';

import Rotate from './rotate';
import calcFill from './fill';

const ids = [rndId(), rndId()];

const TritonBeta = ({
  fill = null,
  light = false,
  disabled = false,
  colors = {},
  ...rest
}) => (
  <svg
    width="105"
    height="30"
    viewBox="0 0 105 30"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...rest}
  >
    <g transform="translate(26223 1404)">
      <g>
        <g>
          <use
            xlinkHref={`#${ids[0]}`}
            transform="translate(-26177 -1383)"
            fill={calcFill({ fill, disabled, light, colors })}
          />
        </g>
        <g>
          <use
            xlinkHref={`#${ids[1]}`}
            transform="translate(-26223 -1404)"
            fill={calcFill({ fill, disabled, light, colors })}
          />
        </g>
      </g>
    </g>
    <defs>
      <path
        id={ids[0]}
        d="M 33.7583 0.147461L 35.9766 0.147461C 37.0186 0.147461 37.7723 0.303223 38.2378 0.614746C 38.7033 0.92627 38.936 1.41862 38.936 2.0918C 38.936 2.55729 38.8053 2.94222 38.5439 3.24658C 38.2861 3.54736 37.9084 3.74251 37.4106 3.83203L 37.4106 3.88574C 38.603 4.08984 39.1992 4.71647 39.1992 5.76562C 39.1992 6.46745 38.9611 7.0153 38.4849 7.40918C 38.0122 7.80306 37.3498 8 36.4976 8L 33.7583 8L 33.7583 0.147461ZM 34.6714 3.50977L 36.1753 3.50977C 36.8198 3.50977 37.2835 3.40951 37.5664 3.20898C 37.8493 3.00488 37.9907 2.66292 37.9907 2.18311C 37.9907 1.74268 37.8332 1.42578 37.5181 1.23242C 37.203 1.03548 36.7017 0.937012 36.0142 0.937012L 34.6714 0.937012L 34.6714 3.50977ZM 34.6714 4.2832L 34.6714 7.22119L 36.3096 7.22119C 36.9434 7.22119 37.4196 7.09945 37.7383 6.85596C 38.0605 6.60889 38.2217 6.22396 38.2217 5.70117C 38.2217 5.21419 38.057 4.85612 37.7275 4.62695C 37.4017 4.39779 36.904 4.2832 36.2344 4.2832L 34.6714 4.2832ZM 43.2437 8.10742C 42.3735 8.10742 41.686 7.84245 41.1812 7.3125C 40.6799 6.78255 40.4292 6.04671 40.4292 5.10498C 40.4292 4.15609 40.6619 3.40234 41.1274 2.84375C 41.5965 2.28516 42.2249 2.00586 43.0127 2.00586C 43.7503 2.00586 44.334 2.24935 44.7637 2.73633C 45.1934 3.21973 45.4082 3.85889 45.4082 4.65381L 45.4082 5.21777L 41.353 5.21777C 41.3709 5.90885 41.5446 6.43343 41.874 6.7915C 42.207 7.14958 42.6743 7.32861 43.2759 7.32861C 43.9097 7.32861 44.5363 7.19613 45.1558 6.93115L 45.1558 7.72607C 44.8407 7.86214 44.5417 7.95882 44.2588 8.01611C 43.9795 8.07699 43.6411 8.10742 43.2437 8.10742ZM 43.002 2.75244C 42.5293 2.75244 42.1515 2.90641 41.8687 3.21436C 41.5894 3.5223 41.4246 3.94841 41.3745 4.49268L 44.4521 4.49268C 44.4521 3.9305 44.3268 3.50081 44.0762 3.20361C 43.8255 2.90283 43.4674 2.75244 43.002 2.75244ZM 48.835 7.37158C 48.9925 7.37158 49.1447 7.36084 49.2915 7.33936C 49.4383 7.31429 49.5547 7.28923 49.6406 7.26416L 49.6406 7.94629C 49.5439 7.99284 49.4007 8.03044 49.2109 8.05908C 49.0247 8.09131 48.8564 8.10742 48.7061 8.10742C 47.5674 8.10742 46.998 7.50765 46.998 6.30811L 46.998 2.80615L 46.1548 2.80615L 46.1548 2.37646L 46.998 2.00586L 47.374 0.749023L 47.8896 0.749023L 47.8896 2.11328L 49.5977 2.11328L 49.5977 2.80615L 47.8896 2.80615L 47.8896 6.27051C 47.8896 6.625 47.9738 6.89714 48.1421 7.08691C 48.3104 7.27669 48.5413 7.37158 48.835 7.37158ZM 54.4424 8L 54.2651 7.16211L 54.2222 7.16211C 53.9285 7.53092 53.6349 7.78158 53.3413 7.91406C 53.0513 8.04297 52.6878 8.10742 52.251 8.10742C 51.6673 8.10742 51.209 7.95703 50.876 7.65625C 50.5465 7.35547 50.3818 6.92757 50.3818 6.37256C 50.3818 5.18376 51.3325 4.56071 53.2339 4.50342L 54.2329 4.47119L 54.2329 4.10596C 54.2329 3.64404 54.1326 3.30387 53.9321 3.08545C 53.7352 2.86344 53.4183 2.75244 52.9814 2.75244C 52.4909 2.75244 51.9359 2.90283 51.3164 3.20361L 51.0425 2.52148C 51.3325 2.36393 51.6494 2.2404 51.9932 2.15088C 52.3405 2.06136 52.6878 2.0166 53.0352 2.0166C 53.737 2.0166 54.2562 2.17236 54.5928 2.48389C 54.9329 2.79541 55.103 3.29492 55.103 3.98242L 55.103 8L 54.4424 8ZM 52.4282 7.37158C 52.9832 7.37158 53.4183 7.2194 53.7334 6.91504C 54.0521 6.61068 54.2114 6.18457 54.2114 5.63672L 54.2114 5.10498L 53.3198 5.14258C 52.6108 5.16764 52.0988 5.27865 51.7837 5.47559C 51.4722 5.66895 51.3164 5.97152 51.3164 6.3833C 51.3164 6.70557 51.4131 6.95085 51.6064 7.11914C 51.8034 7.28743 52.0773 7.37158 52.4282 7.37158Z"
      />
      <path
        id={ids[1]}
        fillRule="evenodd"
        d="M 81 9.49793C 81 4.25232 76.7461 5.90949e-07 71.5 5.90949e-07C 66.252 -0.00183046 62 4.25171 62 9.49793C 62 14.7435 66.2539 18.9958 71.5 18.9958C 76.7461 18.9958 81 14.7435 81 9.49793ZM 16.2266 0.99585L 0.773438 0.99585C 0.345703 0.99585 0 1.34168 0 1.76819L 0 4.86169C 0 5.09143 0.0996094 5.29773 0.259766 5.43921C 0.308594 5.48181 0.361328 5.51856 0.417969 5.54822C 0.523438 5.60303 0.644531 5.63403 0.773438 5.63403L 5.38281 5.63403C 5.80469 5.63391 6.14844 5.96997 6.15625 6.39026L 6.15625 17.2235C 6.15625 17.4979 6.29883 17.739 6.51562 17.876C 6.56445 17.9071 6.61719 17.9327 6.67383 17.9523L 6.78906 17.983C 6.83398 17.9915 6.88086 17.9958 6.92969 17.9958L 10.0215 17.9958C 10.4492 17.9958 10.7949 17.65 10.7949 17.2235L 10.7949 6.39026C 10.7949 5.96362 11.1406 5.61792 11.5684 5.61792L 16.248 5.61792C 16.4941 5.61145 16.7109 5.48962 16.8477 5.30469C 16.9414 5.17932 16.998 5.0249 17 4.85767L 17 1.76819C 17 1.34168 16.6543 0.99585 16.2266 0.99585ZM 33 1.76819L 33 4.86169C 33 5.28821 32.6504 5.63403 32.2168 5.63403L 25.4941 5.63403C 25.0605 5.63403 24.7109 5.97986 24.7109 6.40637L 24.7109 17.2235C 24.7109 17.65 24.3594 17.9958 23.9277 17.9958L 20.7871 17.9958C 20.5781 17.9969 20.3789 17.916 20.2305 17.771C 20.084 17.6261 20 17.4291 20 17.2235L 20 5.63001C 20.002 3.06995 22.1074 0.99585 24.7031 0.99585L 32.2168 0.99585C 32.6504 0.99585 33 1.34168 33 1.76819ZM 40.1719 0.99585L 36.834 0.99585C 36.6113 0.99585 36.4102 1.07593 36.2598 1.20654C 36.2188 1.24182 36.1816 1.28076 36.1504 1.32275L 36.0938 1.40906C 36.0352 1.51636 36 1.63855 36 1.76819L 36 17.2235C 36 17.65 36.373 17.9958 36.834 17.9958L 40.166 17.9958C 40.627 17.9958 41 17.65 41 17.2235L 41 1.76819C 41 1.34168 40.627 0.99585 40.1719 0.99585ZM 43.7715 0.99585L 59.2207 0.99585C 59.3535 0.99585 59.4785 1.02844 59.5879 1.08594C 59.7109 1.15112 59.8145 1.24829 59.8867 1.36633C 59.959 1.4834 60 1.62097 60 1.76819L 60 4.84546C 60 5.2721 59.6543 5.6178 59.2285 5.6178L 54.5664 5.6178C 54.1406 5.6178 53.7949 5.96362 53.7949 6.39026L 53.7949 17.2234C 53.7949 17.4678 53.6816 17.6857 53.5039 17.8271C 53.373 17.9326 53.2051 17.9957 53.0215 17.9957L 49.9297 17.9957C 49.7227 17.999 49.5234 17.9191 49.375 17.7739C 49.3105 17.7108 49.2598 17.6377 49.2207 17.5582C 49.1719 17.4547 49.1445 17.3405 49.1445 17.2234L 49.1445 6.39026C 49.1367 5.96997 48.793 5.63391 48.373 5.63403L 43.7715 5.63403C 43.3457 5.63403 43 5.28821 43 4.86169L 43 1.76819C 43 1.34168 43.3457 0.99585 43.7715 0.99585ZM 84 1.76819C 84 1.34168 84.3438 0.99585 84.7695 0.99585L 96.3809 0.99585C 98.9297 0.99585 100.998 3.06995 101 5.63001L 101 17.2235C 101 17.65 100.656 17.9958 100.23 17.9958L 97.1504 17.9958C 97.0039 17.9958 96.8691 17.9552 96.752 17.8846C 96.7148 17.8619 96.6797 17.8362 96.6465 17.8076C 96.584 17.7534 96.5312 17.6895 96.4883 17.618C 96.4199 17.5026 96.3809 17.3677 96.3809 17.2235L 96.3809 6.39026C 96.3809 5.96521 96.0391 5.62012 95.6152 5.61792L 89.3887 5.61792C 88.9648 5.61792 88.6191 5.96362 88.6191 6.39026L 88.6191 17.2235C 88.6191 17.65 88.2754 17.9958 87.8496 17.9958L 84.7695 17.9958C 84.5996 17.9958 84.4434 17.9408 84.3164 17.8474C 84.125 17.7069 84 17.4799 84 17.2235L 84 1.76819ZM 71.5 4.99585C 69.0156 4.99585 67 7.01062 67 9.49585C 67 11.9811 69.0156 13.9959 71.5 13.9959C 73.9844 13.9959 76 11.9811 76 9.49585C 75.998 7.01148 73.9844 4.99817 71.5 4.99585ZM 102.613 1.14209L 103 1.14209L 103 1.98145L 103.314 1.98145L 103.314 1.40503L 103.314 1.22925L 103.865 1.99585L 104.119 1.98145L 104.67 1.21777L 104.67 1.40503L 104.67 1.98145L 105 1.98145L 105 0.99585L 104.555 0.99585L 104.002 1.76245L 103.49 0.99585L 103 0.99585L 102 0.99585L 102 1.14209L 102.387 1.14209L 102.387 1.99585L 102.617 1.99585L 102.613 1.14209Z"
      />
    </defs>
  </svg>
);

const Triton = ({
  fill = null,
  light = false,
  disabled = false,
  colors = {},
  ...rest
}) => (
  <svg
    width="105"
    height="19"
    viewBox="0 0 105 19"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      fill={calcFill({ fill, disabled, light, colors })}
      fillRule="evenodd"
      d="M81 9.502C81 4.256 76.747.004 71.5.004V0C66.253.002 62 4.256 62 9.502S66.253 19 71.5 19 81 14.748 81 9.502zM16.227 1H.773A.773.773 0 0 0 0 1.772v3.094c0 .426.346.772.773.772h4.61c.421 0 .765.336.773.756v10.834c0 .426.346.772.773.772h3.093a.773.773 0 0 0 .773-.772V6.394c0-.426.346-.772.773-.772h4.68a.773.773 0 0 0 .752-.76v-3.09A.773.773 0 0 0 16.227 1zM33 1.772v3.094c0 .426-.35.772-.783.772h-6.723a.778.778 0 0 0-.784.773v10.817c0 .426-.35.772-.783.772h-3.14a.788.788 0 0 1-.726-.472.763.763 0 0 1-.061-.3V5.634C20.002 3.074 22.107 1 24.702 1h7.515c.432 0 .783.346.783.772zM40.167 1h-3.334c-.46 0-.833.346-.833.772v15.456c0 .426.373.772.833.772h3.334c.46 0 .833-.346.833-.772V1.772c0-.426-.373-.772-.833-.772zm3.605 0h15.456c.426 0 .772.346.772.772V4.85a.772.772 0 0 1-.772.772h-4.662a.772.772 0 0 0-.772.772v10.833a.772.772 0 0 1-.772.773H49.93a.775.775 0 0 1-.784-.773V6.394a.772.772 0 0 0-.772-.756h-4.6A.772.772 0 0 1 43 4.866V1.772c0-.426.346-.772.772-.772zM84 1.772A.77.77 0 0 1 84.77 1h11.61c2.55 0 4.618 2.074 4.62 4.634v11.594a.77.77 0 0 1-.769.772H97.15a.77.77 0 0 1-.77-.772V6.394a.77.77 0 0 0-.765-.772H89.39a.77.77 0 0 0-.77.772v10.834a.77.77 0 0 1-.769.772h-3.08a.77.77 0 0 1-.77-.772V1.772zM71.5 5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm31.112-3.854H103v.84h.314v-.753l.551.767.253-.014.551-.764v.764H105V1h-.446l-.551.767L103.49 1H102v.146h.388V2h.228l-.004-.854z"
    />
  </svg>
);

export default ({ beta = false, direction = 'down', style = {}, ...rest }) => (
  <Rotate direction={direction}>
    {({ style: rotateStyle }) =>
      beta ? (
        <TritonBeta style={{ ...style, ...rotateStyle }} {...rest} />
      ) : (
        <Triton style={{ ...style, ...rotateStyle }} {...rest} />
      )
    }
  </Rotate>
);
