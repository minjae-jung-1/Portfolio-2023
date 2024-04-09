# Interactive 3D Project - Portfolio-2023

Welcome to my Interactive 3D Project, created using Three.js and React Fiber. This project combines the power of web technologies to deliver an immersive 3D experience while also providing GPU monitoring capabilities for performance analysis.

## Table of Contents
- [Project Overview](#project-overview)
- [Interactive 3D Objects](#interactive-3d-objects)
- [GPU Monitoring](#gpu-monitoring)
- [Technologies Used](#technologies-used)
- [Demo](#demo)
- [Getting Started](#getting-started)
- [Challenges Faced](#challenges-faced)
- [Performance Optimization](#performance-optimization)
- [Code Samples](#code-samples)
- [Screenshots and Videos](#screenshots-and-videos)
- [Lessons Learned](#lessons-learned)
- [Future Enhancements](#future-enhancements)
- [Contact Information](#contact-information)

## Project Overview
This project showcases my skills in web development and 3D graphics. It uses Three.js and React Fiber to create interactive 3D objects, providing users with an engaging and visually appealing experience. Additionally, the project includes GPU monitoring functionality to measure frame rate, GPU usage (if applicable), and flexibility with mobile views.

## Interactive 3D Objects
Users can interact with the 3D objects in the project. Leveraged a physics library from React-Three Cannon to add motion to the renderable objects.

## GPU Monitoring
The project includes a GPU monitoring library that provides the following insights:
- Frame rate measurement
- GPU usage monitoring
- Overall GPU capacity analysis
- GPU tier query and flexible rendering
  - Allowed for mobile to register as a lower GPU tier and render less intensive features/objects to improve page loading times and overall functionality.
  - Based on the reported fps the GPU is then classified into either tier: 1 (>= 15 fps), tier: 2 (>= 30 fps) or tier: 3 (>= 60 fps). The higher the tier the more graphically intensive workload you can offer to the user.
  - More information/documentation at https://github.com/pmndrs/detect-gpu
- Post Processing of objects to enhance features and visuals.

This feature is invaluable for optimizing performance and identifying potential bottlenecks.

## Technologies Used
- Vite.js
- Three.js
- GSAP animation library
- React Fiber
- Node.js
- Express.js
- Three.js/drei
- Heroku
- AWS (migrated to heroku)
- Ngnix 

## Demo
You can interact with the project by visiting the following link: https://mj-portfolio-2023-df6ed6cba96d.herokuapp.com/

[Include clear instructions on how to use the interactive features.]

## Getting Started
To run this project locally, follow these steps:
1. Clone repository(#)
    - git clone [Repository]
2. Install dependencies(#)
    - Npm install or npm i should install all necessary dependencies
3. Run the project(#)
    - npm run dev will start the application.

## Challenges Faced
- This was one of my first interactions with Three.js. The learning curve was steep and implementing THree into react was a challenge in itself.
- With the assistance of a colleague and endless scraping through documentation, the project came to fruition.
- UseGPUDetect was an interesting subject. Being able to detect a devices ability to render and process data allowed me to create a variable objects based on a given device's processing power.
- AWS. Hosting on AWS was an interesting challenge. During this time, I had put my VPC knowledge to the test and had to learn Route53 to obtain a domain.
- It also allowed me to practice using webservers such as ngnix to create a reverse proxy from my domain name to the correct address.

## Performane Optimization
- During this phase of the project, mobile views had to be accounted for, creating an alternative set of functions to run with less intensive parameters when creating objects.
- useGPUDetect was a pivotal tool during this phase as it allowed WebGL to measure benchmarks for devices (framerates/resolution) in order to assign a tier which would serve as the state of rendering.
- GSAP was used a robust high performance animation tool for all CSS and animations within the project. The documentation was great and implementation was straightforward.

## Future Enhancements
- The visuals can most definitely be enhanced.
- I plan on continuosly adding to this portfolio with updated projects, certifications, and positions I have gained over the years.
- The CSS can also be worked on as some of the pages have slight errors which have not been fixed yet.
