from flask import Flask, request, send_file, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from io import BytesIO
from PIL import Image, ImageFont, ImageDraw, ImageFilter
import random
from datetime import datetime
import cowsay
import recipeScraper as rS

app = Flask(__name__)
app.config.from_object("config.Config")
mongo = PyMongo(app) if app.config['MONGO_URI'] != 'PLACEHOLDER_STRING' else None
CORS(app)

@app.route('/search', methods=['GET'])
def mongo_search_NER():
    query = request.args.get('NER', type=str)
    results = mongo.db.recipes.find({'NER': query}).limit(10)
    output = []
    for result in results:
        output.append({'title': result['title'], 'ingredients': result['ingredients'], 'directions': result['directions'], 'link': result['link'], 'NER': result['NER']})
    return jsonify(output)

@app.route('/search', methods=['POST'])
def mongo_search_NER_post():
    # t1 = time.time()
    NER = request.json['NER']
    num_page = 5 if request.json.get('num_page') is None else request.json['num_page']
    page_index = 0 if (request.json.get('page_index') is None or request.json.get('page_index') >= num_page) else request.json['page_size']
    page_size = 10 if request.json.get('page_size') is None else request.json['page_size']
    start_id = 1 if request.json.get('start_id') is None else request.json['start_id']
    # t2 = time.time()
    results = mongo.db.recipes.find({'NER': {'$all': NER}, 'index': {'$gt': start_id-1}}).skip(page_size * page_index).limit(page_size)
    # print(time.time() - t2)
    output = {'recipes' : [], 'next_id': -1, 'end_page_index': -1, 'page_index': page_index}
    # t3 = time.time()
    
    for result in results:
        output['recipes'].append({'title': result['title'], 'ingredients': result['ingredients'], 'directions': result['directions'], 'link': result['link'], 'NER': result['NER']})
    # print(time.time()-t3)
    if len(output['recipes']) < page_size:
        output['end_page_index'] = page_index
    elif page_index == 0:   # Get the start id of next group when fetching the first page of the current group
        next_group_result = mongo.db.recipes.find({'NER': {'$all': NER}, 'index': {'$gt': start_id-1}}).skip(page_size * num_page).limit(1)
        next_group_result = list(next_group_result)
        if len(next_group_result) == 0:
            output['end_page_index'] = num_page - 1
        else:
            output['next_id'] = next_group_result[0]['index']

    # print(time.time()-t3)
    # print(time.time()-t1)
    return jsonify(output)

@app.route('/search_v2', methods=['POST'])
def mongo_search_NER_post_v2():
    NER = request.json['NER']
    start_id = 0 if (request.json.get('start_id') is None or request.json.get('start_id') < 0) else request.json['page_size']
    amount = 50 if (request.json.get('amount') is None or request.json.get('amount') <= 0) else request.json['amount']

    results = mongo.db.recipes.find({'NER': {'$all': NER}, 'index': {'$gt': start_id-1}}).limit(amount)
    output = {'recipes' : [], 'start_id': -1, 'end_id': -1}

    indexes = []
    for result in results:
        output['recipes'].append({'title': result['title'], 'ingredients': result['ingredients'], 'directions': result['directions'], 'link': result['link'], 'NER': result['NER']})
        indexes.append(result['index'])
    output['start_id'] = indexes[0]
    output['end_id'] = indexes[-1]

    return jsonify(output)

@app.route('/helloworld', methods=['GET'])
def test():
    return "Hello World"

@app.route('/danielAssignment4', methods=['GET'])
def assignmentCall():
    ingredients = rS.getIngredients()
    print(ingredients)
    return(str(ingredients))

@app.route('/time', methods=['GET'])
def getTime():
    return datetime.now().strftime('%Y-%m-%d %H:%M:%S')

@app.route('/hello', methods=['GET'])
def test_2():
    return f"Hello, {request.args.get('name', default='anonymous', type=str)}!"

@app.route('/test_captcha/<letters>', methods=['GET'])
def test_captcha(letters):
    width = 240
    height = 60
    num_of_letter = len(letters)
    blur_method="Gaussian"
    # def random_char():
    #     return random.choice(string.ascii_uppercase)

    def random_background_color():
        return random.randint(64, 255), random.randint(64, 255), random.randint(64, 255), 255

    def random_color():
        return random.randint(32, 100), random.randint(32, 100), random.randint(32, 100)

    letter_list = []
    text_img_width = width
    text_img_height = height

    img = Image.new('RGBA', (width, height), (0, 0, 0, 0))
    # font = ImageFont.truetype("arial.ttf", 30)
    text_img = Image.new('RGBA', (text_img_width, text_img_height), (255, 255, 255, 0))

    # Fill in background colors
    for x in range(width):
        for y in range(height):
            ImageDraw.Draw(img).point((x, y), fill=random_background_color())

    # Draw letters
    for t in range(num_of_letter):
        # letter_list.append(random_char())
        _x = int(text_img_width / num_of_letter)
        random_x = random.randint(_x - 5, _x + 5) * t  # random x position
        random_y = random.randint(0, int(text_img_height / 2.25))  # random y position
        ImageDraw.Draw(text_img).text((random_x, random_y),
                                      letters[t],
                                      font=ImageFont.truetype("arial.ttf", random.randint(28, 35)),  # random font size
                                      fill=random_color())  # random color

    # rotate image randomly
    rotated_img = text_img.rotate(random.uniform(-5.0, 5.0), expand=False)
    img.paste(rotated_img, mask=rotated_img)  # (int((width - text_img_width)/2), int((height - text_img_height)/2)),

    # Draw a stroke
    ImageDraw.Draw(img).line([(0, random.randint(0, height)), (int(width/2), random.randint(0, height)), (width, random.randint(0, height))],  # [(x,y),(x,y)]
                             random_color(),
                             2,
                             "curve")

    if blur_method == "Gaussian":
        img = img.filter(ImageFilter.GaussianBlur)
    elif blur_method == "blur":
        img = img.filter(ImageFilter.BLUR)
    elif blur_method == "both":
        img = img.filter(ImageFilter.GaussianBlur)
        img = img.filter(ImageFilter.BLUR)

    img_io = BytesIO()
    img.save(img_io, 'png')
    img_io.seek(0)
    return send_file(img_io, mimetype='image/png') 

@app.route('/cowsays/<f>', methods=['GET'])
def cowsays(f):
    return cowsay.get_output_string('cow', f)

if __name__ == '__main__':
    app.run()
