# Берем готовый контейнер с Python 3
FROM python:3

# Задаем рабочий каталог в контейнере
WORKDIR /code

# Копируем файл с зависимостями в рабочий каталог
COPY requirements.txt /code/

# Устанавливаем зависимости из файла requirements.txt
RUN pip install -r requirements.txt

# Копируем все файлы из текущего каталога в рабочий каталог в контейнере
COPY . /code/

# Копируем скрипт entrypoint в корень контейнера
COPY ./entrypoint /

# Удаляем невидимые символы из скрипта entrypoint (если они есть)
RUN sed -i 's/\r$//g' /entrypoint

# Делаем скрипт entrypoint исполняемым
RUN chmod u+x /entrypoint

# Устанавливаем точку входа для контейнера
ENTRYPOINT ["/entrypoint"]

