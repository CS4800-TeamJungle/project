import pytest
from backend import app as flask_app

@pytest.fixture
def app():
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()

def assignmentTest_get(app, client):
    response = client.get('danielAssignment4')
    assert response.status_code == 200
    assert b"Ingredients" in response.data
    
def assignmentPost(app, client):
    response = client.post('danielAssignment4')
    assert response.status_code == 405
    assert b"Hello" not in response.data
