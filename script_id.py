import json
import codecs
import sys 
import ijson

#py script_id.py nome_do_ficheiro 

input = sys.argv[1]
#id = input.split("_")[0].upper()

with open("../dataset_id/"+input, encoding="utf-8") as f:
    parser = ijson.parse(f)
    registos = list(ijson.items(parser, 'item'))

d = 0
for registo in registos:
    registo["_id"] = d
    d += 1

with codecs.open("../"+input, "w", encoding="utf-8") as arquivo:
    json.dump(registos, arquivo, ensure_ascii=False)