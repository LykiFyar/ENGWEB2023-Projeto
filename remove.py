import json
import codecs
import sys 
import ijson

#py script_id.py nome_do_ficheiro 

input = sys.argv[1]
#id = input.split("_")[0].upper()

with open(input, encoding="utf-8") as f:
    parser = ijson.parse(f)
    registos = list(ijson.items(parser, 'item'))

for registo in registos:
    del registo["_id"]

with codecs.open("../EW/"+input, "w", encoding="utf-8") as arquivo:
    json.dump(registos, arquivo, ensure_ascii=False)