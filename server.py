from flask import Flask
from flask import render_template
from flask import Response, request, jsonify
from flask import redirect, session
from flask_session import Session

app = Flask(__name__)
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)


current_id = 3
spreads = [
    {
		"id": "1",
        "spreadType": "Daily",
        "numCards": "1",
        "date": "10/17/2022",
        "deck": "Rider-Waite Smith",
        "reader": "Me",
        "question": "How should I navigate my midterms season?",
        "cards": ["Strength"],
        "notes": "I think this is telling me to treat scary things with gentleness in order to stay strong and move forward"
	},
    {
		"id": "2",
        "spreadType": "Daily",
        "numCards": "1",
        "date": "5/29/2022",
        "deck": "Rider-Waite Smith",
        "reader": "Me",
        "question": "How to cope with anxiety about starting my new job",
        "cards": ["9 of Cups"],
        "notes": "Good fortune is coming my way soon!"
	},
    {
		"id": "3",
        "spreadType": "Past, Present, Future",
        "numCards": "3",
        "date": "8/1/2022",
        "deck": "Rider-Waite Smith",
        "reader": "Me",
        "question": "How to cope with difficult emotions about the past?",
        "cards": ["The Star", "6 of Cups", "The Empress"],
        "notes": "This reading made me think of this other thing..."
    }
]
# ROUTES
@app.route('/')
def index():
    if not session.get("name"):
        # if not there in the session then redirect to the login page
        return redirect("/login")
    return render_template('index.html')

@app.route("/login", methods=["POST", "GET"])
def login():
    if request.method == "POST":
        # record the user name
        session["name"] = request.form.get("name")
        # redirect to the main page
        return redirect("/")
    return render_template("login.html")

@app.route("/logout")
def logout():
    session["name"] = None
    return redirect("/")
    
@app.route('/add')
def add():
    return render_template('add.html')

@app.route('/search/<term>')
def search(term=None, found=None):
    print(term)
    return render_template('search_term.html', term=term, found=found)

@app.route('/view/<id>')
def view_id(id=None):
    return render_template('view_id.html', id=id)

@app.route('/edit/<id>')
def edit_id(id=None):
    return render_template('edit_id.html', id=id)

# AJAX FUNCTIONS
########################SEARCH############################
@app.route('/find_spreads', methods=['GET', 'POST'])
def find_spreads():
    global spreads
    json_data = request.get_json()
    lookup = json_data
    print(lookup)
    results = [] # keep as local array
    inCards = False

    for x in spreads:
        for y in x["cards"]:
            if lookup.lower() in y.lower():
                inCards= True
        if inCards == True:
            keepSearching = True
            for y in x["cards"]:
                if lookup.lower() in y.lower() and keepSearching ==True:
                    results.append(x)
                    keepSearching = False
        elif lookup.lower() in x["spreadType"].lower():
            results.append(x)
        elif lookup.lower() in x["question"].lower():
            results.append(x)
        elif lookup.lower() in x["date"].lower():
            results.append(x)
    #send back the WHOLE array of data, so the client can redisplay it
    print(results)
    found = len(results)
    print(found)
    return jsonify(results = results, found = found)

@app.route('/find_spread', methods=['GET', 'POST'])
def find_info():
    global spreads
    global current_id
    json_data = request.get_json()
    info = json_data
    results = {}
    foundSpread = False
    for x in spreads:
        if info ==x["id"]:
            results = x
            foundSpread = True
    if foundSpread == True:
        return jsonify(results = results)
@app.route('/show_all', methods=['GET', 'POST'])
def all_spreads():
    global spreads
    results = [] # keep as local array
    for x in spreads:
        results.append(x)
    #send back the WHOLE array of data, so the client can redisplay it
    print(results)
    found = len(results)
    print(found)
    return jsonify(results=results, found = found)

@app.route('/save_spread', methods=['GET', 'POST'])
def save_spread():
    global spreads
    global current_id

    #when stuck, print out json_data and check values within variables
    json_data = request.get_json()
    spreadType = json_data["spreadType"]
    date = json_data["date"]
    numCards = json_data["numCards"]
    deck = json_data["deck"]
    reader = json_data["reader"]
    question = json_data["question"]

    cardString = json_data["cards"]
    cards = cardString.split(", ")
    notes = json_data["notes"]

    print("Starting id" + str(current_id))
    current_id = int(current_id)
    current_id += 1
    print("Starting id +1" + str(current_id))

    new_spread_entry = {
        "spreadType": spreadType,
        "numCards": numCards,
        "date": date,
        "deck": deck,
        "reader": reader,
        "question": question,
        "cards": cards,
        "notes": notes,
        "id": str(current_id)
    }
    spreads.append(new_spread_entry)
    print(new_spread_entry)
    print(current_id)
    return jsonify(current_id = current_id)

@app.route('/update_spread', methods=['GET', 'POST'])
def update_spread():
    global spreads
    #when stuck, print out json_data and check values within variables
    json_data = request.get_json()
    spreadType = json_data["spreadType"]
    date = json_data["date"]
    numCards = json_data["numCards"]
    deck = json_data["deck"]
    reader = json_data["reader"]
    question = json_data["question"]
    cardString = json_data["cards"]
    cards = cardString.split(", ")
    notes = json_data["notes"]

    id = json_data["id"]
    edit_spread_entry = {
        "spreadType": spreadType,
        "numCards": numCards,
        "date": date,
        "deck": deck,
        "reader": reader,
        "question": question,
        "cards": cards,
        "cards": cards,
        "notes": notes,
        "id": str(id)
    }
    spreads[int(id)-1] = edit_spread_entry
    print(int(id)-1)
    print(spreads[int(id)-1])
    print(edit_spread_entry)
    print(id)
    return jsonify(id=id)
@app.route('/delete_spread', methods=['POST'])
def delete_spread():
    global spreads
    global current_id
    #when stuck, print out json_data and check values within variables
    json_data = request.get_json()
    id = json_data["id"]
    spreads.pop(int(id) - 1)
    for x in spreads:
        if int(id) < int(x["id"]):
            x["id"] = str(int(x["id"]) -1)
    current_id = str(int(current_id) - 1)
    return jsonify()
if __name__ == '__main__':
   app.run(debug = True)
