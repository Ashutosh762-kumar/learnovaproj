import sqlite3

conn = sqlite3.connect('learnova.db')
cursor = conn.cursor()

with open('learnova_database.sql', 'r', encoding='utf-8') as f:
    cursor.executescript(f.read())

conn.commit()
conn.close()

print("✅ Database created!")

