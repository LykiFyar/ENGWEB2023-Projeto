import json
from json_stream import load as jsload
from json_stream import to_standard_types as tostdtypes

def divide_json_file(input_file, chunk_size):
    with open(input_file, "r", encoding="utf-8") as f:
        output_files = []
        json_stream = jsload(f)
        count = 0
        current_chunk = 1
        output_file = f"acordaos{current_chunk}.json"
        output_files.append(output_file)
        with open(output_file, "w", encoding="utf-8") as outfile:
            for obj in json_stream:
                if count >= chunk_size:
                    outfile.close()
                    count = 0
                    current_chunk += 1
                    output_file = f"acordaos{current_chunk}.json"
                    output_files.append(output_file)
                    outfile = open(output_file, "w")
                json.dump(tostdtypes(obj), outfile)
                outfile.write("\n")
                count += 1
    return output_files

# Usage example
input_file = "acordaos.json"
chunk_size = 1000
output_files = divide_json_file(input_file, chunk_size)
print("Output files:", output_files)