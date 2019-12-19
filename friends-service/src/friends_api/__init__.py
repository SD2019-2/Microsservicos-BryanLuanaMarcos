import amqppy
from py2neo import Graph
from django.conf import settings
import pika
from rest_framework import status
import threading
import json


# Connect with neo4j db
neo4j_uri = settings.NEO4J_DB['URI']
if neo4j_uri != '' and neo4j_uri != None:
    neo4j_client = Graph(neo4j_uri, auth=(
        settings.NEO4J_DB['USER'], settings.NEO4J_DB['PASS']))

try:
    neo4j_client.run("Match () Return 1 Limit 1")
    print('Neo4j connection established!')
except Exception as e:
    print('Neo4j connection fail!')
    exit()


# Pub/sub
# d = threading.Thread(name='daemon', target=topic_subscribe)
# d.setDaemon(True)
# d.start()
# d.join()


# Subscribe on topic
def topic_subscribe():
    connection = pika.BlockingConnection(
        pika.ConnectionParameters(host='jellyfish.rmq.cloudamqp.com'))
    channel = connection.channel()

    channel.queue_declare(queue='users', durable=True)
    print(' [*] Waiting for messages. To exit press CTRL+C')

    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='task_queue', on_message_callback=callback)

    channel.start_consuming()


# Event callback
def callback(ch, method, properties, body):
    print(" [x] Received %r" % body)

    # Create relationship [:Friend]
    data = json.loads(body)['data']
    try:
        names = neo4j_client.run('''
            MERGE(p:People { name: $label1 })
            ''', parameters={
            'label1': data['name'], })
        ch.basic_ack(delivery_tag=method.delivery_tag)
    except Exception as e:
        print(e)
