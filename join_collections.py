import json
import codecs
import sys 

# py join.py ficheiro_saida

lista_ficheiros = ["jsta_acordaos.json","jstj_acordaos.json","jtca_acordaos.json","jtcampca_acordaos.json","jtcampct_acordaos.json","jtcn_acordaos.json","jtrc_acordaos.json","jtre_acordaos.json","jtrg_acordaos.json","jtrl_acordaos.json","jtrp_acordaos.json"]

dados = []

#input = sys.argv[1]
output = sys.argv[1]

for ficheiro in lista_ficheiros:
    with open(ficheiro, encoding="utf-8") as f:
        registos_input = json.load(f)
    dados += registos_input

with open(output, encoding="utf-8") as f:
    registos_output = json.load(f)

# Juntar os dados da origem com os dados do destino
registos_output += dados


with codecs.open(output, "w", encoding="utf-8") as f:
    json.dump(registos_output, f, ensure_ascii=False)

print(f"Número total de registos: {len(registos_output)}" )