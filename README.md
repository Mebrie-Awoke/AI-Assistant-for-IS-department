# SIS Assistant - AI-Powered Chatbot for Information System Department
An intelligent RAG (Retrieval-Augmented Generation) chatbot designed to assist students and staff of the Information System Department at Addis Ababa University. The assistant provides accurate information about programs, courses, faculty, admission requirements, and more by leveraging document retrieval and LLM technology.


## Overview

SIS Assistant is a full-stack chatbot application that combines a Flask backend with a modern HTML/CSS/JavaScript frontend. It uses RAG technology to retrieve relevant information from department documents and generate accurate, contextual responses. The system is specifically tailored for the Information System Department at Addis Ababa University.

## Features

Intelligent Q&A: Ask questions about undergraduate/postgraduate programs, courses, faculty, admission requirements, and research areas

Dark/Light Theme: Toggle between dark and light mode for comfortable viewing

Quick Actions: Pre-defined questions for common inquiries

Responsive Design: Works seamlessly on desktop and mobile devices

Real-time Responses: Typing indicators and instant feedback

Formatted Output: Clean formatting for lists, bullet points, and code blocks

## Tech Stack
### Backend
Framework: Flask 

LLM Integration: Groq API 

Vector Database: ChromaDB

Embeddings: HuggingFace 

Document Processing: LangChain (PyPDFLoader, RecursiveCharacterTextSplitter)

### Frontend
HTML5/CSS3: Custom styling with CSS variables

JavaScript: jQuery for DOM manipulation and AJAX calls

Font Awesome: Icons and UI elements

Google Fonts: Inter typography





│   ├── src/                   # Source modules

│   ├── chroma_db/             # Vector database storage

│   ├── data/                   # Document storage

│   ├── requirements.txt       # Python dependencies

│   └── .env           # Environment variables 

│
├── Frontend/

│   ├── templates/

│   │   └── chat.html          # Main chat interface

│   └── static/

│       ├── style.css          # Custom styling

│       └── script.js           # Frontend logic

│
├── Images/

│   └── image.png              # Department logo

│
├── .gitignore                  # Git ignore rules

├── README.md                   # Project documentation


##🚀 Installation

Prerequisites:
Python 3.11 or higher

Git

Groq API key (sign up at console.groq.com)

## Local Setup

Clone the repository

bash
git clone https://github.com/Mebrie-Awoke/IS-RAG-Based-AI-Assistant.git

cd IS-RAG-Based-AI-Assistant

Set up backend

bash
cd Backend

python -m venv venv

pip install -r requirements.txt

Configure environment variables

bash
cp .env.example .env

 Edit .env and add your Groq API key:
 
GROQ_API_KEY=your_actual_api_key_here

Run the application

bash

'python index.py'

'python app.py'

## Access the application

Open your browser and navigate to http://localhost:8080
