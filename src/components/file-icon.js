import PropTypes from 'prop-types';

const icons = {
  jpeg: 'https://static.easify.xyz/lp/assets/icons/icon-jpg.svg',
  jpg: 'https://static.easify.xyz/lp/assets/icons/icon-jpg.svg',
  mp4: 'https://static.easify.xyz/lp/assets/icons/icon-mp4.svg',
  pdf: 'https://static.easify.xyz/lp/assets/icons/icon-pdf.svg',
  png: 'https://static.easify.xyz/lp/assets/icons/icon-png.svg',
  svg: 'https://static.easify.xyz/lp/assets/icons/icon-svg.svg'
};

export const FileIcon = (props) => {
  const { extension } = props;

  let icon;

  if (!extension) {
    icon = 'https://static.easify.xyz/lp/assets/icons/icon-other.svg';
  } else {
    icon = icons[extension] || 'https://static.easify.xyz/lp/assets/icons/icon-other.svg';
  }

  return <img src={icon} />;
};

FileIcon.propTypes = {
  extension: PropTypes.string
};
