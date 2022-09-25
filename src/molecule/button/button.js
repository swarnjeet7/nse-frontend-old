import { Button } from "react-bootstrap";
import Loader from "components/loader";

function Btn(props) {
  const {
    children,
    type = "submit",
    variant = "primary",
    isWaiting = false,
    onClick,
    className,
    size,
    fill,
  } = props;
  return (
    <Button
      variant={variant}
      type={type}
      disabled={isWaiting}
      onClick={onClick}
      className={className}
      size={size}
      style={{
        position: "relative",
      }}
    >
      <span className={isWaiting ? "opacity-0" : ""}>{children}</span>
      {isWaiting ? <Loader fill={fill} /> : null}
    </Button>
  );
}

export default Btn;
