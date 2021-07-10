import dbConnect from '../../../middleware/dbConnect';
import Portfolio from '../../../models/Portfolio';

dbConnect();

export default async (req, res) => {
    const {
        query: { id },
        method
    } = req;

    switch(method) {
        case 'GET':
            try {
                const portfolio = await Portfolio.findById(id);

                if(!portfolio) {
                    return res.status(400).json({ success: false, message: "Portfolio does not exist" })
                }
                res.status(200).json({ success: true, data: portfolio });
            } catch (error) {
                res.status(400).json({ success: false })
            }
            break;
        case 'PUT':
            try {
                const portfolio = await Portfolio.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true
                })

                if (!portfolio) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: portfolio });
            } catch (error) {
                return res.status(400).json({ success: false })
            }
            break;
        case 'DELETE': {
            try {
                const deletedPortfolio = await Portfolio.deleteOne({ _id: id });

                if(!deletedPortfolio) {
                    return res.status(400).json({ success: false })
                }

                res.status(200).json({ success: true, data: {} });
            } catch (error) {
                return res.status(400).json({ success: false })
            }
            break;
        }
        default:
            return res.status(400).json({ success: false })
    }
}
