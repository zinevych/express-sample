require('dotenv').config(); // Load environment variables
const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const postsRoutes = require('./routes/postsRoutes');
const categoriesRoutes = require('./routes/categoriesRoutes');

app.use(express.json()); // Middleware to parse JSON requests
app.use('/auth', authRoutes);
app.use('/posts', postsRoutes);
app.use('/categories', categoriesRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});