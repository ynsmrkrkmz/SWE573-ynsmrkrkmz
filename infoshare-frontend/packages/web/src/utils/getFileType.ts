import { FileType } from 'types';

const getFileType = (mimeType: string): FileType => {
  if (mimeType.indexOf('image/') > -1) {
    return FileType.IMAGE;
  }

  if (mimeType.indexOf('video/') > -1) {
    return FileType.VIDEO;
  }

  if (mimeType.indexOf('audio/') > -1) {
    return FileType.AUDIO;
  }

  return FileType.DOCUMENT;
};

export default getFileType;
