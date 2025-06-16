from ..db.connection import get_connection

class Article:
    def __init__(self, title, author_id, magazine_id, id=None):
        self.id = id
        self.title = title
        self.author_id = author_id
        self.magazine_id = magazine_id

    def save(self):
        """Save the article to the database"""
        conn = get_connection()
        cursor = conn.cursor()
        
        if self.id is None:
            cursor.execute(
                "INSERT INTO articles (title, author_id, magazine_id) VALUES (?, ?, ?)",
                (self.title, self.author_id, self.magazine_id)
            )
            self.id = cursor.lastrowid
        else:
            cursor.execute(
                "UPDATE articles SET title = ?, author_id = ?, magazine_id = ? WHERE id = ?",
                (self.title, self.author_id, self.magazine_id, self.id)
            )
        
        conn.commit()
        conn.close()
        return self

    @classmethod
    def find_by_id(cls, id):
        """Find an article by ID"""
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM articles WHERE id = ?", (id,))
        row = cursor.fetchone()
        conn.close()
        
        if row:
            return cls(row['title'], row['author_id'], row['magazine_id'], row['id'])
        return None

    @classmethod
    def find_by_title(cls, title):
        """Find articles by title"""
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM articles WHERE title = ?", (title,))
        rows = cursor.fetchall()
        conn.close()
        
        return [cls(row['title'], row['author_id'], row['magazine_id'], row['id']) 
                for row in rows]

    @classmethod
    def find_by_author(cls, author_id):
        """Find all articles by a specific author"""
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM articles WHERE author_id = ?", (author_id,))
        rows = cursor.fetchall()
        conn.close()
        
        return [cls(row['title'], row['author_id'], row['magazine_id'], row['id']) 
                for row in rows]

    @classmethod
    def find_by_magazine(cls, magazine_id):
        """Find all articles in a specific magazine"""
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM articles WHERE magazine_id = ?", (magazine_id,))
        rows = cursor.fetchall()
        conn.close()
        
        return [cls(row['title'], row['author_id'], row['magazine_id'], row['id']) 
                for row in rows]

    def author(self):
        """Get the author of this article"""
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM authors WHERE id = ?", (self.author_id,))
        row = cursor.fetchone()
        conn.close()
        return row if row else None

    def magazine(self):
        """Get the magazine this article is in"""
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM magazines WHERE id = ?", (self.magazine_id,))
        row = cursor.fetchone()
        conn.close()
        return row if row else None 