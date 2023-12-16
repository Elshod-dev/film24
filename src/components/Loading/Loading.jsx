import { SpinStretch } from "react-cssfx-loading";
function Loading({className}) {
  return (
    <div className={className}>
      <SpinStretch />
    </div>
  );
}

export default Loading;
