import csv
import json


CONSUMPTION_CSV_PATH = "../data/prepared_data.csv"
POPULATION_CSV_PATH = "../data/populacy.csv"
RESOURCES_CSV_PATH = "../data/rwr.csv"
OUTPUT_FILE_PATH = "../web/static/data/countries.json"


def load_csv(csv_path):
    rows = []
    with open(csv_path) as file:
        csv_reader = csv.reader(file)
        next(csv_reader)
        for row in csv_reader:
            rows.append(row)
    return rows


if __name__ == "__main__":
    consumption_rows = load_csv(CONSUMPTION_CSV_PATH)
    population_rows = load_csv(POPULATION_CSV_PATH)
    resources_rows = load_csv(RESOURCES_CSV_PATH)

    consumption_dict = {}
    for row in consumption_rows:
        country_name = row[0].split("|")[-1]
        consumption_dict[country_name] = {
            "agricultural": float(row[1]),
            "industrial": float(row[2]),
            "municipal": float(row[3])
        }

    population_dict = {}
    for row in population_rows:
        country_name = row[0]
        population_dict[country_name] = {
            "population": [float(population_str) for population_str in row[1:]]
        }

    resources_dict = {}
    for row in resources_rows:
        country_name = row[0]
        total_water = float(row[5])
        resources_dict[country_name] = {
            "total_water": total_water
        }

    # Merge dicts
    countries_set = set(
        list(consumption_dict.keys())
        + list(population_dict.keys())
        + list(resources_dict.keys()))
    result_dict = {}
    for country_name in countries_set:
        if country_name in consumption_dict \
                and country_name in population_dict \
                and country_name in resources_dict:
            result_dict[country_name] = {
                **consumption_dict[country_name],
                **population_dict[country_name],
                **resources_dict[country_name]
            }
    print("Merged {} countries.".format(len(resources_dict)))

    json_string = json.dumps(result_dict, sort_keys=True, indent=2)
    with open(OUTPUT_FILE_PATH, "w") as file:
        file.write(json_string)
