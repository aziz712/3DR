import torch
import utils 
import models

# 1. Charger le générateur

gen_folder = "gen/"
generator_path = gen_folder + "generator_final.pth"
cube_len = 32
noise_size = 128
device = torch.device("cude" if torch.cuda.is_available() else "cpu")

# Initialiser le générateur

generator = models.Generator(noise_size=(noise_size + 1), cube_resolution=cube_len)
generator.load_state_dict(torch.load(generator_path, map_location=device))
generator.to(device)
generator.eval()

# 2. Préparer l'image

def preprocess_image(image_path):
    """
    Pré-traite une image pour qu'elle soit utilisée comme condition pour le générateur.
    :param image_path: Chemin vers l'image.
    :return: Tensor pré-traité.
    """


    image = utils.load_image(image_path)
    image = torch.tensor(image, dtype=torch.float32).unsqueeze(0).to(device)   # ajouter une dimention batch 
    return image


image_path = "path_to_image.jpg"  #remplacer par le chemain de l'image
image_tensor = preprocess_image(image_path)

# 3. Générer le modèle 3D


def generate_3d_model(generator, image_tensor):

    """
    Génère un modèle 3D à partir d'une image.
    :param generator: Le générateur chargé.
    :param image_tensor: L'image pré-traitée.
    :return: Grille voxel générée.
    """
    noise = torch.randn(1, noise_size, device=device)   # Bruit aléatoire
    with torch.no_grad():
        output_model = generator(noise, image_tensor)   # Générer le modèle 3D
        return output_model.cpu().squeeze(0).numpy()



