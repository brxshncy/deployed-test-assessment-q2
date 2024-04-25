# Order Processing Simulation

## Overview

This simulation demonstrates an order processing system that handles webhook notifications from ToyUniverse and simulates processing orders asynchronously. It aims to showcase the implementation of caching mechanisms, asynchronous processing, and file retrieval optimizations to improve efficiency in handling large volumes of data.

## Features

- **Caching Mechanism**: Simulates storing processed orders and their details in an in-memory cache to avoid redundant processing of orders.

- **Asynchronous Processing**: Simulates asynchronous processing of orders by queuing tasks to simulate downloading and parsing XML files in the background.

- **File Retrieval Optimization**: Simulates retrieving XML files from an SFTP folder and parsing them to extract order details.


## Simulation Details 

- **Webhook Endpoint:**
The simulation provides a /webhook endpoint to receive webhook notifications from ToyUniverse.
- **Processing Order:**
Upon receiving a webhook notification with an order ID, the simulation checks if the order is already processed. If not, it simulates asynchronous processing of the order by fetching and parsing XML files from an SFTP folder and creating orders in the ERP system.
- **Logging:**
The simulation logs details of the processing workflow, including errors encountered during processing.
