# Import necessary libraries
from django.core.management.base import BaseCommand
from api.models import Technology
import json

# Define a Command class which extends BaseCommand
class Command(BaseCommand):
    # A description of this Command
    help = 'Reads technologies from technologies.json and writes data to the database'

    # Handle method will be executed when this Command is run
    def handle(self, *args, **kwargs):
        # Open and read the JSON file
        with open('technologies.json', 'r') as file:
            technologies = json.load(file)

        # Iterate through each technology in the JSON data
        for tech_data in technologies:
            # Extract technology data
            name = tech_data['name']
            background_color = tech_data['background_color']
            text_color = tech_data['text_color']

            # Create or update the Technology object
            Technology.objects.update_or_create(
                name=name,
                defaults={
                    'background_color': background_color,
                    'text_color': text_color
                }
            )

        # Print a message indicating success
        self.stdout.write(self.style.SUCCESS('Technologies successfully loaded into the database.'))
