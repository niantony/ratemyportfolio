import dbConnect from '../../../utils/dbConnect';
import Portfolio from '../../../models/Portfolio';

dbConnect();

export default async (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            try {
                const portfolios = await Portfolio.find({});

                res.status(200).json({ success: true, data: portfolios })
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