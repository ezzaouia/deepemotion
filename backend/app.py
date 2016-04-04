import flask
import logging
from datetime import datetime
import werkzeug
import os
import sys
import numpy as np

UPLOAD_FOLDER = './tmp/'
emotion_labels = {0: 'Anger', 1: 'Disgust', 2: 'Fear', 3: 'Happiness', 4: 'Sadness', 5: 'Surprise', 6: 'Neutral'}

# import caffe
caffe_root = '/Users/mohamed/Code/lib/caffe'
sys.path.insert(0, caffe_root + 'python')
import caffe

caffe.set_mode_cpu()

PRETRAINED = '/Users/mohamed/Code/lib/caffe/snapshot_iter_600.caffemodel'
MODEL = '/Users/mohamed/Code/lib/caffe/deploy.prototxt'

net = caffe.Classifier(MODEL, PRETRAINED)

channels = 3
s = int(128)

a = caffe.io.caffe_pb2.BlobProto()
with open("/Users/mohamed/Code/lib/DIGITS/digits/jobs/20160325-143423-10cd/mean.binaryproto",'rb') as f:
  a.ParseFromString(f.read())

means = a.data
means = np.asarray(means)
print means.shape

mu = means.reshape(channels,s,s)

mu = mu.mean(1).mean(1)  # average over pixels to obtain the mean (BGR) pixel values
print 'mean-subtracted values:', zip('BGR', mu)

# create transformer for the input called 'data'
transformer = caffe.io.Transformer({'data': net.blobs['data'].data.shape})

transformer.set_transpose('data', (2,0,1))  # move image channels to outermost dimension
transformer.set_mean('data', mu)            # subtract the dataset-mean value in each channel
transformer.set_raw_scale('data', 255)      # rescale from [0, 1] to [0, 255]
transformer.set_channel_swap('data', (2,1,0))  # swap channels from RGB to BGR

# local imports
import utils

app = flask.Flask(__name__)

@app.route('/emotionify_uplaod', methods=['POST'])
def emotionify_upload():
  try:
    imagefile = flask.request.files['imagefile']
    filename_ = str(datetime.now()).replace(' ', '_') + werkzeug.secure_filename(imagefile.filename)
    filename = os.path.join(UPLOAD_FOLDER, filename_)
    imagefile.save(filename)
    logging.info('saving to %s', filename)

    # image = utils.open_img(filename)
    image = caffe.io.load_image(filename)
    transformed_image = transformer.preprocess('data', image)

    # copy the image data into the memory allocated for the net
    net.blobs['data'].data[...] = transformed_image

    ### perform classification
    output = net.forward()

    output_prob = output['prob'][0]

    dict_ = dict( (str(emotion_labels.get(a)), str(b))  for a, b in zip(range(len(output_prob)), output_prob))

    print dict_
    return flask.jsonify({'argmaxscore': emotion_labels.get(output_prob.argmax()), 'scores': dict_})

  except Exception as err:
    logging.info('Uploaded image open error: %s', err)
    return flask.jsonify({'error': 500})

# run the app in debug mode & on port 5000
if __name__ == '__main__':
  logging.getLogger().setLevel(logging.INFO)
  app.run(debug=True, port=5000)
