# -*- coding: utf-8 -*-
import os


def save_file_content_to_txt(directory, txt_file, listing_prefix='А'):
    listing_num = 1  # Start listing from 1
    with open(txt_file, 'w', encoding='utf-8') as txt:
        for root, _, files in os.walk(directory):
            for file in files:
                # Exclude the output text file from the file list
                if file == os.path.basename(txt_file):
                    continue
                file_path = os.path.join(root, file)
                # Write the listing title to the txt file
                txt.write('Листинг {prefix}.{num} – файл {filename}\n\n'.format(
                    prefix=listing_prefix, num=listing_num, filename=file))

                # Read the content of the file and write it to the txt file
                try:
                    with open(file_path, 'r', encoding='utf-8') as content_file:
                        txt.write(content_file.read())
                except Exception as e:
                    txt.write('Could not read file {}. Error: {}\n'.format(file_path, e))
                # Add some space between listings
                txt.write('\n\n')
                # Increment the listing number
                listing_num += 1

    print("last listing number: " + str(listing_num))


# Example usage:
directory_to_scan = './src'  # replace with the path to your project directory
output_txt_file = 'project_contents.txt'  # the text file to save the contents to
save_file_content_to_txt(directory_to_scan, output_txt_file)
