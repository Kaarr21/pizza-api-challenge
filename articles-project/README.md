# Articles Management System

This project implements a system to manage the relationships between Authors, Articles, and Magazines using SQLite database.

## Project Structure

```
articles-project/
├── lib/
│   ├── models/
│   │   ├── author.py
│   │   ├── article.py
│   │   └── magazine.py
│   └── db/
│       ├── connection.py
│       └── schema.sql
└── requirements.txt
```

## Setup Instructions

1. Create and activate a virtual environment:
```bash
python -m venv env
source env/bin/activate  # On Linux/Mac
# OR
# env\Scripts\activate  # On Windows
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

3. Initialize the database:
```python
from lib.db.connection import get_connection

# Create a connection
conn = get_connection()

# Read and execute the schema
with open('lib/db/schema.sql', 'r') as schema_file:
    conn.executescript(schema_file.read())

conn.close()
```

## Usage Examples

### Creating and Saving Authors
```python
from lib.models.author import Author

# Create a new author
author = Author("John Doe")
author.save()

# Find author by name
john = Author.find_by_name("John Doe")
```

### Creating and Saving Magazines
```python
from lib.models.magazine import Magazine

# Create a new magazine
magazine = Magazine("Tech Weekly", "Technology")
magazine.save()

# Find magazine by name
tech_weekly = Magazine.find_by_name("Tech Weekly")
```

### Creating Articles
```python
from lib.models.article import Article

# Create a new article
article = Article("Python Tips", author.id, magazine.id)
article.save()

# Find articles by author
author_articles = Article.find_by_author(author.id)
```

### Using Relationships
```python
# Get all articles by an author
articles = author.articles()

# Get all magazines an author has contributed to
magazines = author.magazines()

# Get all authors who have written for a magazine
authors = magazine.contributors()

# Get article titles from a magazine
titles = magazine.article_titles()
```

## Features

1. Full CRUD operations for Authors, Articles, and Magazines
2. Relationship methods to navigate between models
3. Complex queries like finding top publishers
4. Transaction support for data integrity
5. SQLite database for easy setup and portability

## Notes

- All database connections are automatically closed after use
- SQL injection is prevented through parameterized queries
- The system uses SQLite for simplicity and portability 