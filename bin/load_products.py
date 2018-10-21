import json

from bin.common import load_csv


PRODUCTS_CSV_PATH = "../data/products.csv"
OUTPUT_FILE_PATH = "../web/static/data/products.json"


if __name__ == "__main__":
    products_rows = load_csv(PRODUCTS_CSV_PATH)

    products_dict = {}
    for row in products_rows:
        product_name = row[0]
        products_dict[product_name] = {
            "liters": float(row[1]),
            "unit": row[2],
            "min": int(row[3]),
            "max": int(row[4]),
            "time": row[5],
            "avg": float(row[6])
        }

    json_string = json.dumps(products_dict, sort_keys=True, indent=2)
    with open(OUTPUT_FILE_PATH, "w") as file:
        file.write(json_string)
