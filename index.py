from flask import Flask, render_template, request, url_for
from PIL import Image
import base64
from io import BytesIO
import numpy as np
import matplotlib.pyplot as plt
import tensorflow as tf
import os

os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'


app = Flask(__name__)

digit_model = tf.keras.models.load_model('/home/monojit/pyPrac/mlPrac/flask/digit/models/digit.h5')
assert digit_model != None

@app.route('/', methods = ['GET', 'POST'])
def index():
    digit = None
    if request.method == 'POST':
        print('in here')
        image_data = request.form["image"]
        image_data = base64.b64decode(image_data.split(",")[1])
        image = Image.open(BytesIO(image_data))
        # image_array = np.array(image)
        image_gray = image.convert('L')
        image_gray_resized = image_gray.resize((28, 28))
        image_gray_resized = np.array(image_gray_resized)
        image_gray_resized_norm = image_gray_resized / 255
        image_predict = np.expand_dims(image_gray_resized_norm, -1)
        image_predict = image_predict.reshape(-1, 28, 28, 1)
        digit = str(np.argmax(digit_model.predict(image_predict)))
        print(digit)
    print('Submit Clicked')
   
    return render_template('index2.html', title = 'Digit', digit = digit)

# @app.route('/save_image', methods = ['GET', 'POST'])
# def save_image():
#     print('Working')
#     dataURL = request.form["image"]
#     print(dataURL)
 
if __name__ == '__main__':
    app.run(debug = True)