import csv


def load_csv(csv_path):
    rows = []
    with open(csv_path) as file:
        csv_reader = csv.reader(file)
        next(csv_reader)
        for row in csv_reader:
            rows.append(row)
    return rows
