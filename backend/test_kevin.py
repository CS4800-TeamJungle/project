import pytest
from backend import app as flask_app
from datetime import datetime, timedelta

@pytest.fixture
def app():
    yield flask_app

@pytest.fixture
def client(app):
    return app.test_client()

def test_time_get(app, client):
    response = client.get('/time')
    currTime = datetime.now()
    responseTime = datetime.strptime(bytes.decode(response.data), "%Y-%m-%d %H:%M:%S")
    assert responseTime < currTime
    assert responseTime + timedelta(seconds=1) > currTime or responseTime - timedelta(seconds=1) < currTime