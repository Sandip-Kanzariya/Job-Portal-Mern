# Job-Portal Using MERN

 The Job Portal is a dynamic web application designed to bridge the gap between companies and job seekers, offering a seamless platform for job posting and application management. The system provides distinct functionalities for companies and job seekers to create an efficient recruitment process.
## Project Overview : 

![erdiagram](https://github.com/Sandip-Kanzariya/Job-Portal-Mern/assets/105594748/6803ff33-13b4-4eaf-8c0a-7dfd714a53d6)


### Roles & Functionality : 

### 1. For Companies  
- **User Authentication**:  
  - Secure registration and login functionality.  
- **Job Posting**:  
  - Create job posts with details such as job descriptions, vacancy requirements, and accompanying photos.  
- **Application Management**:  
  - Review candidate applications.  
  - Update application statuses (accept/reject).  
- **Post Management**:  
  - Edit or delete job posts as needed.  

### 2. For Job Seekers  
- **User Authentication**:  
  - Secure registration and login functionality.  
- **Job Applications**:  
  - Browse and apply for available job posts.  
- **Profile Management**:  
  - View and manage their own profiles.  
- **Privacy**:  
  - Job seekers cannot view other users' profiles, ensuring confidentiality.  

## Installation & Run this Project locally

#### 1. Clone this Repository : 
```
git clone https://github.com/Sandip-Kanzariya/Job-Portal-Mern.git
```
#### 2. Change .env file as per your requirements (**Keep it private**)

##### .env file for Backend (backend.env parallel to backend / frontend)

```
NODE_ENV = development / production
PORT = 4500
DATABASE = 
 
```

##### .env file for Frontend (frontend.env inside frontend)

```
REACT_APP_API_URL = http://localhost:4500 
REACT_APP_PRESET = 
REACT_APP_CLOUD =
REACT_APP_CLOUD_API =
```

#### 3. General Set up & Run Backend Server
```
npm install 
cd backend 
nodemon index.js / node index.js 
```

#### 4. Frontend Set Up & Run Project
```
cd frontend 
npm install
npm start 
```

### Tech Stack ( MERN ) & Tools

|Application|Tech & Tools|
|---|---|
|Frontend|ReactJs, Tailwind CSS [DevUI Templates](https://www.devui.io/)|  
|Backend| ExpressJs(NodeJs) |
|Database|MongoDB Atlas & Compass|
|Image Storage|Cloudinary|
|API testing|Postman|
|Deployment|Vercel|



