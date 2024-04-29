import express from 'express';

const router = express.Router();

type CharacterResponse = {
    success: Boolean,
    message: String, 
    data: any,
};

router.get<{}, CharacterResponse>('/', (req, res) => {



    return res.json({
        success:true,
        message: "",
        data: {}
    });
});

export default router;
