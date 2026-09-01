/**
 * @module HospitalModel
 * @description Handle data operations for Hospitals, specifically for recommendation filtering.
 */

const mockDatabase = require('../data/mock-database');

/**
 * Represents the Hospital data model.
 */
class HospitalModel {
    /**
     * Retrieves all hospitals from the database.
     * 
     * @returns {Array<Object>} List of all hospital objects.
     */
    static getAll() {
        return mockDatabase.hospitals;
    }

    /**
     * Filters hospitals based on user preferences.
     * 
     * @param {Object} filters - The filtering criteria.
     * @param {string} [filters.location] - The preferred city or district.
     * @param {string} [filters.specialty] - The required medical department/specialty.
     * @param {string} [filters.cost='all'] - The preferred cost tier ('Affordable', 'Moderate', 'Premium', 'all').
     * @param {string} [filters.icu='no'] - Whether an ICU bed is required ('yes' or 'no').
     * @returns {Array<Object>} List of hospitals matching the criteria.
     */
    static getRecommendations(filters) {
        let hospitals = this.getAll();

        if (filters.location) {
            const loc = filters.location.toLowerCase();
            hospitals = hospitals.filter(h => 
                h.city.toLowerCase().includes(loc) || 
                h.district.toLowerCase().includes(loc)
            );
        }

        if (filters.specialty) {
            const spec = filters.specialty.toLowerCase();
            hospitals = hospitals.filter(h => 
                h.availableDepartments.some(d => d.toLowerCase().includes(spec))
            );
        }

        if (filters.cost && filters.cost !== 'all') {
            hospitals = hospitals.filter(h => h.costRating.toLowerCase() === filters.cost.toLowerCase());
        }

        if (filters.icu === 'yes') {
            hospitals = hospitals.filter(h => h.icuAvailable > 0);
        }

        return hospitals;
    }
}

module.exports = HospitalModel;