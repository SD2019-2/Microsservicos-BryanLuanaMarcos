from friends_api import neo4j_client
from rest_framework.response import Response
from rest_framework import status
from pandas.io.json import json_normalize
import pandas as pd
import bson


def get_neo4j_client():
    return neo4j_client


# Função que transforma ObjectId em string (considerando se é uma lista ou não):
def objectid_to_string(x):
    if isinstance(x, list):
        x = [str(elem) if isinstance(elem, bson.objectid.ObjectId)
             else elem for elem in x]
    elif isinstance(x, bson.objectid.ObjectId):
        x = str(x)
    return x


# Função que pega uma coleção e transforma em DataFrame
def json_to_df(colecao):
    df = json_normalize(colecao)  # transforma JSON em DataFrame
    for col in df.columns:  # para cada coluna
        # transforma cada linha em string
        df[col] = [objectid_to_string(x) for x in df[col]]
    return df
