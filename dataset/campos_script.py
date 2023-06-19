import glob
import os
import json

file_atual = os.path.basename(__file__)
# Regista campos para todos os dataset
campos = {}

# Regista campos para cada dataset
lista_dataset = {}

descritores_comuns = {}

diretorio = os.path.dirname(os.path.abspath(__file__))  # Substitua pelo caminho do diretório desejado

# Obtém a lista de arquivos no diretório
arquivos = os.listdir(diretorio)

# Itera sobre cada arquivo
for arquivo in arquivos:
    lenght = 0
    if arquivo!=file_atual:
        lista_dataset[arquivo] = {}
    # Verifica se é um arquivo
    if os.path.isfile(arquivo) and arquivo!=file_atual:
        # Abre o arquivo e lê o conteúdo
        with open(arquivo,"r",encoding="utf-8") as f:
            dados = json.load(f)
            length = len(dados)
            for item in dados:
                for campo, valor in item.items():
                    if campo not in campos:
                        campos[campo] = []
                        descritores_comuns[campo] = 0
                    
                    if campo not in lista_dataset[arquivo]:
                        lista_dataset[arquivo][campo] = type(valor)
                    
                    campos[campo].append(type(valor))
                    descritores_comuns[campo] += 1
                    
                break
    print("Nº de registos: " + str(length))
    


print(f"campos[keys] = ")
print("{")
for key in campos.keys():    
    print(f"{key}")
print("}\n")

for key,value in lista_dataset.items():
    print(f"lista_dataset[{key}] = ")
    for descr in value.keys():
        print(f"{descr} ")
    print("\n")

descritores_comuns_ordenado = sorted(descritores_comuns.items(), key=lambda x: x[1],reverse=True)

print(descritores_comuns_ordenado)
            


