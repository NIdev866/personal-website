const FileExtension = source => {
  return source.substring(
    source.length-3,
    source.length
  );
};

export default FileExtension;