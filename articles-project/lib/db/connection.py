import sqlite3

def get_connection():
    """
    Creates and returns a connection to the SQLite database
    Returns:
        sqlite3.Connection: A connection object with Row factory enabled
    """
    conn = sqlite3.connect('articles.db')
    conn.row_factory = sqlite3.Row  # This enables column access by name
    return conn 