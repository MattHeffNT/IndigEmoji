"""
Original script from Sam Lavigne aka Antiboredom https://github.com/antiboredom
that uses the csv file to generate the paths to the emojis and audio
in a json file. As well as converts the image to a base64 uri.

"""

import base64
import csv
import json
import os

# Define the folder path for audio files
audio_folder = 'public/assets/audio/'

# Get a list of audio filenames in the folder
audio_files = os.listdir(audio_folder)

# Create a dictionary to store the matched audio files
matched_audio = {}

# Define the 'out' dictionary
out = {"emojis": []}

# Read the CSV file and prepare the emojis JSON
with open("emojis.csv", "r") as infile:
    reader = csv.DictReader(infile)
    for row in reader:
        # Generate the URI for the image
        with open("./public/assets/emojis/" + row["file"], "rb") as imagefile:
            imgdata = base64.b64encode(imagefile.read()).decode("utf8")

        item = {
            "name": row["name"],
            "name_arrernte": row["name_arrernte"],
            "file": "../assets/emojis/" + row["file"],
            "data": imgdata,
            "audio": "../assets/audio/" + row["audio"]
        }

        # Extract the emoji name from the filename (without extension)
        # emoji_name = os.path.splitext(row["file"])[0] + ".mp3"

        # Check if there is a matching audio file in the folder
        # if emoji_name in audio_files:
        #     # Add the audio file to the matched_audio dictionary
        #     audio_path = "../assets/audio/" + emoji_name
        #     matched_audio[emoji_name] = audio_path

        # # Add the audio column to the item dictionary
        # if emoji_name in matched_audio:
        #     item["audio"] = matched_audio[emoji_name]

        out["emojis"].append(item)

# Write the emojis JSON to a file
with open("./src/assets/emojis.json", "w") as outfile:
    json.dump(out, outfile, indent=2)
