# StitchStock

**A web-based inventory and product management application designed for makers and small creative businesses.**

[View Live Application](https://stitchstock.vercel.app/login)

**Sample login**

**Username:** test@user.com
**Password:** 123456!

---

## About the Project

StitchStock is a full-stack web application I designed and developed as my senior capstone project at Anderson University. The application was created to help makers and small creative businesses organize their products, materials, and inventory in one centralized location.

The project gave me the opportunity to take an application from initial concept and UI design through development, database integration, authentication, troubleshooting, and deployment.

---

## Features

- **User Authentication** – Secure account creation and login using Firebase Authentication
- **Product Management** – Create and manage products with associated images and product information
- **Material Tracking** – Store and organize materials used across products
- **Product & Material Relationships** – Associate materials with individual products
- **User-Specific Data** – Each account accesses its own products and materials through Firebase
- **Image Management** – Upload and display product images
- **Responsive Interface** – Designed for usability across different screen sizes
- **Persistent Cloud Storage** – Application data is stored using Firebase Firestore rather than local browser storage

---

## Technologies

### Front End

- React
- JavaScript
- HTML
- CSS
- Vite

### Backend & Services

- Firebase Authentication
- Cloud Firestore

### Development & Deployment

- Git
- GitHub
- Vercel

---

## Technical Highlights

### Authentication & User-Specific Data

StitchStock uses Firebase Authentication to manage user accounts. Application data is associated with authenticated users so products and materials remain separate between accounts.

### Cloud Data Persistence

The application originally used local browser storage during early development. I later migrated the application to Cloud Firestore so users could access persistent data across sessions and devices.

This required restructuring the application's data handling and integrating asynchronous database operations throughout the React application.

### Product and Material Management

Products and materials are managed as related pieces of application data. Users can create materials and associate them with products, allowing the application to better represent how inventory is used in real-world handmade products.

### Image Handling

Product image support required working through challenges involving image storage, previews, file size limitations, and application state. Implementing this feature provided experience troubleshooting the practical limitations of storing and displaying user-generated content.

### Responsive UI

The interface was built with reusable React components and custom CSS. The application was designed to maintain a consistent experience across desktop and smaller screen sizes.

---

## What I Learned

Building StitchStock strengthened my understanding of developing an application beyond the user interface. Some of the most valuable experience from the project included:

- Structuring a multi-page React application
- Managing application state across components
- Integrating a React application with Firebase services
- Implementing authentication and user-specific data
- Working with asynchronous database operations
- Debugging issues across development and production environments
- Designing reusable UI components
- Deploying and maintaining a production web application with Vercel

The project also reinforced the importance of adapting an application's architecture as requirements evolve. Several features required me to reconsider my original implementation and develop more scalable solutions as the application became more complex.

---

## Running the Project Locally

### Prerequisites

Before running StitchStock locally, make sure you have:

- Node.js
- npm
- A Firebase project configured for authentication and Firestore

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/VictoriaGKnight/CapstoneProject.git
```

**2. Navigate to the project directory**

```bash
cd CapstoneProject/CapstoneProject
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

Firebase configuration is required for authentication and database functionality.

---

## Future Improvements

Potential improvements to StitchStock include:

- Expanded inventory reporting and analytics
- Low-stock notifications
- Improved image storage and optimization
- Product cost and pricing calculations
- Additional profile and account settings
- Improved accessibility and mobile usability

---

## Author

**Victoria Knight**

B.S. Coding — App Development Concentration  
Anderson University

---

*StitchStock was developed as my senior capstone project and represents the culmination of my coursework and experience in web and application development.*
