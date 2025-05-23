type Props = {
  width?: number | string;
  height?: number | string;
  className?: string;
  fill?: string;
};

const FilledHeartIcon = ({
  width = 24,
  height = 21.68,
  className,
  fill = "#EC1D24",
}: Props) => (
  <svg
    className={className}
    width={width}
    height={height}
    viewBox="0 0 24 22"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 3.63869L6 -0.00292969L0 3.63869V11.4422L12 21.6734L24 11.4422V3.63869L18 -0.00292969L12 3.63869Z"
      fill={fill}
    />
  </svg>
);

export default FilledHeartIcon;
