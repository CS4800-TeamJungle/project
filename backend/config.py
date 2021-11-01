from configparser import RawConfigParser
from os.path import exists

class Config(object):
    MONGO_URI = 'PLACEHOLDER_STRING'

ini_file = 'credentials.ini'
if(exists(ini_file)):
    credentials = RawConfigParser()
    credentials.read(ini_file)
    Config.MONGO_URI = credentials['MONGO']['CONNECTION_STRING']
