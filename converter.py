import csv
import json
import time
from datetime import datetime

ts = time.time()
date = datetime.fromtimestamp(ts).strftime("%d-%m-%Y")
timestamp = datetime.fromtimestamp(ts).strftime("%H:%M-%S")

# Use raw string (r) to avoid escape characters
csvFilePath = './Attendance/Attendance_04-12-2023.csv'
jsonFilePath = './recordUI/data.js'

# Function to convert a CSV to a JavaScript array of objects
# Takes the file paths as arguments
def make_js_array(csvFilePath, jsFilePath):
    # Create a list to hold the data
    data = []

    # Open a csv reader called DictReader
    with open(csvFilePath, encoding='utf-8') as csvf:
        csvReader = csv.DictReader(csvf)

        # Convert each row into a dictionary
        # and add it to the data list
        for row in csvReader:
            data.append({key: value for key, value in row.items()})

    # Open a JavaScript file and write the data as an array of objects
    with open(jsFilePath, 'w', encoding='utf-8') as jsf:
        jsf.write('export const data = ' + json.dumps(data, indent=4) + ';')

# Call the make_js_array function
make_js_array(csvFilePath, jsonFilePath)
