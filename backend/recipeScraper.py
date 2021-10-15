from recipe_scrapers import scrape_me
def getIngredients():
#https://github.com/hhursev/recipe-scrapers
# give the url as a string, it can be url from any site listed below
    testing = input('input recipe: ')

    # Q: What if the recipe site I want to extract information from is not listed below?
    # A: You can give it a try with the wild_mode option! If there is Schema/Recipe available it will work just fine.
    scraper = scrape_me(testing, wild_mode=True)

    scraper.title()
    scraper.total_time()
    scraper.yields()
    return(scraper.ingredients())
    scraper.instructions()
    scraper.image()
    scraper.host()
    scraper.links()
    scraper.nutrients()  # if available