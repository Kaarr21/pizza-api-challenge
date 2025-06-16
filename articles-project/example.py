from lib.models.author import Author
from lib.models.magazine import Magazine
from lib.models.article import Article

def run_example():
    # Create an author
    print("Creating author...")
    author = Author("John Doe")
    author.save()
    print(f"Created author with ID: {author.id}")

    # Create a magazine
    print("\nCreating magazine...")
    magazine = Magazine("Tech Weekly", "Technology")
    magazine.save()
    print(f"Created magazine with ID: {magazine.id}")

    # Create an article
    print("\nCreating article...")
    article = Article("Python Programming Tips", author.id, magazine.id)
    article.save()
    print(f"Created article with ID: {article.id}")

    # Get all articles by the author
    print("\nFetching author's articles...")
    articles = author.articles()
    print(f"Found {len(articles)} articles by {author.name}")

    # Get all magazines the author has contributed to
    print("\nFetching author's magazines...")
    magazines = author.magazines()
    print(f"Author has contributed to {len(magazines)} magazines")

    # Get article titles from the magazine
    print("\nFetching magazine article titles...")
    titles = magazine.article_titles()
    print("Article titles:", titles)

if __name__ == "__main__":
    run_example() 