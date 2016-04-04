from PIL import Image
import numpy as np

def open_img(img_path):
  im = Image.open(img_path)
  img = np.asarray(im).astype(np.float32) / 255.
  if img.ndim == 2:
    img = img[:, :, np.newaxis]
    img = np.tile(img, (1, 1, 3))
  elif img.shape[2] == 4:
    img = img[:, :, :3]
  return img
