import json
import codecs
import sys 

#py script_id.py nome_do_ficheiro 

input = sys.argv[1]
id = input.split("_")[0].upper()

f = open("dataset/"+input, encoding="utf-8")
registos = json.load(f)
f.close()

d = 0
for registo in registos:
    registo["_id"] = id + str(d)
    d += 1

with codecs.open("dataset_id/"+input, "w", encoding="utf-8") as arquivo:
    json.dump(registos, arquivo, ensure_ascii=False)