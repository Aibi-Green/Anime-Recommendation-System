import streamlit as st
from Generator import Generator

nutrition_input = [1406,15.638503552043373, 3.4176276769686678, 0.031957443995366264, 138.63306420214982, 47.99080939985001, 8.735156296291148,5.281426920090141, 86.46527919210487]

gen = Generator()
st.markdown("testing")
response = gen.generate(nutrition_input)

st.write(response.json())