# 🏥 MedicineInfo - Quick Start Guide

Welcome! This guide is designed for **non-technical users** to help you run the project locally, view it in your browser, manage the database using MongoDB Compass, and save/upload your changes using Git.

---

## 🚀 Step 1: Running the Website Locally

To run the website on your local computer, follow these simple steps:

1. **Open the Terminal in VS Code**:
   - In VS Code, click on **Terminal** in the top menu and select **New Terminal** (or press ``Ctrl + ` `` on Windows).
2. **Start the Development Server**:
   - In the terminal pane at the bottom, type the following command and press **Enter**:
     ```bash
     yarn dev
     ```
   - *Note: If `yarn` is not installed or doesn't work, you can try `npm run dev`.*
3. **Open the Website**:
   - Once the terminal shows that the server is ready, open your web browser (Chrome, Edge, Safari, etc.).
   - Go to the following address:
     **[http://localhost:3000](http://localhost:3000)**
   - You should now see the website running locally!

---

## 🗄️ Step 2: Viewing Database Data in MongoDB Compass

This project uses **MongoDB** to store medicine and clinical data. To see and edit this data visually, you can use **MongoDB Compass**.

### 1. Open MongoDB Compass
* Open the **MongoDB Compass** application on your computer.

### 2. Connect to the Database
Depending on your settings, you can connect to either the **Live Cloud Database** or your **Local Database**:

#### Option A: Connect to the Live Cloud Database (Recommended)
1. Open your `.env.local` file in VS Code.
2. Find the line starting with `MONGODB_URI=` and copy the entire connection string (it starts with `mongodb+srv://...`).
3. Paste this connection string into the **New Connection URI** box in MongoDB Compass, and click **Connect**.

#### Option B: Connect to your Local Database
If you are running MongoDB locally on your computer, paste this connection string in MongoDB Compass and click **Connect**:
```text
mongodb://localhost:27017/medicineinfo
```

### 3. How to See the Data
Once connected:
1. In the left-hand sidebar of MongoDB Compass, click on the database named **`medicineinfo`**.
2. Inside, you will see lists (called **collections**) such as `medicines`, `users`, etc.
3. Click on any collection to view, search, edit, or delete the data records!

---

## 🛑 Step 3: Stopping the Local Server

When you are done working and want to close the server:
1. Go back to the VS Code terminal.
2. Press **`Ctrl + C`** on your keyboard.
3. Press **`Y`** (if prompted) and then **Enter** to stop the server.

---

## 🐙 Step 4: Saving and Uploading Your Changes (Git & GitHub)

When you make changes to the code or files and want to save and upload them to GitHub, you can use either the **VS Code Interface** or **Terminal Commands**.

### Option A: Using the VS Code Interface (Easiest & No Commands)

1. **Open Source Control**:
   - Click the **Source Control** icon on the left sidebar (it looks like a branch with three circles: `⌥` or branch icon).
   - Or press **`Ctrl + Shift + G`** on your keyboard.
2. **Stage your Changes**:
   - Hover over the word **Changes** in the panel and click the **`+` (Plus)** icon next to it to stage all changed files.
3. **Type your Message**:
   - In the text box at the top (which says *"Message"*), type a short note about what you did. For example: `update readme` or `updated database connection config`.
4. **Commit the Changes**:
   - Click the blue **Commit** button.
5. **Push/Sync to GitHub**:
   - Click the blue **Sync Changes** button that appears (or click the **`...`** menu at the top-right of the Source Control panel and select **Push**).

### Option B: Using the Terminal Commands

If you prefer to type the commands in the terminal:
1. Open the Terminal in VS Code.
2. Run this command to stage all your changed files:
   ```bash
   git add .
   ```
3. Run this command to save your changes with a message:
   ```bash
   git commit -m "Your message here"
   ```
4. Run this command to upload your changes to GitHub:
   ```bash
   git push
   ```
