import pytest
from backend import app as flask_app

@pytest.fixture
def app():
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()

def test_test_2_get(app, client):
    response = client.get('/hello')
    assert response.status_code == 200
    assert b"Hello, anonymous" in response.data
    response = client.get('/hello?name=andy')
    assert response.status_code == 200
    assert b"Hello, andy" in response.data

def test_test_2_post(app, client):
    response = client.post('/hello')
    assert response.status_code == 405
    assert b"Hello, anonymous" not in response.data
