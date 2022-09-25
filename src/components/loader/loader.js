function Loader(props) {
  const { type = "dot", fill = "#fff" } = props;

  return (
    <div
      className="loader text-center"
      style={
        type === "dot"
          ? {
              position: "absolute",
              zIndex: 1,
              width: "calc(100% - 24px)",
              maxWidth: "60px",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }
          : {}
      }
    >
      {type === "dot" ? (
        <svg
          // width="120"
          // height="30"
          viewBox="0 0 120 30"
          xmlns="http://www.w3.org/2000/svg"
          fill={fill}
        >
          <circle cx="15" cy="15" r="15">
            <animate
              attributeName="r"
              from="15"
              to="15"
              begin="0s"
              dur="0.8s"
              values="15;9;15"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="1"
              to="1"
              begin="0s"
              dur="0.8s"
              values="1;.5;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="60" cy="15" r="9" fillOpacity="0.3">
            <animate
              attributeName="r"
              from="9"
              to="9"
              begin="0s"
              dur="0.8s"
              values="9;15;9"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="0.5"
              to="0.5"
              begin="0s"
              dur="0.8s"
              values=".5;1;.5"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="105" cy="15" r="15">
            <animate
              attributeName="r"
              from="15"
              to="15"
              begin="0s"
              dur="0.8s"
              values="15;9;15"
              calcMode="linear"
              repeatCount="indefinite"
            />
            <animate
              attributeName="fill-opacity"
              from="1"
              to="1"
              begin="0s"
              dur="0.8s"
              values="1;.5;1"
              calcMode="linear"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      ) : (
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(2 1)" stroke="#FFF" strokeWidth="1.5">
              <circle cx="42.601" cy="11.462" r="5" fillOpacity="1" fill={fill}>
                <animate
                  attributeName="fill-opacity"
                  begin="0s"
                  dur="1.3s"
                  values="1;0;0;0;0;0;0;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="49.063" cy="27.063" r="5" fillOpacity="0" fill={fill}>
                <animate
                  attributeName="fill-opacity"
                  begin="0s"
                  dur="1.3s"
                  values="0;1;0;0;0;0;0;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="42.601" cy="42.663" r="5" fillOpacity="0" fill={fill}>
                <animate
                  attributeName="fill-opacity"
                  begin="0s"
                  dur="1.3s"
                  values="0;0;1;0;0;0;0;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="27" cy="49.125" r="5" fillOpacity="0" fill={fill}>
                <animate
                  attributeName="fill-opacity"
                  begin="0s"
                  dur="1.3s"
                  values="0;0;0;1;0;0;0;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="11.399" cy="42.663" r="5" fillOpacity="0" fill={fill}>
                <animate
                  attributeName="fill-opacity"
                  begin="0s"
                  dur="1.3s"
                  values="0;0;0;0;1;0;0;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="4.938" cy="27.063" r="5" fillOpacity="0" fill={fill}>
                <animate
                  attributeName="fill-opacity"
                  begin="0s"
                  dur="1.3s"
                  values="0;0;0;0;0;1;0;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="11.399" cy="11.462" r="5" fillOpacity="0" fill={fill}>
                <animate
                  attributeName="fill-opacity"
                  begin="0s"
                  dur="1.3s"
                  values="0;0;0;0;0;0;1;0"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
              <circle cx="27" cy="5" r="5" fillOpacity="0" fill={fill}>
                <animate
                  attributeName="fill-opacity"
                  begin="0s"
                  dur="1.3s"
                  values="0;0;0;0;0;0;0;1"
                  calcMode="linear"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          </g>
        </svg>
      )}
      {/* <img alt="loader" src="/loader.gif" width={width} height={height} /> */}
    </div>
  );
}

export default Loader;
