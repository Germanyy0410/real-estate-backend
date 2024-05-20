const processImageUrls = (images) => {
  images = images.replace(/[\[\]']/g, '');
  const parts = images.split(',');
  const ImageUrls = parts.map(part => part.trim());
  return ImageUrls;
}