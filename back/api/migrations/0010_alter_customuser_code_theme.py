# Generated by Django 5.0.2 on 2024-03-18 16:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_alter_customuser_cluster_alter_customuser_code_theme'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='code_theme',
            field=models.CharField(choices=[('dark', 'Dark'), ('gradient-light', 'Gradient Light'), ('devibeans', 'Devibeans'), ('purebasic', 'Purebasic'), ('nnfx-dark', 'NNFX Dark'), ('gml', 'GML'), ('github-dark', 'Github Dark'), ('brown-paper', 'Brown Paper'), ('monokai', 'Monokai'), ('nnfx-light', 'NNFX Light'), ('far', 'Far'), ('qtcreator-dark', 'Qtcreator Dark'), ('mono-blue', 'Mono Blue'), ('tomorrow-night-blue', 'Tomorrow Night Blue'), ('felipec', 'Felipec'), ('atom-one-light', 'Atom One Light'), ('androidstudio', 'Android Studio'), ('stackoverflow-dark', 'Stackoverflow Dark'), ('school-book', 'School Book'), ('idea', 'Idea'), ('nord', 'Nord'), ('kimbie-dark', 'Kimbie Dark'), ('lioshi', 'Lioshi'), ('paraiso-dark', 'Paraiso Dark'), ('github', 'Github'), ('grayscale', 'Grayscale'), ('agate', 'Agate'), ('github-dark-dimmed', 'Github Dark Dimmed'), ('isbl-editor-light', 'ISBL Editor Light'), ('pojoaque', 'Pojoaque'), ('xt256', 'XT256'), ('an-old-hope', 'An Old Hope'), ('atom-one-dark', 'Atom One Dark'), ('tokyo-night-light', 'Tokyo Night Light'), ('hybrid', 'Hybrid'), ('vs', 'VS'), ('xcode', 'Xcode'), ('docco', 'Docco'), ('tomorrow-night-bright', 'Tomorrow Night Bright'), ('monokai-sublime', 'Monokai Sublime'), ('arta', 'Arta'), ('shades-of-purple', 'Shades Of Purple'), ('foundation', 'Foundation'), ('rainbow', 'Rainbow'), ('night-owl', 'Night Owl'), ('intellij-light', 'Intellij Light'), ('stackoverflow-light', 'Stackoverflow Light'), ('tokyo-night-dark', 'Tokyo Night Dark'), ('ir-black', 'IR Black'), ('a11y-light', 'A11y Light'), ('qtcreator-light', 'Qtcreator Light'), ('kimbie-light', 'Kimbie Light'), ('atom-one-dark-reasonable', 'Atom One Dark Reasonable'), ('routeros', 'Routeros'), ('gradient-dark', 'Gradient Dark'), ('arduino-light', 'Arduino Light'), ('color-brewer', 'Color Brewer'), ('vs2015', 'VS 2015'), ('obsidian', 'Obsidian'), ('panda-syntax-dark', 'Panda Syntax Dark'), ('ascetic', 'Ascetic'), ('magula', 'Magula'), ('sunburst', 'Sunburst'), ('default', 'Default'), ('googlecode', 'Google Code'), ('a11y-dark', 'A11y Dark'), ('paraiso-light', 'Paraiso Light'), ('panda-syntax-light', 'Panda Syntax Light'), ('lightfair', 'Lightfair'), ('codepen-embed', 'Codepen Embed'), ('isbl-editor-dark', 'ISBL Editor Dark'), ('srcery', 'Srcery')], max_length=255),
        ),
    ]