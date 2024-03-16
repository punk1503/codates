# Generated by Django 5.0.2 on 2024-03-16 18:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_customuser_cluster_alter_customuser_code_theme'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='customuser',
            managers=[
            ],
        ),
        migrations.AlterField(
            model_name='customuser',
            name='code_theme',
            field=models.CharField(choices=[('gml', 'GML'), ('paraiso-light', 'Paraiso Light'), ('xt256', 'XT256'), ('gradient-dark', 'Gradient Dark'), ('purebasic', 'Purebasic'), ('monokai', 'Monokai'), ('androidstudio', 'Android Studio'), ('mono-blue', 'Mono Blue'), ('atom-one-dark', 'Atom One Dark'), ('obsidian', 'Obsidian'), ('ascetic', 'Ascetic'), ('idea', 'Idea'), ('arta', 'Arta'), ('nord', 'Nord'), ('qtcreator-light', 'Qtcreator Light'), ('agate', 'Agate'), ('lioshi', 'Lioshi'), ('github-dark', 'Github Dark'), ('tokyo-night-light', 'Tokyo Night Light'), ('stackoverflow-dark', 'Stackoverflow Dark'), ('brown-paper', 'Brown Paper'), ('gradient-light', 'Gradient Light'), ('xcode', 'Xcode'), ('stackoverflow-light', 'Stackoverflow Light'), ('a11y-light', 'A11y Light'), ('github-dark-dimmed', 'Github Dark Dimmed'), ('default', 'Default'), ('qtcreator-dark', 'Qtcreator Dark'), ('googlecode', 'Google Code'), ('an-old-hope', 'An Old Hope'), ('arduino-light', 'Arduino Light'), ('shades-of-purple', 'Shades Of Purple'), ('isbl-editor-light', 'ISBL Editor Light'), ('school-book', 'School Book'), ('docco', 'Docco'), ('panda-syntax-light', 'Panda Syntax Light'), ('a11y-dark', 'A11y Dark'), ('rainbow', 'Rainbow'), ('codepen-embed', 'Codepen Embed'), ('srcery', 'Srcery'), ('devibeans', 'Devibeans'), ('kimbie-light', 'Kimbie Light'), ('pojoaque', 'Pojoaque'), ('ir-black', 'IR Black'), ('paraiso-dark', 'Paraiso Dark'), ('nnfx-light', 'NNFX Light'), ('tomorrow-night-blue', 'Tomorrow Night Blue'), ('grayscale', 'Grayscale'), ('atom-one-dark-reasonable', 'Atom One Dark Reasonable'), ('tomorrow-night-bright', 'Tomorrow Night Bright'), ('far', 'Far'), ('nnfx-dark', 'NNFX Dark'), ('monokai-sublime', 'Monokai Sublime'), ('panda-syntax-dark', 'Panda Syntax Dark'), ('dark', 'Dark'), ('hybrid', 'Hybrid'), ('felipec', 'Felipec'), ('foundation', 'Foundation'), ('routeros', 'Routeros'), ('lightfair', 'Lightfair'), ('vs2015', 'VS 2015'), ('kimbie-dark', 'Kimbie Dark'), ('intellij-light', 'Intellij Light'), ('github', 'Github'), ('isbl-editor-dark', 'ISBL Editor Dark'), ('color-brewer', 'Color Brewer'), ('night-owl', 'Night Owl'), ('atom-one-light', 'Atom One Light'), ('vs', 'VS'), ('magula', 'Magula'), ('sunburst', 'Sunburst'), ('tokyo-night-dark', 'Tokyo Night Dark')], max_length=255),
        ),
    ]
