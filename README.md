# Incluex  

Incluex is a web application designed to simplify the inclusion and exclusion of data within CSV files. With a user-friendly interface, you can upload files, preview their content, and manage data efficiently.

## Features
- Drag-and-drop file upload support.
- Manual upload option for CSV files.
- View, include, or exclude data from CSV files.
- Dynamic table rendering for file previews.
- Simple file management with delete functionality.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Project Logic](#project-logic)
- [Technologies Used](#technologies-used)

---

## Prerequisites
Before running Incluex, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or later)
- npm (Node Package Manager)

---

## Installation

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-repo/incluex.git
   cd incluex

2. **Install Dependencies**
Run the following command to install all required packages:
   ```bash
   npm install

## Project Logic

Incluex is structured to handle CSV file uploads, parsing, and manipulation efficiently. Below is an overview of the application's logic:

### File Upload Handling
- Users can either drag and drop files into designated areas or manually upload them.
- Files are read using the `FileReader` API.
- Uploaded CSV files are parsed into headers and data rows.

### Data Rendering
- The parsed data is dynamically displayed in tables using the `Table` component.

### File Management
- Users can delete uploaded files to reset their content.

### File Parsing Logic
- CSV files are split into headers and rows:
  - `parseCSV()` takes the uploaded file's content, splits it by line (`\n`), and separates headers from data rows using a delimiter (`;`).

### Drag-and-Drop Support
- Dragging files into the drop zone triggers event listeners for `onDragOver`, `onDragLeave`, and `onDrop` to manage the state and handle the upload.

---

## Technologies Used
- **React**: Front-end framework for building user interfaces.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **React Icons**: Icons for UI elements.
- **JavaScript**: Core language for app logic.

---

## Contributing
Contributions are welcome! Please open an issue or submit a pull request if you'd like to enhance the application.

