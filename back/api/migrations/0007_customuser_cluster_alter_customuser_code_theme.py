# Generated by Django 5.0.2 on 2024-03-15 20:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_customuser_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='customuser',
            name='cluster',
            field=models.FloatField(default=0.0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='customuser',
            name='code_theme',
            field=models.CharField(choices=[('hybrid', 'Hybrid'), ('nnfx-dark', 'NNFX Dark'), ('kimbie-light', 'Kimbie Light'), ('github-dark-dimmed', 'Github Dark Dimmed'), ('agate', 'Agate'), ('googlecode', 'Google Code'), ('kimbie-dark', 'Kimbie Dark'), ('night-owl', 'Night Owl'), ('default', 'Default'), ('rainbow', 'Rainbow'), ('foundation', 'Foundation'), ('github-dark', 'Github Dark'), ('atom-one-dark', 'Atom One Dark'), ('vs', 'VS'), ('school-book', 'School Book'), ('dark', 'Dark'), ('brown-paper', 'Brown Paper'), ('idea', 'Idea'), ('obsidian', 'Obsidian'), ('magula', 'Magula'), ('felipec', 'Felipec'), ('arduino-light', 'Arduino Light'), ('lioshi', 'Lioshi'), ('color-brewer', 'Color Brewer'), ('xt256', 'XT256'), ('stackoverflow-dark', 'Stackoverflow Dark'), ('stackoverflow-light', 'Stackoverflow Light'), ('isbl-editor-dark', 'ISBL Editor Dark'), ('tomorrow-night-blue', 'Tomorrow Night Blue'), ('srcery', 'Srcery'), ('tokyo-night-light', 'Tokyo Night Light'), ('github', 'Github'), ('ascetic', 'Ascetic'), ('paraiso-light', 'Paraiso Light'), ('androidstudio', 'Android Studio'), ('tokyo-night-dark', 'Tokyo Night Dark'), ('xcode', 'Xcode'), ('atom-one-dark-reasonable', 'Atom One Dark Reasonable'), ('monokai', 'Monokai'), ('codepen-embed', 'Codepen Embed'), ('atom-one-light', 'Atom One Light'), ('purebasic', 'Purebasic'), ('sunburst', 'Sunburst'), ('intellij-light', 'Intellij Light'), ('monokai-sublime', 'Monokai Sublime'), ('qtcreator-dark', 'Qtcreator Dark'), ('gradient-dark', 'Gradient Dark'), ('arta', 'Arta'), ('an-old-hope', 'An Old Hope'), ('devibeans', 'Devibeans'), ('nord', 'Nord'), ('panda-syntax-light', 'Panda Syntax Light'), ('routeros', 'Routeros'), ('vs2015', 'VS 2015'), ('mono-blue', 'Mono Blue'), ('qtcreator-light', 'Qtcreator Light'), ('gradient-light', 'Gradient Light'), ('a11y-dark', 'A11y Dark'), ('docco', 'Docco'), ('isbl-editor-light', 'ISBL Editor Light'), ('shades-of-purple', 'Shades Of Purple'), ('ir-black', 'IR Black'), ('lightfair', 'Lightfair'), ('grayscale', 'Grayscale'), ('paraiso-dark', 'Paraiso Dark'), ('gml', 'GML'), ('a11y-light', 'A11y Light'), ('tomorrow-night-bright', 'Tomorrow Night Bright'), ('far', 'Far'), ('pojoaque', 'Pojoaque'), ('panda-syntax-dark', 'Panda Syntax Dark'), ('nnfx-light', 'NNFX Light')], max_length=255),
        ),
    ]
