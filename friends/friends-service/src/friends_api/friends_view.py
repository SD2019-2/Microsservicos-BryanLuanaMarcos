from rest_framework import status
from rest_framework.views import APIView
from .neo4j_tools import *
import json


class FriendsAuthView(APIView):
    '''
      Retorna usuarios e se são amigos de name
    '''

    def get(self, request, name, format='json'):
        # Retorna amigos de 'name'
        try:
            names = []
            names_friends = list(neo4j_client.run('''
            MATCH (p:People { name : $label1 })-[:Friend]->(f:People)
            RETURN f.name
            ''', parameters={'label1': name, }))

            names_no_friends = list(neo4j_client.run('''
            MATCH (f:People)
            MATCH (p:People { name : $label1 })
            WHERE NOT (p)-[:Friend]->(f) AND f.name <> $label1
            RETURN f.name
            ''', parameters={'label1': name, }))

            print("Os que não são amigos >>>>>>")
            print(names_no_friends)

            for item in names_friends:
                names.append({"name": item[0], "isFriend": True})
            for item in names_no_friends:
                names.append({"name": item[0], "isFriend": False})

            print(names)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response([] if names == None else names)


class FriendRelationshipView(APIView):
    '''
      Cria uma relação de amizade entre 'myName' e 'otherName'
    '''

    def post(self, request, format='json'):
        # Create relationship [:Friend]
        data = json.loads(request.body)

        try:
            neo4j_client.run('''
            MATCH (me:People { name: $label1 })
            MATCH (other:People { name: $label2 })
            MERGE (me)-[:Friend]->(other)
            ''', parameters={
                'label1': data['myName'],
                'label2': data['otherName'], })
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(status=status.HTTP_200_OK)
