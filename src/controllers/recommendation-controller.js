/**
 * @module RecommendationController
 * @description Controller handling API requests for intelligent hospital recommendations.
 */

const HospitalModel = require('../models/hospital-model');

/**
 * Controller class for hospital recommendations.
 */
class RecommendationController {
    /**
     * Processes the incoming request to fetch recommended hospitals.
     * 
     * @param {Object} req - The Express request object.
     * @param {Object} req.query - The URL query parameters containing filter data.
     * @param {string} [req.query.location] - City or district to search in.
     * @param {string} [req.query.specialty] - Required medical specialty.
     * @param {string} [req.query.cost] - Budget preference.
     * @param {string} [req.query.icu] - ICU availability requirement.
     * @param {Object} res - The Express response object.
     * @returns {void} Sends a JSON array of matched hospitals or an error message.
     */
    static getRecommendations(req, res) {
        try {
            const { location, specialty, cost, icu } = req.query;
            
            const recommendations = HospitalModel.getRecommendations({
                location: location || '',
                specialty: specialty || '',
                cost: cost || 'all',
                icu: icu || 'no'
            });

            res.status(200).json(recommendations);
        } catch (error) {
            console.error('Recommendation Error:', error);
            res.status(500).json({ message: 'Internal server error while fetching recommendations.' });
        }
    }
}

module.exports = RecommendationController;