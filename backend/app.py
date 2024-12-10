import os
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from gan_model import generate_3d_model # Importer la fonction de reconstruction
from gan_model import generator 
from PIL import Image


app = Flask(__name__, static_folder='static')
CORS(app)

@app.route('/api/generate', methods=['POST'])
def generate():
    # Vérifier si l'image a été envoyé
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    
    # lire l'image envoyée
    image_file = request.files['image']
    image = Image.open(image_file.stream).convert("RGB")

    # Appeler la reconstruction 3D
    model_3d = generate_3d_model(generator, image)

    if model_3d is None or len(model_3d) == 0:
        return jsonify({'error': '3D model generation failed'}), 500
    else:
        # Retourner le modèle 3D (par exemple sous forme de points ou volume sérialisé)
        return jsonify({'model_3d': model_3d.tolist()})
    
 # Servir les fichiers React
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(f"static/{path}"):
        return send_from_directory('static', path)
    return send_from_directory('static', 'index.html')

if __name__ == '__main__':
    app.run(debug=True)   
    

    







