import Webcam from "react-webcam";
function Camera() {
  return (
    <div>
      <Webcam audio={false} height={300} width={700}>
        {() => <button onClick={() => {}}>Capture</button>}
      </Webcam>
    </div>
  );
}

export default Camera;
