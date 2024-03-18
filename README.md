# CoDates - дейтинг приложение для разработчиков

Проект выполнен в рамках курсовой работы второго курса НИУ ВШЭ, Факультет Компьютерных Наук, департамент Программной Инженерии.

## Запуск
Frontend
```
cd front
npm i
node src/scripts/build_styles.cjs
npm run dev
```
Backend
```
cd back
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py fill_cities
python manage.py fill_tech
python3 manage.py runserver
```
