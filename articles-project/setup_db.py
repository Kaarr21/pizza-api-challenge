from lib.db.connection import get_connection

def initialize_database():
    # Create a connection
    conn = get_connection()
    
    # Read and execute the schema
    with open('lib/db/schema.sql', 'r') as schema_file:
        conn.executescript(schema_file.read())
    
    print("Database initialized successfully!")
    conn.close()

if __name__ == "__main__":
    initialize_database() 