### The deployed next app is available as 
[https://interface-assignment-next.dibkb.xyz/](https://interface-assignment-next.dibkb.xyz/)

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
   - [https://github.com/dibkb/interface-assignment-backend](https://github.com/dibkb/interface-assignment-backend)

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

# Frontend Routes

## `/`
- Upload the payment-report and merchant-tax-report
- On success, redirects to `/dashboard`

## `/dashboard`
- Get an extensive report on the ETL process after processing the files
- Visual and statistical report

## `/tableview/total-orders`
- Get the whole transformed dataset with pagination

## `/tableview/order-payment`
- Get the whole transformed dataset where:
 - `TransactionType_payment === "Order & Payment Received"`

## `/tableview/total-rate-breached`
- Get the whole transformed dataset where:
 - `ToleranceCheck` is breached and above the threshold metric

## `/tableview/payment-pending`
- Get the whole transformed dataset where:
 - `TransactionType_payment === "PaymentPending"`

## `/logs`
- Get all the logs of the backend process:
- All updates of the ELT transformation pipleine


   
## CI/CD Pipeline for a Next.js App

### CI Pipeline

| Step | Description | Icon |
|---|---|---|
| CI Start | Begin the CI process. | 🟢 |
| Push to prod Branch | Push code changes to the `prod` branch. | 🔀 |
| Install dependencies | Install required packages and dependencies. | 💻 |
| Format Code | Ensure consistent code formatting using a linter. | 🧹 |
| Lint Code | Check for potential code quality issues. | ✅ |
| Run Build | Build the Next.js app into production-ready bundles. | ⚙️ |
| CI End | Conclude the CI process. | 🟢 |

### CD Pipeline

| Step | Description | Icon |
|---|---|---|
| CD Start | Begin the CD process. | 🟢 
| Push to Prod | Push code changes to the `prod` branch. | 🔀 |
| Create Build Image | Create a Docker image containing the built Next.js app. | 📦 |
| Push to Docker Hub | Push the Docker image to Docker Hub for distribution. | ⬆️ |
| SSH into EC2 | Connect to the EC2 instance via SSH. | 🖥️ |
| Pull Latest Docker Image | Pull the latest Docker image from Docker Hub. | ⬇️ |
| Deploy App on Server | Deploy the app on the EC2 instance using Docker Compose or a similar tool. | 🌐 |
| CD End | Conclude the CD process. | 🟢 |


![CI/CD pipleline diagram](https://github.com/user-attachments/assets/960d68d7-f63a-4131-870e-c71877ff7939)





   

