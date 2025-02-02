import { app } from ".";
import dotenv from 'dotenv';
dotenv.config();
const PORT: number = Number(process.env.PORT) || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});