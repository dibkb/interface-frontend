# How to Run the Next.js App Locally

Follow these steps to clone the repository, build the Docker image, and run the Next.js application locally.

## Prerequisites

Ensure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/)

## Steps to Run Locally



1. **Run the backend locally**

   First make sure that the bakend is running.
   Go to this link and setup the backend correctly
   ```bash
   https://github.com/dibkb/interface-assignment-backend
   ```
   The backend should be up and running if set up correctly in
   ```
   http://localhost:8000
   ```

2. **Clone the repository**

   Open your terminal and run the following command to clone the repository:

   ```bash
   git clone -b main https://github.com/dibkb/interface-frontend.git
   ```
3. **Build and Start the Docker Containers**

   Build the Docker image using the Dockerfile in the repository:

   ```bash
   docker build -t image-name .
   ```
   Replace image-name with your desired image name.

   Run the Docker container, mapping port 3000 to your local machine:

   ```bash
   docker run -p 3000:3000 image-name
   ```
4. **Access the Application**

  Open your web browser and go to:

   ```bash
   http://localhost:3000
   ```
   
   

   

