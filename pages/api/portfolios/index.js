import dbConnect from '../../../middleware/dbConnect';
import Portfolio from '../../../models/Portfolio';
import { verify } from 'jsonwebtoken'

dbConnect();

export default async (req, res) => {
    verify(req.cookies.auth, process.env.TOKEN_SECRET, async function(err, decoded) {
        if (!err && decoded) {
            const { method } = req;

            switch (method) {
                case 'GET':
                    try {
                        const portfolios = await Portfolio.find({});
        
                        return await res.status(200).json({ success: true, data: portfolios })
                    } catch (error) {
                        res.status(400).json({ success: false });
                    }
                    break;
                case 'POST':
                    try {
                        const portfolio = await Portfolio.create(req.body);
                        res.status(201).json({ success: true, data: portfolio })
                    } catch (error) {
                        res.status(400).json({ success: false });
                    }
                    break;
                default:
                    res.status(400).json({ success: false });
                    break;
            }
        }
    
        return await res.status(401).json({ message: 'Log in to continue' });
      });
}