import tensorflow as tf
from sklearn.model_selection import train_test_split
import numpy as np

(x_train, y_train), (x_test, y_test) = tf.keras.datasets.mnist.load_data()

x_train = x_train.astype('float32') / 255
x_test = x_test.astype('float32') / 255

x_train = np.expand_dims(x_train, -1)
x_test = np.expand_dims(x_test, -1)

y_train = tf.keras.utils.to_categorical(y_train, 10)
y_test = tf.keras.utils.to_categorical(y_test, 10)

x_train, x_val, y_train, y_val = train_test_split(x_train, y_train, test_size = 0.2, random_state = 11)

cnn = tf.keras.models.Sequential()

cnn.add(tf.keras.layers.Conv2D(32, (3, 3), activation = 'relu', input_shape = [28, 28, 1]))
cnn.add(tf.keras.layers.MaxPooling2D((2, 2)))

cnn.add(tf.keras.layers.Conv2D(64, (3, 3), activation = 'relu'))
cnn.add(tf.keras.layers.MaxPooling2D((2, 2)))

cnn.add(tf.keras.layers.Flatten())

cnn.add(tf.keras.layers.Dense(units = 128, activation = 'relu'))
cnn.add(tf.keras.layers.Dense(units = 10, activation = 'softmax'))

cnn.compile(optimizer = 'adam', loss = 'categorical_crossentropy', metrics = ['accuracy'])
cnn.fit(x_train, y_train, validation_data = (x_val, y_val), epochs = 10, batch_size = 32)

cnn.save('digit.h5')