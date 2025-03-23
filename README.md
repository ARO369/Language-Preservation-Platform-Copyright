# **Language Preservation Web App - Setup Guide**

## **Introduction**

This document provides a step-by-step guide to setting up and running the Language Preservation Web App on your local machine. The project is built using **React.js, Node.js, and Solana CLI** and is included in a **ZIP file** with all necessary dependencies.

## **System Requirements**

Before proceeding, ensure your system meets the following requirements:

- Operating System: Windows, macOS, or Linux
- Installed Software:
  - [Visual Studio Code (VS Code)](https://code.visualstudio.com/)
  - [Node.js](https://nodejs.org/) (Recommended version: **LTS version**)
  - Solana CLI (For blockchain functionality, optional for frontend setup)

---

## **Step 1: Download and Install VS Code**

1. Open a web browser and go to [https://code.visualstudio.com/](https://code.visualstudio.com/).
2. Click on **Download for Windows/macOS/Linux** based on your operating system.
3. Once the download is complete, open the installer and follow the on-screen instructions.
4. After installation, open **VS Code**.

---

## **Step 2: Install Node.js**

1. Open a web browser and go to [https://nodejs.org/](https://nodejs.org/).
2. Click on the **LTS (Long-Term Support) version** to download.
3. Run the installer and follow the setup instructions.
4. To verify the installation, open **Command Prompt (Windows)** or **Terminal (macOS/Linux)** and run:
   ```sh
   node -v
   ```
   This should display the installed Node.js version.
   ```sh
   npm -v
   ```
   This should display the installed npm (Node Package Manager) version.

---

## **Step 3: Extract the Project Files**

1. Locate the **ZIP file** provided.
2. Right-click on the ZIP file and select **Extract Here** or **Extract to a Folder**.
3. Open the extracted folder.

---

## **Step 4: Open the Project in VS Code**

1. Open **VS Code**.
2. Click on **File** > **Open Folder**.
3. Navigate to the extracted project folder and select it.
4. The project files should now be visible in VS Code.

---

## **Step 5: Install Project Dependencies**

1. In **VS Code**, open the **Terminal**:
   - Click on **Terminal** > **New Terminal**.
2. In the terminal, ensure you are inside the project folder. Run the following command to install dependencies:
   ```sh
   npm install
   ```
   - This will install all required **Node.js** dependencies.
   - The process may take a few minutes.

---

## **Step 6: Start the Development Server**

1. In the terminal, run the following command:
   ```sh
   npm run dev
   ```
2. You should see a message in the terminal indicating that the server is running.
3. Open a web browser and go to:
   ```
   http://localhost:3000
   ```
   - This will open the web app in your browser.

---

## **Step 7: (Optional) Install and Setup Solana CLI**

For blockchain-related functionalities, you need **Solana CLI**.

1. Open the terminal and run:
   ```sh
   sh -c "$(curl -sSfL https://release.solana.com/stable/install)"
   ```
2. Once installed, restart the terminal and check installation:
   ```sh
   solana --version
   ```
3. Configure Solana to use Devnet:
   ```sh
   solana config set --url https://api.devnet.solana.com
   ```

---

## **Step 8: Verify Everything is Working**

- Ensure there are no errors in the terminal.
- Open the browser and check if the app is running properly.
- If you encounter any issues, restart **VS Code** and run the commands again.

---

## **Step 8: Using the Web App**
Once the application is running, follow these steps to use it:

### **1. Home Screen (Project Information & Team Details)**
- When you open the web app, you will see information about the project and the development team.
- To proceed to the next section, click on the **NEXT** button.

### **2. Fetch Data Screen (Viewing Contributions)**
- This screen displays all contributions from different authors, categorized by language.
- You will see a **search bar** at the top to search for specific contributions.

#### **Searching Contributions**
- Type any **language name, author name, or description** in the search bar to filter results dynamically.

#### **Filtering Contributions by Category**
- Below the search bar, you will find filter options:
  - **Safe**: Displays languages that are not endangered.
  - **Vulnerable**: Displays languages that are at risk but still spoken.
  - **Endangered**: Displays languages that are in danger of disappearing.
  - **Extinct**: Displays languages that are no longer spoken.
- Clicking on any category will display only the relevant languages.

### **3. Viewing Contribution Details**
- The main feed contains **cards** displaying:
  - **Title**
  - **Description**
  - **Author Name**
  - **Publish Date**
  - **Media files** (Text, Image, Audio, Video, etc.)
- Clicking on a card will open a **popup window** displaying the contribution's media.

### **4. Navigating Between Screens**
- At the top of the **fetch data screen**, you will see two buttons:
  - **Back Button**: Takes you to the Home Page.
  - **Upload Button**: Takes you to the Upload Screen.

### **5. Uploading a New Contribution**
- Clicking the **Upload** button will take you to the **Upload Screen**.
- Here, you will see a **form** with the following fields:
  - **Title**
  - **Description**
  - **Author Name**
  - **Category (Safe, Vulnerable, Endangered, Extinct)**
  - **Media Upload** (Text, Image, Audio, Video, etc.)
- Fill in the required details.
- Upload the relevant file.
- Click the **Upload** button to submit the data to the blockchain.

### **6. Viewing Uploaded Contribution**
- After successfully uploading, you will be redirected back to the **Fetch Data Screen**.
- The newly uploaded contribution will now be visible in the list.

---

## **Step 9: Verifying Everything Works**
- Ensure there are no errors in the terminal.
- Open the browser and check if the app is functioning as expected.
- If any issues occur, restart **VS Code** and re-run the commands.

---

## **Conclusion**
You have successfully set up and used the **Language Preservation Web App**! 🎉

If you experience any issues, ensure all installations were done correctly and try restarting your system. Happy coding!



## Screenshots

![Screenshot 2025-03-15 160448](https://github.com/user-attachments/assets/ac7b237e-e333-4e52-90f2-497574afc2eb)
<<<<<<< HEAD

![Screenshot 2025-03-15 160709](https://github.com/user-attachments/assets/7b3c38bc-32e4-4f2b-9a30-29a88690711c)

![Screenshot 2025-03-15 160527](https://github.com/user-attachments/assets/65a1eb78-89ad-4d06-b9dc-f546b1b636ad)

![Screenshot 2025-03-15 160547](https://github.com/user-attachments/assets/f1e4a6a7-c0cc-453f-b685-cb18e487e85b)

![Screenshot 2025-03-15 160634](https://github.com/user-attachments/assets/a523afa2-d58e-43bd-ae62-81d5f905e5fd)








=======
>>>>>>> 9f52f22 (View Image Fix)

![Screenshot 2025-03-15 160709](https://github.com/user-attachments/assets/7b3c38bc-32e4-4f2b-9a30-29a88690711c)

![Screenshot 2025-03-15 160527](https://github.com/user-attachments/assets/65a1eb78-89ad-4d06-b9dc-f546b1b636ad)

![Screenshot 2025-03-15 160547](https://github.com/user-attachments/assets/f1e4a6a7-c0cc-453f-b685-cb18e487e85b)

![Screenshot 2025-03-15 160634](https://github.com/user-attachments/assets/a523afa2-d58e-43bd-ae62-81d5f905e5fd)