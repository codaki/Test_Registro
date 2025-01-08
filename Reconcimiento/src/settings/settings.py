"""
Configuration settings for the face recognition system
"""
import os

# Camera settings
CAMERA = {
    'index': 0,  # Default camera (0 is usually built-in webcam)
    'width': 640,
    'height': 480
}

# Face detection settings
FACE_DETECTION = {
    'scale_factor': 1.3,
    'min_neighbors': 5,
    'min_size': (30, 30)
}

# Training settings. Number of images needed to train the model.
TRAINING = {
    'samples_needed': 20
}

# File paths
PATHS = {
    'image_dir': 'images',
    'cascade_file': 'haarcascade_frontalface_default.xml',
    'names_file': 'names.json',
    'trainer_file': 'trainer.yml'
}

# Confidence threshold. Anything above this threshold is considered a match.
CONFIDENCE_THRESHOLD = 40