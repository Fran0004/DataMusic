import pandas as pd
# Install dependencies as needed:
# pip install kagglehub[pandas-datasets]
import kagglehub
from kagglehub import KaggleDatasetAdapter

# Set the path to the file you'd like to load
file_path = "2010.csv"

def obtener_datos():
    # Load the latest version
    df = kagglehub.load_dataset(
    KaggleDatasetAdapter.PANDAS,
    "cnic92/spotify-past-decades-songs-50s10s",
    file_path,
    # Provide any additional arguments like 
    # sql_query or pandas_kwargs. See the 
    # documenation for more information:
    # https://github.com/Kaggle/kagglehub/blob/main/README.md#kaggledatasetadapterpandas
    )

    print("First 5 records:", df.head())
    """Función simulada: devuelve un DataFrame de ejemplo."""
    data = {
        "artista": ["Artista 1", "Artista 2"],
        "canción": ["Canción A", "Canción B"],
        "reproducciones": [100000, 250000]
    }
    return df