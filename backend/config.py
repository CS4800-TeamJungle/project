from configparser import ConfigParser
from os.path import exists

class Config(object):
    MONGO_CONNECTION_STRING = 'PLACEHOLDER_STRING'

ini_file = 'backend/credentials.ini'
if(exists(ini_file)):
    credentials = ConfigParser()
    credentials.read(ini_file)
    Config.MONGO_CONNECTION_STRING = credentials['MONGO']['CONNECTION_STRING']
