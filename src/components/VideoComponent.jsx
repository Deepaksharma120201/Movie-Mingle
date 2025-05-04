import PropTypes from "prop-types";

const VideoComponent = ({ id }) => {
  return (
    <iframe
      src={`https://www.youtube.com/embed/${id}`}
      title="YouTube video player"
      allowFullScreen
    ></iframe>
  );
};

VideoComponent.propTypes = {
  id: PropTypes.string.isRequired,
};

export default VideoComponent;
