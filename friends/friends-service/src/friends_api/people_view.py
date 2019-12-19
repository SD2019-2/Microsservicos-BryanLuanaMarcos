from rest_framework import status
from .neo4j_tools import *
from rest_framework.views import APIView
import json


class PeopleView(APIView):
    '''
      Friends view route
    '''

    def get(self, request, format='json'):
        # Create relationship [:Friend]
        print(request.body)
        return Response(status=status.HTTP_200_OK)

    def post(self, request, format='json'):
        # Create relationship [:Friend]
        try:
            data = json.loads(request.body)
            print(data)
        except Exception as e:
            print(request.body)
            return Response(status=status.HTTP_422_UNPROCESSABLE_ENTITY)

        try:
            names = neo4j_client.run('''
            MERGE(p:People { name: $label1 })
            ''', parameters={
                'label1': data['name'], })
            print(names)
        except Exception as e:
            print(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(names)
