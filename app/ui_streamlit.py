# app/ui_streamlit.py

import streamlit as st
from scraping import obtener_datos
from procesamiento import procesar_datos

st.title("🎵 DataMusic")

df_raw = obtener_datos()
# df_clean = procesar_datos(df_raw)

st.subheader("Datos procesados")
st.dataframe(df_raw)