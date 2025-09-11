
def procesar_datos(df):
    """Agrega columna de reproducciones en millones."""
    df["reproducciones_millones"] = df["reproducciones"] / 1_000_000
    return df