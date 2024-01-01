# ECS Help Desk - Streamlining Support with MERN

Welcome to ECS Help Desk, a comprehensive Fullstack MERN website designed to revolutionize customer support for [Company Name]. This project aims to enhance communication, streamline ticketing processes, and provide an intuitive knowledge base for quick problem resolution.

## Getting Started

Follow these steps to set up and run the project on your local machine.

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running locally or use a cloud-based solution
- Git installed

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd Help-Desk
   ```

2. Install dependencies for the server:

   ```bash
   cd Backend
   npm install
   ```

3. Install dependencies for the client:

   ```bash
   cd ../Frontend
   npm install
   ```

### Configuration

1. Create a `.env` file in the `Backend` directory and configure the following variables:

   ```env
   PORT=3000
   MONGODB_URI=mongodb+srv://rambo:password123abc@helpdesk.3m5jos8.mongodb.net/
   DB_URL=mongodb://localhost:27017/helpdesk
   ```
2. Create a `.env` file in the `Frontend` directory and configure the following variable:

   ```env
   PORT=4000
   ```

### Running the Project

1. Start the Backend:

   ```bash
   cd server
   npm start
   ```

   The server will run on http://localhost:3000 by default.

2. Start the Frontend:

   ```bash
   cd client
   npm start
   ```

   The client will open in your default web browser at http://localhost:4000.

## Project Features

### Smart Ticketing System

- Access the ticketing system by navigating to the corresponding section in the interface.
- Submit queries and track their resolution status.

### Instant Chat Support

- Utilize the real-time chat support tool for immediate assistance.

### Automated Responses

- Experience the intelligent system handling common questions, reducing manual workload.

### Analytics Dashboard

- Monitor and improve support performance through insightful metrics.

### User-Friendly Design

- Enjoy an easy-to-use interface designed for accessibility.


## Acknowledgments

- ECS for the opportunity to work on this impactful project.
- Open source community for providing invaluable tools and resources.

Feel free to reach out for any questions or issues. Happy coding! 🚀
