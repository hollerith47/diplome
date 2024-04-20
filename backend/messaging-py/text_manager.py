from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.preprocessing.text import tokenizer_from_json
from tensorflow.keras.models import load_model
from dotenv import load_dotenv
import numpy as np
import os

load_dotenv()

model = load_model(os.getenv("MODEL_TEXT"))
# Charger le tokenizer
with open('tokenizer.json') as f:
    data = f.read()
    tokenizer = tokenizer_from_json(data)


def prepare_text(texts, max_length=120):
    if isinstance(texts, str):
        texts = [texts]
    sequences = tokenizer.texts_to_sequences(texts)
    # print("Séquences :", sequences)  # Ajoutez cette ligne pour le débogage
    padded = pad_sequences(sequences, maxlen=max_length, padding='post', truncating='post')
    return padded


def predict_toxicity(texts):
    prepared_texts = prepare_text(texts)
    predictions = model.predict(prepared_texts)
    return (predictions > 0.5).astype(np.int32)
