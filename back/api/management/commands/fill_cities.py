from django.core.management.base import BaseCommand
from api.models import City
import json

class Command(BaseCommand):
    help = 'Fill DB table with cities'

    def handle(self, *args, **options):
        with open('./api/management/commands/cities.json') as f:
            data = json.load(f)
            for technology in data:
                City(name=technology['name'], latitude=technology['latitude']).save()
        self.stdout.write(self.style.SUCCESS('Successfully filled DB with cities.'))
