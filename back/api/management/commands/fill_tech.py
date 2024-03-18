from django.core.management.base import BaseCommand
from api.models import Technology
import json

class Command(BaseCommand):
    help = 'Fill DB table with technologies'

    def handle(self, *args, **options):
        with open('./api/management/commands/technologies.json') as f:
            data = json.load(f)
            for technology in data:
                Technology(name=technology['name'], background_color=technology['background_color'], text_color=technology['text_color']).save()
        self.stdout.write(self.style.SUCCESS('Successfully filled DB with technologies.'))
